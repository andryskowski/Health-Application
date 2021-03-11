import React, { useEffect, useState } from 'react';
import './sass/App.sass';
import { useSelector } from 'react-redux';
import WeatherWidget from './WeatherWidget';
import axios from 'axios';

const App = () => {
    const BMRInformations = useSelector(store => store.BMRInformations);
    const [TASKS_TODAY, setTasksToday] = useState(0);

    const INFO_BMR_ELEMENTS = BMRInformations.map(info => (
        info.BMR
    ));

    const BMR_INFO = JSON.stringify(INFO_BMR_ELEMENTS);

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
        getForumPost()
    }, []);


    return (

        <div className="content">
            <h1 className="header">Home</h1>
            {/* <div>{BMR_INFO}</div> */}
            <WeatherWidget />
            <div className="bmr-widget widget"><h2>You actual BMR is: {JSON.parse(window.localStorage.getItem('BMR'))}</h2></div>
            <div className="bmi-widget widget"><h2>Your actual BMI is: {JSON.parse(window.localStorage.getItem('BMI'))}</h2></div>
            <div className="to-do-list-widget widget"><h2>Tasks for today: {window.localStorage.getItem('Tasks') != null ? getTasksForToday() : "nothing to do."}

            </h2></div>
        </div>

    );
};

export default App;


// import { useSelector } from 'react-redux';

// const App = () => {
//   const rates = useSelector(store => store.rates);
//   const ratesElements = rates.map(rate => (
//     <div  {...rate}/>
//   ));

//   return (
//     <ul>
//       {ratesElements}
//     </ul>
//   );
// };

// export default App;