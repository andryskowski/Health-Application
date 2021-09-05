import './sass/App.sass';
import React, { Component } from 'react';
import AddTask from './AddTask'
import TaskList from './TaskList'
import Task from './Task'
import { motion } from 'framer-motion';

class App extends Component {
  counter = 0;
  state = {
    tasks: window.localStorage.getItem('Tasks') ? JSON.parse(window.localStorage.getItem('Tasks')) : [],
    ActualBMR: window.localStorage.getItem('BMRActual') ? JSON.parse(window.localStorage.getItem('BMRActual')) : JSON.parse(window.localStorage.getItem('BMR'))
  }

  removeTask = (id) => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index, 1);
    this.setState({ tasks });
    window.localStorage.setItem('Tasks', JSON.stringify(tasks));

    //changing actualBMR
    const isFoodOrSport = this.state.tasks[index].isFoodOrSport;
    const calories = this.state.tasks[index].calories;
    const IS_ADD_OR_REMOVE = false;
    this.changeActualBMR(calories, isFoodOrSport, IS_ADD_OR_REMOVE);
  }

  changeTaskStatus = (id) => {
    const tasks = Array.from(this.state.tasks);
    tasks.forEach(task => { if (task.id === id) { task.active = false; task.finishDate = new Date().getTime() } });
    this.setState({ tasks })
  }

  changeActualBMR = (calories, isFoodOrSport, IS_ADD_OR_REMOVE) => {
    if (IS_ADD_OR_REMOVE == true) {
      //if isFoodOrSport = true <- sport, it means that you should subtract "-" calories, if false add "+" calories to ActualBMR 
      if (isFoodOrSport) {
        const ActualBMR = Number(this.state.ActualBMR) + Number(calories);
        this.setState({ ActualBMR });
        window.localStorage.setItem('BMRActual', JSON.stringify(ActualBMR));
      }
      else {
        const ActualBMR = Number(this.state.ActualBMR) - Number(calories);
        this.setState({ ActualBMR });
        window.localStorage.setItem('BMRActual', JSON.stringify(ActualBMR));
      }
    }
    else {
      if (isFoodOrSport) {
        const ActualBMR = Number(this.state.ActualBMR) - Number(calories);
        this.setState({ ActualBMR });
        window.localStorage.setItem('BMRActual', JSON.stringify(ActualBMR));
      }
      else {
        const ActualBMR = Number(this.state.ActualBMR) + Number(calories);
        this.setState({ ActualBMR });
        window.localStorage.setItem('BMRActual', JSON.stringify(ActualBMR));
      }
    }
  }

  addTask = (text, date, isFoodOrSport, calories) => {
    const task = {
      id: this.state.tasks.length,
      text: text, //text from input
      date: date, //text from input
      isFoodOrSport: isFoodOrSport,
      active: true,
      finishDate: null,
      calories: calories
    }
    this.counter++;
    console.log(task, this.counter);

    const updatedTasks = [...this.state.tasks, task];
    window.localStorage.setItem('Tasks', JSON.stringify(updatedTasks));

    this.setState(prevState => ({
      tasks: [...prevState.tasks, task]
    }));

    const IS_ADD_OR_REMOVE = true;
    this.changeActualBMR(calories, isFoodOrSport, IS_ADD_OR_REMOVE);


    return true;
  }

  resetActualBMR = () => {
    const BMR = JSON.parse(window.localStorage.getItem('BMR'));
    window.localStorage.removeItem('BMRActual');
    window.location.reload(true);
  }

  render() {
    return (
      <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <div className="content-application">
        <h1 className="header">Activities</h1>
          <AddTask add={this.addTask} />
          <TaskList tasks={this.state.tasks} change={this.changeTaskStatus} remove={this.removeTask} />
          <h2 className="tasks-to-do">Your actual BMR is {this.state.ActualBMR}/{localStorage.getItem('BMR')}</h2>
          <button className="btn btn-outline-secondary reset-bmr-btn" onClick={this.resetActualBMR}>Reset Actual BMR</button>
        </div>
      </motion.div>
    );
  }
}

export default App;
