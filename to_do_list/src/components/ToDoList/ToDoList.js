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
    ActualBMR: localStorage.getItem('BMR'),
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

  

  // addTaskToLocalStorage = (task) => {
  //   // const TASKS = JSON.parse(localStorage.getItem('Tasks'));
  //   const tasks2 =  [...JSON.parse(localStorage.getItem('Tasks')), task];
    
  //   localStorage.setItem('Tasks', JSON.stringify(tasks2));
  // }

  addTask = (text, date, important, calories) => {
    const task = {
      id: this.state.tasks.length,
      text: text, //tekst z inputa
      date: date, //tekst z inputa
      important: important,
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

    this.changeActualBMR(calories);
    
    // this.addTaskToLocalStorage(task);

    return true;
  }

  render() {
    return (
      <motion.div initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      <div className="content-application">
        <AddTask add={this.addTask} />
        <TaskList tasks={this.state.tasks} change={this.changeTaskStatus} remove={this.removeTask} />
        <h2>Your actual BMR is = {this.state.ActualBMR}</h2>

      </div>
      </motion.div>
    );
  }
}

export default App;
