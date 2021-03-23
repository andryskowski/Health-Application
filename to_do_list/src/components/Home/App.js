import React, { useEffect, useState } from 'react';
import './sass/App.sass';
import { useSelector } from 'react-redux';
import WeatherWidget from './WeatherWidget';
import axios from 'axios';

const App = () => {
    const BMRInformations = useSelector(store => store.BMRInformations);
    const [TASKS_TODAY, setTasksToday] = useState(0);
    const [ADDICTION_IMG, setAddictionImg] = useState(
        window.localStorage.getItem('ADDICTION_IMG') ?
        window.localStorage.getItem('ADDICTION_IMG') :
        "https://www.flaticon.com/svg/vstatic/svg/1685/1685853.svg?token=exp=1616529380~hmac=7a9c266abddf95432829fff3ba95c44d"
    )
    const [ACTUAL_ADDICTION, setActualAddiction] = useState(
        window.localStorage.getItem('ACTUAL_ADDICTION') 
        ? 
        window.localStorage.getItem('ACTUAL_ADDICTION') :
        "addiction"
    );

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
        window.localStorage.setItem('ACTUAL_ADDICTION', ACTUAL_ADDICTION);
        let LINK_IMG;
        if(e.target.value == "cigarettes")
        {
            LINK_IMG = "https://www.flaticon.com/svg/vstatic/svg/1685/1685839.svg?token=exp=1616529803~hmac=276594dcd05b6082fa00cc73a6cfe275";
        }
        else if(e.target.value == "alcohol")
        {
            LINK_IMG = "https://www.flaticon.com/svg/vstatic/svg/1685/1685837.svg?token=exp=1616529760~hmac=15c5ef9af9bfea4e4f80a568ffccfe5a";
        }
        else if(e.target.value == "drugs")
        {
            LINK_IMG = "https://www.flaticon.com/svg/vstatic/svg/1685/1685841.svg?token=exp=1616529779~hmac=3a3747f6847ca9ed7fd0e56aab848f98";
        }
        setAddictionImg(LINK_IMG);
        window.localStorage.setItem('ADDICTION_IMG', LINK_IMG);

        setActualAddiction(ACTUAL_ADDICTION);
    }

    function showListOfAddictions() {
        const LIST_ADDICTIONS = document.querySelector('.form-select-addiction');
        LIST_ADDICTIONS.style.display = "inline-block";
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
            <div className="addiction-widget widget">
            <h2>It's your {dayWithoutAddiction} day without {ACTUAL_ADDICTION}!</h2>
            <button onClick={resetDayWithoutAddiction} className="btn btn-outline-secondary">Reset</button>
            <h5 className="change-btn" onClick={showListOfAddictions}>Change</h5>
                <select style={{display: "none"}} class="form-select form-select-addiction ml-2" aria-label="Default select example" onChange={changeActualAddiction}>
                    <option selected>addiction</option>
                    <option value="cigarettes">cigarettes</option>
                    <option value="alcohol">alcohol</option>
                    <option value="drugs">drugs</option>
                </select>
            <img src={ADDICTION_IMG} width="100" height="100"></img>
            </div>

        </div>

    );
};

export default App;

