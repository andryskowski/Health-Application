import React from 'react';
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

    return (

        <div className="content">
            <div className="elementsFlex">
                <div>{BMR_INFO}</div>
                <WeatherWidget/>
            </div>
           
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