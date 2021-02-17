import React, { Component } from 'react';
import './AddTask.css'

class AddTask extends Component {
    minDate = new Date().toISOString().slice(0, 10);
    state = {
        text: '',
        checked: false,
        date: this.minDate,
        calories: 0
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
                    text: '',
                    checked: false,
                    date: this.minDate,
                    calories: ''
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
                <label for="name" class="form__label">zadanie</label>
                
                <input type="text" placeholder="Kalorie" value={this.state.calories} className="form__field" id='name2' required onChange={this.handleCalories} />
                <label for="name2" class="form__label">Name</label>

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