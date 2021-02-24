import React, { useEffect } from 'react';
import './sass/App.sass';
import { useSelector } from 'react-redux';
import  WeatherWidget  from './WeatherWidget';

const App = () => {
    const BMRInformations = useSelector(store => store.BMRInformations);

    const INFO_BMR_ELEMENTS = BMRInformations.map(info => (
        info.BMR
    ));

    const BMR_INFO = JSON.stringify(INFO_BMR_ELEMENTS);

    console.log(BMR_INFO);

    function getTasksForToday () {
        const ALL_TASKS = window.localStorage.getItem('Tasks');
        console.log(ALL_TASKS);
    }

    useEffect(() => {
        getTasksForToday();
    }, []);


    return (

        <div className="content">
            <b>Home page is in maintenance mode</b>
                {/* <div>{BMR_INFO}</div> */}
                <WeatherWidget/>
                <div className="bmr-widget widget"><h2>You actual BMR is: {JSON.parse(window.localStorage.getItem('BMRActual'))}</h2></div>
                <div className="bmi-widget widget"><h2>Your actual BMI is: {JSON.parse(window.localStorage.getItem('BMI'))}</h2></div>
                <div className="to-do-list-widget widget"><h2>Tasks to be done today: 
  
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