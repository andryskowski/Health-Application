import React, { useEffect, useState } from 'react';
import './sass/App.sass';
import { useSelector } from 'react-redux';
import WeatherWidget from './WeatherWidget';
import axios from 'axios';

const App = () => {
    const BMRInformations = useSelector(store => store.BMRInformations);
    const [TASKS_TODAY, setTasksToday] = useState(0);
    const [ACTUAL_ADDICTION, setActualAddiction] = useState("addiction");

    const INFO_BMR_ELEMENTS = BMRInformations.map(info => (
        info.BMR
    ));

    const BMR_INFO = JSON.stringify(INFO_BMR_ELEMENTS);

    const [dayWithoutAddiction, setDayWithoutAddiction] = useState(0);

    function resetDayWithoutAddiction() {
        const TODAY_DATE = new Date();
        window.localStorage.setItem('LAST_DAY_ADDICTION', TODAY_DATE.getTime());
        setDayWithoutAddiction(0);
    }

    function changeDayWithoutAddiction() {
        const TODAY_DAY = new Date().getTime();
        const FIRST_DAY = window.localStorage.getItem('LAST_DAY_ADDICTION');
        const COUNTER = Math.floor(FIRST_DAY / TODAY_DAY);
        setDayWithoutAddiction(COUNTER.toString());
    }
    
    function changeActualAddiction(e) {
        const ACTUAL_ADDICTION = e.target.value;
        setActualAddiction(ACTUAL_ADDICTION);
    }

    function getTasksForToday() {
        const TODAY_DATE = new Date().toISOString().slice(0, 10);
        const ALL_TASKS = JSON.parse(window.localStorage.getItem('Tasks'));
        const ARRAY_FOR_TEXTS_TASKS_TODAY = [];

        const TASKS_FOR_TODAY = ALL_TASKS.map(task => {
            if (task.date === TODAY_DATE) {
                ARRAY_FOR_TEXTS_TASKS_TODAY.push(task.text);
                // setTasksToday(task.text);
            }
        }
        );

        return ARRAY_FOR_TEXTS_TASKS_TODAY.join(", ");

    }

    function getForumPost() {
        fetch("http://localhost:8000/posts")
            .then(response => response.json())
            .then(response => {
                console.log(response)

            })
            .catch(() => {
                alert('Error retrieving data!');
            });
    }

    useEffect(() => {
        getForumPost();
        changeDayWithoutAddiction();
    }, []);


    return (

        <div className="content">
            <h1 className="header">Home</h1>
            {/* <div>{BMR_INFO}</div> */}
            <WeatherWidget />
            <div className="bmr-widget widget"><h2>You actual BMR is: {JSON.parse(window.localStorage.getItem('BMR'))}</h2></div>
            <div className="bmi-widget widget"><h2>Your actual BMI is: {JSON.parse(window.localStorage.getItem('BMI'))}</h2></div>
            <div className="to-do-list-widget widget"><h2>Tasks for today: {window.localStorage.getItem('Tasks') != null ? getTasksForToday() : "nothing to do."}</h2></div>
            <div className="addiction-widget widget"><h2>It's your {dayWithoutAddiction} day without {ACTUAL_ADDICTION}!<button onClick={resetDayWithoutAddiction} className="btn btn-outline-secondary  ml-2">Reset</button></h2>
                <select class="form-select form-select-addiction" aria-label="Default select example" onChange={changeActualAddiction}>
                    <option selected>addiction</option>
                    <option value="cigarettes">cigarettes</option>
                    <option value="alcohol">alcohol</option>
                    <option value="drugs">drugs</option>
                </select>
            </div>

        </div>

    );
};

export default App;

