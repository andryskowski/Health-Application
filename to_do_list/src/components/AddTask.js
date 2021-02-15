import React, { Component } from 'react';
import './AddTask.css'

class AddTask extends Component {
    minDate = new Date().toISOString().slice(0, 10);
    state = {
        text: '',
        checked: false,
        date: this.minDate
    }

    handleText = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    handleCheckbox = (e) => {
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
        const { text, checked, date } = this.state;
        if (text.length) {
            const add = this.props.add(text, date, checked);
            if (add) {
                this.setState({
                    text: '',
                    checked: false,
                    date: this.minDate
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
            <div className="form form__group field">
                <input type="text" placeholder="dodaj zadanie" value={this.state.text} className="form__field" id='name' required onChange={this.handleText} />
                <label for="name" class="form__label">Name</label>
                
                <input id="c1" type="checkbox" checked={this.state.checked} id="important" onChange={this.handleCheckbox} />
                <label for="c1" htmlFor="important">Priorytet</label>
                <label htmlFor="date">Do kiedy zrobić</label>
                <input type="date" value={this.state.date} min={this.minDate} max={maxDate} onChange={this.handleDate} />
                <button  onClick={this.handleClick}>Dodaj</button>
            </div>
        );
    }
}

export default AddTask;