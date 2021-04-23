import React, { Component } from 'react';

class AddTask extends Component {
    minDate = new Date().toISOString().slice(0, 10);
    state = {
        text: 'Activity',
        checked: false,
        date: this.minDate,
        calories: 'Calories'
    }

    onClickText = (e) => {
        this.setState({
            text: ''
        })
    }

    onClickCalories = (e) => {
        this.setState({
            calories: ''
        })
    }

    handleText = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    handleCalories = (e) => {
        this.setState({
            calories: e.target.value
        })
    }

    handleCheckbox = (e) => {
        console.log(e);
        this.setState({
            checked: e.target.checked
        })
    }

    handleDate = (e) => {
        this.setState({
            date: e.target.value
        })
    }

    handleClick = (e) => {
        const { text, checked, date, calories } = this.state;
        if (text.length) {
            const add = this.props.add(text, date, checked, calories);
            if (add) {
                this.setState({
                    text: 'Activity',
                    checked: false,
                    date: this.minDate,
                    calories: 'Calories'
                })
            }
        } else {
            alert("text is too short");
        }
    }

    render() {
        let maxDate = this.minDate.slice(0, 4) * 1 + 1;
        console.log(maxDate);
        maxDate = maxDate + "-12-32" //2020-12-31
        return (
            <div className="form form__group form-inline row justify-content-center">
                <input type="text" placeholder="dodaj zadanie" value={this.state.text} className="form__field" id='name' required onClick={this.onClickText} onChange={this.handleText} />
                <label htmlFor="name" className="form__label"></label>
                
                <input type="text" placeholder="Kalorie" value={this.state.calories} className="form__field" id='name2' required onClick={this.onClickCalories} onChange={this.handleCalories} />
                <label htmlFor="name2" className="form__label"></label>

                <div class="custom-control custom-switch">
                <input id="c1" type="checkbox" checked={this.state.checked} id="important" onChange={this.handleCheckbox} className="custom-control-input"/>
                <label htmlFor="c1" htmlFor="important" className="custom-control-label" >{!this.state.checked ? `Food` : `Sport`}</label>
                </div>
                
                <label id="date" htmlFor="date"className="form-label">Date</label>
                <input type="date" className="form-control m-2" value={this.state.date} min={this.minDate} max={maxDate} onChange={this.handleDate} />

                <button  onClick={this.handleClick} className="btn btn-outline-secondary  ">Add</button>
            </div>
        );
    }
}

export default AddTask;