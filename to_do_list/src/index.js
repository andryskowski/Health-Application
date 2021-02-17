import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BMICalculator from './components/BMICalculator/App';
import BMRCalculator from './components/BMRCalculator/App';
import ToDoList from './components/ToDoList/ToDoList';
import FoodCalculator from './components/Food/App';
import Nav from './components/Navbar/App';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    
    <Router>
    <div>
    <Nav/>
    {/* <Route path="/" component={Home}></Route> */}
    <Route path="/BMICalculator" component={BMICalculator}></Route>
    <Route path="/BMRCalculator" component={BMRCalculator}></Route>
    <Route path="/ToDoList" component={ToDoList}></Route>
    <Route path="/Food" component={FoodCalculator}></Route>
    </div>
    </Router>
    
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
