import React from 'react';
import './sass/App.sass';
import {Provider} from 'react-redux';

// import store from '../../store/store'

const App = () => {
    return (
        
        <div className="content">
            <div className="elementsFlex">
            <p>elo</p>
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