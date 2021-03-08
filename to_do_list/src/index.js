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
import { Provider } from 'react-redux';
import store from './store/store';

import Signup from "./components/Authentication/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import Dashboard from "./components/Authentication/Dashboard"
import Login from "./components/Authentication/Login"
import PrivateRoute from "./components/Authentication/PrivateRoute"
import ForgotPassword from "./components/Authentication/ForgotPassword"
import UpdateProfile from "./components/Authentication/UpdateProfile"
import Scheduler from './components/Scheduler/App';

const App = () => {

  console.log(store.getState());
  return (
    <Provider store={store}>
      <Router>

        <AnimatePresence exit={{ opacity: 0 }}>


          <AuthProvider>
            <PrivateRoute path="/" component={Nav} />
            <PrivateRoute path="/" component={Nav2} />
            <Switch>

              <PrivateRoute path="/BMICalculator" component={BMICalculator}></PrivateRoute>
              <PrivateRoute path="/BMRCalculator" component={BMRCalculator}></PrivateRoute>
              <PrivateRoute path="/ToDoList" component={ToDoList}></PrivateRoute>
              <PrivateRoute path="/Food" component={FoodCalculator}></PrivateRoute>
              <PrivateRoute path="/home" component={Home}></PrivateRoute>
              <PrivateRoute path="/scheduler" component={Scheduler}></PrivateRoute>

              <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
              >
                <div className="w-100" style={{ maxWidth: "400px" }}>

                  <PrivateRoute exact path="/" component={Home} />
                  <Route path="/dashboard" component={Dashboard} />
                  <PrivateRoute path="/update-profile" component={UpdateProfile} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot-password" component={ForgotPassword} />

                </div>
              </Container>

            </Switch>
          </AuthProvider>
        </AnimatePresence>
      </Router>
    </Provider>
  );

};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);