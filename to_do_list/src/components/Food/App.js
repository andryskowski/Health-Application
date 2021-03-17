import React, { useState } from 'react';
import Axios from 'axios';
import './sass/App.sass';
import { motion } from 'framer-motion';


const App = () => {
  const [ingredient, setIngredient] = useState('your product');
  const [calories, setCalories] = useState(0);
  const [dish, setDish] = useState({name: 'Dish name', ingredients: ['bread', 'butter'], caloriesDish: 300});
  const [nameDish, setNameDish] = useState('no name');
  const [weightIngredient, setWeightIngredient] = useState(0);

  const APP_ID = "d91664c7"
  const APP_KEY = "42ccfb6e7bc9af092dcf9c81907435a3"

  async function postDish(event) {
    event.preventDefault();
    await fetch(`http://localhost:8000/dishes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: dish.name,
            ingredients: dish.ingredients,
            calories: dish.caloriesDish
        })
    })
        .then(resp => resp.json())
        // .then(window.location.reload())
}

  const getData = async () => {
    let apiRes = null;
    try {
      apiRes = await Axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${ingredient}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const caloriesPer100G = apiRes.data.parsed[0].food.nutrients.ENERC_KCAL;
      setCalories(caloriesPer100G/100*weightIngredient);
      console.log(typeof apiRes.data.parsed[0].food.nutrients.ENERC_KCAL);
      console.log(apiRes.data.parsed[0].food.image);
      console.log(apiRes);

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
    

  };

  function setActualDish() {
    setDish(prevState => {
      return {...prevState, name: nameDish, ingredients: [...prevState.ingredients, ingredient], caloriesDish: prevState.caloriesDish + calories};
    });
  }

  function showDish() {
    console.log({dish});
  }

  const handleText = e => {
    let h = e.target.value;
    setIngredient(h);
  };

  const handleNameDish = e => {
    let h = e.target.value;
    setNameDish(h);
  };

  const handleWeightIngredient = e => {
    let h = e.target.value;
    setWeightIngredient(h);
  };

  return (
    <motion.div initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}>
    <h1 className="header">Food</h1>
  <div className="App">
    <h1 onClick={getData}>It's place where you can find caloric value of your food.</h1>
    <p>At first, type name of product (for example 'apple'), click 'search' buttom and  </p>

    
    <h1>New Dish</h1>
    <div class="form-inline">
      <div >
        {dish.name}
        <input type="text" placeholder="Dish name" autoComplete="off" className="form-control" onChange={handleNameDish} />
        <input type="submit" value="Add" className="btn btn-outline-secondary  ml-2" onClick={setActualDish} />
      </div>
    </div>

    <h1>Add ingredient</h1>
    <div class="form-inline">
      <div >
        <input type="text" placeholder="Search food" autoComplete="off" className="form-control" onChange={handleText} />
        <input type="number" min="0" placeholder="Food weight [g]" autoComplete="off" className="form-control" onChange={handleWeightIngredient} />
        <input type="submit" value="Search" className="btn btn-outline-secondary  ml-2" onClick={getData} />
        <input type="submit" value="Add to dish" className="btn btn-outline-secondary  ml-2" onClick={setActualDish} />
      </div>
    </div>
    {/* <h2>{typeof calories === Number ? calories : <p>Invalid value</p>}</h2> */}
    <h2 className="display-4 text-secondary">{ingredient}</h2>
    <h3>{calories} cal/{weightIngredient}g</h3>

    <p>{dish.name}; {dish.ingredients.join()}; {dish.caloriesDish}</p>
  </div>
  <button onClick={postDish}>postDish</button>
 </motion.div>
  );
};

export default App;