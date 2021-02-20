import React from 'react';
import './sass/App.sass';
import { useSelector } from 'react-redux';

const App = () => {
    // const BMRInformations = useSelector(store => store.BMRInformations);
    // // BMRInformations.filter(info => info.height);
    // const bmrbmr = JSON.stringify(BMRInformations);

    return (
        
        <div className="content">
            <div className="elementsFlex">
            {/* <div>{bmrbmr}</div> */}
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