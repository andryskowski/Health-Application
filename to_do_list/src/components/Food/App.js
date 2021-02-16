import React, {useState} from 'react';
import Axios from 'axios';


const App = () => {
    const [food, setFood] = useState(0);
    const [calories, setCalories] = useState(0);

    const APP_ID = "d91664c7"

    const APP_KEY = "42ccfb6e7bc9af092dcf9c81907435a3"

    

    const getData = async () => {
        let apiRes = null;
        try {
          apiRes = await Axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${food}&app_id=${APP_ID}&app_key=${APP_KEY}`);
          setCalories(apiRes.data.parsed[0].food.nutrients.ENERC_KCAL);
          console.log(typeof apiRes.data.parsed[0].food.nutrients.ENERC_KCAL);
          
        } catch (err) {
          console.error("Error response:");
        //   console.error(err.response.data);    // ***
        //   console.error(err.response.status);  // ***
        //   console.error(err.response.headers); // ***
        } finally {
          console.log(apiRes);
        }

        // const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${food}&app_id=${APP_ID}&app_key=${APP_KEY}`
        // const result = await Axios.get(url);
        // console.log(result.data.parsed[0].food.nutrients.ENERC_KCAL);
        // console.log(result.data.parsed[0].food.image);
        
    };

    const handleText = e => {
        let h = e.target.value;
        setFood(h);
    };



    return(<>
    <h1 onClick={getData}>elo</h1>
    <input type="text" placeholder="Search food" autoComplete="off" onChange={handleText}/>
    <input type="submit" value="search" onClick={getData}/>
    {/* <h2>{typeof calories === Number ? calories : <p>Invalid value</p>}</h2> */}
    <h2>{food}</h2>
    <h3>{calories}</h3>
    </>
    );
};

export default App;