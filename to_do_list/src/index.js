import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BMICalculator from './components/BMICalculator/App';
import BMRCalculator from './components/BMRCalculator/App';
import ToDoList from './components/ToDoList/ToDoList';
import FoodCalculator from './components/Food/App';
import Nav from './components/Navbar/App';
import Nav2 from './components/NavbarSmaller/App';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import Home from './components/Home/App';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { AnimatePresence } from 'framer-motion';
import {Provider} from 'react-redux';
import store from './store/store';
const App = () => {
  
  console.log(store.getState());
  return (
    <Provider store={store}>
    <Router>
      
      <AnimatePresence exit={{opacity: 0}}>
      <Nav />
      <Nav2 />
        <Switch>
          <Route path="/BMICalculator" component={BMICalculator}></Route>
          <Route path="/BMRCalculator" component={BMRCalculator}></Route>
          <Route path="/ToDoList" component={ToDoList}></Route>
          <Route path="/Food" component={FoodCalculator}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </AnimatePresence>
    </Router>
    </Provider>
  );
  
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);