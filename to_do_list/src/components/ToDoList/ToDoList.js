
import './sass/App.sass';

import React, { Component } from 'react';
import AddTask from './AddTask'
import TaskList from './TaskList'
import Task from './Task'

class App extends Component {
  counter = 9;
  state = {
    tasks: [
      {
        id: 0,
        text: 'kupic bulki',
        date: '2020-02-20',
        important: true,
        active: true,
        finishDate: null
      },
      {
        id: 1,
        text: 'umyc okna',
        date: '2020-03-20',
        important: true,
        active: true,
        finishDate: null
      },
      {
        id: 3,
        text: 'kupic klawiature',
        date: '2020-02-21',
        important: true,
        active: true,
        finishDate: null
      },
    ],
    ActualBMR: localStorage.getItem('BMR')
  }

  removeTask = (id) => {
    const tasks = [...this.state.tasks];

    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index, 1);

    this.setState({ tasks });

  }

  changeTaskStatus = (id) => {
    const tasks = Array.from(this.state.tasks);
    tasks.forEach(task => { if (task.id === id) { task.active = false; task.finishDate = new Date().getTime() } });
 
    this.setState({ tasks })
  }

  changeActualBMR = (calories) => {
    const ActualBMR = this.state.ActualBMR - calories;
    this.setState({ ActualBMR })
  }

  addTask = (text, date, important, calories) => {
    const task = {
      id: this.counter,
      text: text, //tekst z inputa
      date: date, //tekst z inputa
      important: important,
      active: true,
      finishDate: null,
      calories: calories
    }
    this.counter++;
    console.log(task, this.counter);

    this.setState(prevState => ({
      tasks: [...prevState.tasks, task]
    }));

    this.changeActualBMR(calories);

    return true;
  }

  render() {
    return (
      <div className="content-application">
        <AddTask add={this.addTask} />
        <TaskList tasks={this.state.tasks} change={this.changeTaskStatus} remove={this.removeTask} />
        <h2>Your actual BMR is = {this.state.ActualBMR}</h2>

      </div>
    );
  }
}

export default App;
