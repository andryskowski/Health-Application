import React, { useState } from 'react';
import Axios from 'axios';
import './sass/App.sass';
import { motion } from 'framer-motion';


const App = () => {
  const [food, setFood] = useState('your product');
  const [calories, setCalories] = useState(0);
  const [dish, setDish] = useState({name: 'kanapka', ingredients: ['bread', 'butter'], calories: 300});
  const [nameDish, setNameDish] = useState('no name');
  const [weightFood, setWeightFood] = useState(0);

  const APP_ID = "d91664c7"
  const APP_KEY = "42ccfb6e7bc9af092dcf9c81907435a3"

  const getData = async () => {
    let apiRes = null;
    try {
      apiRes = await Axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${food}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const caloriesPer100G = apiRes.data.parsed[0].food.nutrients.ENERC_KCAL;
      setCalories(caloriesPer100G/100*weightFood);
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

  function setActualDish() {
    setDish(prevState => {
      return {...prevState, name: nameDish};
    });
  }

  function showDish() {
    console.log({dish});
  }

  const handleText = e => {
    let h = e.target.value;
    setFood(h);
  };

  const handleNameDish = e => {
    let h = e.target.value;
    setNameDish(h);
  };

  const handleWeightFood = e => {
    let h = e.target.value;
    setWeightFood(h);
  };

  return (
    <motion.div initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}>
<h1 className="header">Food</h1>
  <div className="App">
    <h1 onClick={getData}>It's place where you can find caloric value of your food.</h1>
    <p>At first, type name of product (for example 'apple'), click 'search' buttom and  </p>
    <div class="form-inline">
      <div >
        <input type="text" placeholder="Search food" autoComplete="off" className="form-control" onChange={handleText} />
        <input type="text" placeholder="Food weight [g]" autoComplete="off" className="form-control" onChange={handleWeightFood} />
        <input type="submit" value="Search" className="btn btn-outline-secondary  ml-2" onClick={getData} />
      </div>
    </div>
    {/* <h2>{typeof calories === Number ? calories : <p>Invalid value</p>}</h2> */}
    <h2 className="display-4 text-secondary">{food}</h2>
    <h3>{calories} cal/{weightFood}g</h3>
    
    <h1>New Dish</h1>
    <div class="form-inline">
      <div >
        <p>Dish name</p>
        <input type="text" placeholder="Dish name" autoComplete="off" className="form-control" onChange={handleNameDish} />
        <input type="submit" value="Add" className="btn btn-outline-secondary  ml-2" onClick={setActualDish} />
      </div>
    </div>
  </div>
  <button onClick={showDish}>showDish</button>
 </motion.div>
  );
};

export default App;