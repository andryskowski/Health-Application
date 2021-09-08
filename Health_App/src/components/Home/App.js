import React, { useEffect, useState } from 'react';
import './sass/App.sass';
import { useSelector } from 'react-redux';
import WeatherWidget from './WeatherWidget';
import DishIdeaWidget from './DishIdeaWidget';
import AddictionWidget from './AddictionWidget'
import axios from 'axios';
import { motion } from 'framer-motion';

const App = () => {
    // const BMRInformations = useSelector(store => store.BMRInformations);
    const [TASKS_TODAY, setTasksToday] = useState(0);

    // const INFO_BMR_ELEMENTS = BMRInformations.map(info => (
    //     info.BMR
    // ));

    // const BMR_INFO = JSON.stringify(INFO_BMR_ELEMENTS);

    function getTasksForToday() {
        const TODAY_DATE = new Date().toISOString().slice(0, 10);
        const ALL_TASKS = JSON.parse(window.localStorage.getItem('Tasks'));
        const ARRAY_FOR_TEXTS_TASKS_TODAY = [];

        const TASKS_FOR_TODAY = ALL_TASKS.map(task => {
            if (task.date === TODAY_DATE) {
                ARRAY_FOR_TEXTS_TASKS_TODAY.push(task.text);
                ARRAY_FOR_TEXTS_TASKS_TODAY.push(', ');
                ARRAY_FOR_TEXTS_TASKS_TODAY.push(task.calories);
                ARRAY_FOR_TEXTS_TASKS_TODAY.push(' calories');
                ARRAY_FOR_TEXTS_TASKS_TODAY.push(<br/>);
                // setTasksToday(task.text);
            }
        }
        );

        return ARRAY_FOR_TEXTS_TASKS_TODAY;

    }

    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="content">
                <h1 className="header">Home</h1>
                <WeatherWidget />
                <DishIdeaWidget />
                <AddictionWidget />
                <div className="bmr-widget widget b-card">
                    <h2 class="your-bmr-bmi">You actual BMR </h2>
                    <p class="bmr-bmi-value">{JSON.parse(window.localStorage.getItem('BMR'))}</p></div>
                <div className="bmi-widget widget b-card">
                    <h2 class="your-bmr-bmi">Your actual BMI</h2>
                    <p class="bmr-bmi-value">{JSON.parse(window.localStorage.getItem('BMI'))}</p></div>
                <div className="to-do-list-widget widget b-card">
                    <h2 class="tasks-for-today">Tasks for today {window.localStorage.getItem('Tasks') != null ? "" : "nothing to do"}</h2>
                    {(getTasksForToday() + '').split(', ').map(el => <h4>{el}</h4>)}
                </div>
            </div>
        </motion.div>

    );
};

export default App;

