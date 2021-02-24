import React, { useEffect, useState } from 'react';
import './sass/App.sass';
import { useSelector } from 'react-redux';
import  WeatherWidget  from './WeatherWidget';

const App = () => {
    const BMRInformations = useSelector(store => store.BMRInformations);
    const [TASKS_TODAY, setTasksToday] = useState(0);

    const INFO_BMR_ELEMENTS = BMRInformations.map(info => (
        info.BMR
    ));

    const BMR_INFO = JSON.stringify(INFO_BMR_ELEMENTS);

    console.log(BMR_INFO);

    function getTasksForToday () {
        const TODAY_DATE = new Date().toISOString().slice(0, 10);
        const ALL_TASKS = JSON.parse(window.localStorage.getItem('Tasks'));
        const ARRAY_FOR_TEXTS_TASKS_TODAY = [];
        
        const TASKS_FOR_TODAY = ALL_TASKS.map(task => 
           { 
               if (task.date === TODAY_DATE)
           { 
               ARRAY_FOR_TEXTS_TASKS_TODAY.push(task.text);
                // setTasksToday(task.text);
            }
        }
            );
        console.log(ARRAY_FOR_TEXTS_TASKS_TODAY);
        
        return ARRAY_FOR_TEXTS_TASKS_TODAY.join(", ");
        
    }

    useEffect(() => {
        
    }, []);


    return (

        <div className="content">
            <b>Home page is in maintenance mode</b>
                {/* <div>{BMR_INFO}</div> */}
                <WeatherWidget/>
                <div className="bmr-widget widget"><h2>You actual BMR is: {JSON.parse(window.localStorage.getItem('BMRActual'))}</h2></div>
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