import React, { Component } from 'react';

class AddTask extends Component {
    minDate = new Date().toISOString().slice(0, 10);
    state = {
        text: 'Activity',
        isFoodOrSport: false,
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
        const re = /^[1-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({calories: e.target.value})
         }
    }

    handleRadio = (e) => {
        console.log(e);
        this.setState({
            isFoodOrSport: e.target.value === "Sport"?  true : false
        })
    }

    handleDate = (e) => {
        this.setState({
            date: e.target.value
        })
    }

    handleClick = (e) => {
        const { text, isFoodOrSport, date, calories } = this.state;
        if (text.length) {
            const add = this.props.add(text, date, isFoodOrSport, calories);
            if (add) {
                this.setState({
                    text: 'Activity',
                    isFoodOrSport: false,
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
        <form>
        <div className="radio">
            <input type="radio" value="Food" checked={!this.state.isFoodOrSport} onChange={this.handleRadio}/>Food
        <div className="radio"></div>
            <input type="radio" value="Sport" checked={this.state.isFoodOrSport} onChange={this.handleRadio}/>Sport
        </div>
        </form>
                
                <label id="date" htmlFor="date"className="form-label">Date</label>
                <input type="date" className="form-control m-2" value={this.state.date} min={this.minDate} max={maxDate} onChange={this.handleDate} />

                <button  onClick={this.handleClick} className="btn btn-outline-secondary  ">Add</button>
            </div>
        );
    }
}

export default AddTask;