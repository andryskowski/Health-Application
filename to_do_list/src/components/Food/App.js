import React, { useState } from 'react';
import Axios from 'axios';
import './sass/App.sass';
import { motion } from 'framer-motion';
import Dishes from './Dishes';
import { Card } from '@material-ui/core';


const App = () => {
  const [actualIngredientName, setActualIngredientName] = useState('your product');
  const [actualIngredientCalories, setActualIngredientCalories] = useState(0);
  const [actualIngredientPhoto, setActualIngredientPhoto] = 
  useState("https://image.flaticon.com/icons/png/512/985/985552.png");
  const [actualIngredientWeight, setActualIngredientWeight] = useState(0);
  const dishObj = {
    name: 'Dish name',
    ingredients: [
      { ingredientName: 'bread', ingredientCal: 200, ingredientWeight: 10, ingredientPhoto: actualIngredientPhoto },
      { ingredientName: 'butter', ingredientCal: 250, ingredientWeight: 15, ingredientPhoto: actualIngredientPhoto }],
    caloriesDish: 450
  };

  const [dish, setDish] = useState(dishObj);
  const [nameDish, setNameDish] = useState('no name');
  const APP_ID = "d91664c7";
  const APP_KEY = "42ccfb6e7bc9af092dcf9c81907435a3";

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
      .then(window.location.reload())
  }

  const getData = async () => {
    let apiRes = null;
    try {
      apiRes = await Axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=
      ${actualIngredientName}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const caloriesPer100G = apiRes.data.parsed[0].food.nutrients.ENERC_KCAL;
      setActualIngredientCalories(caloriesPer100G / 100 * actualIngredientWeight);
      if (apiRes.data.parsed[0].food.image) {
        setActualIngredientPhoto(apiRes.data.parsed[0].food.image);
      }
      else {
        setActualIngredientPhoto("https://image.flaticon.com/icons/png/512/985/985552.png");
      }

    } catch (err) {
      console.error("Error response:");
    } finally {
      console.log(actualIngredientCalories);
    }

  };

  function setActualDish() {
    setDish(prevState => {
      return {
        ...prevState, name: nameDish,

        ingredients: [...prevState.ingredients,
        {
          ingredientName: actualIngredientName
          , ingredientCal: actualIngredientCalories
          , ingredientPhoto: actualIngredientPhoto
          , ingredientWeight: actualIngredientWeight
        }],

        caloriesDish: prevState.caloriesDish + actualIngredientCalories
      };
    });
  }

  function setActualDishName() {
    setDish(prevState => {
      return {
        ...prevState, name: nameDish
      };
    });
  }

  function resetActualDish() {
    setDish({
      name: 'Dish name',
      ingredients: [],
      caloriesDish: 0
    });
  }

  function showDish() {
    console.log({ dish });
  }

  const handleText = e => {
    let h = e.target.value;
    setActualIngredientName(h);
  };

  const handleNameDish = e => {
    let h = e.target.value;
    setNameDish(h);
  };

  const handleWeightIngredient = e => {
    let h = e.target.value;
    setActualIngredientWeight(h);
  };

  const handleCaloriesIngredient = e => {
    let h = e.target.value;
    setActualIngredientCalories(h);
    
  };

  const ingredientsToDisplay = dish.ingredients.map(
    ingredient => <li class="list-group-item">
      {ingredient.ingredientName},
      {ingredient.ingredientCal} cal,
      {ingredient.ingredientWeight} g,
      <img src={ingredient.ingredientPhoto} className="photo" alt='Logo'></img>
    </li>
  )

  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <h1 className="header">Food</h1>
     
      <div className="App dish-container">
        

        <h1>It's place where you can organize your dishes.</h1>
        <p>At first, type name of product (for example 'apple'), add ingredient, 
          click 'Search' buttom to find caloric value 
          and add your dish to your collection!  </p>

        <h5 className="text-secondary">&bull; New Dish</h5>
        <div class="form-inline">
          <div >
            <input type="text" placeholder="Dish name" autoComplete="off" className="form-control" onChange={handleNameDish} />
            <input type="submit" value="ChangeName" className="btn btn-outline-secondary  ml-2" onClick={setActualDishName} />
          </div>
        </div>

        <h5 className="text-secondary">&bull; Add ingredient</h5>
        <div class="form-inline">
          <div >
            <input type="text" placeholder="Search food" autoComplete="off" className="form-control" onChange={handleText} />
            <input type="number" min="0" placeholder="Food weight [g]" autoComplete="off"
              className="form-control" onChange={handleWeightIngredient} />
            <input type="submit" value="Search" className="btn btn-outline-secondary  ml-2" onClick={getData} />
            <input type="submit" value="Add to dish" className="btn btn-outline-secondary  ml-2" onClick={setActualDish} />
            
          </div>
        </div>

        <h5 className="text-secondary">&bull; Add your own ingredient</h5>
        <div class="form-inline">
          <div >
            <input type="text" placeholder="Search food" autoComplete="off" className="form-control" onChange={handleText} />
            <input type="number" min="0" placeholder="Food weight [g]" autoComplete="off"
              className="form-control" onChange={handleWeightIngredient} />
            <input type="number" min="0" placeholder="Calories" autoComplete="off"
              className="form-control" onChange={handleCaloriesIngredient} />
            <input type="submit" value="Add to dish" className="btn btn-outline-secondary  ml-2" onClick={setActualDish} />
          </div>
        </div>
        <output  class="h5" type="text" >{actualIngredientCalories} cal/{actualIngredientWeight}g</output>
        <h5>Your actual dish:</h5>
        <div className="card " style={{ width: '18rem' }}>
          <div onClick={resetActualDish} className="x-button-dish">X Reset</div>
          <div class="card-header bg-info text-light">
            {dish.name}
          </div>
          <ul class="list-group list-group-flush">
            {/* ; {dish.ingredients.join()}; {dish.caloriesDish} */}
            {ingredientsToDisplay}
            <li class="list-group-item"><b>{dish.caloriesDish} calories</b> </li>
          </ul>
        </div>

        <button className="btn btn-outline-secondary  ml-2" onClick={postDish}>Add to dishes</button>
        
        <h5>Collection of yours dishes:</h5>
        <Dishes></Dishes>
        
      </div>
      
      

    </motion.div>
  );
};

export default App;