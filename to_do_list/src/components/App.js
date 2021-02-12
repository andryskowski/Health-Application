
import './App.css';

import React, { Component } from 'react';
import AddTask from './AddTask'
import TaskList from './TaskList'
import Task from './Task'

class App extends Component {
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
    ]
  }

  render() {
    return (
      <div>
        <AddTask/>
        <TaskList tasks={this.state.tasks}/>
        
      </div>
    );
  }
}

export default App;
