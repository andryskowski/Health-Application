import React, { useState } from 'react';
import Axios from 'axios';
import './sass/App.sass';
import { motion } from 'framer-motion';
import Dishes from './Dishes';
import { Card } from '@material-ui/core';

const App = () => {
  const [actualIngredientName, setActualIngredientName] = useState('');
  const [searchIngredientName, setSearchIngredientName] = useState('');
  const [actualIngredientCalories, setActualIngredientCalories] = useState('');
  const [actualCaloriesPer100G, setActualCaloriesPer100G] = useState('');
  const [actualIngredientPhoto, setActualIngredientPhoto] = useState("https://image.flaticon.com/icons/png/512/985/985552.png");
  const [defaultIngredientPhoto, setDefaultIngredientPhoto] = useState("https://image.flaticon.com/icons/png/512/985/985552.png");
  const [actualIngredientWeight, setActualIngredientWeight] = useState('');
  const emptyDish = {
    name: 'New Dish',
    ingredients: [],
    caloriesDish: 0
  };

  const [dish, setDish] = useState(emptyDish);
  const [nameDish, setNameDish] = useState('New Dish');
  const APP_ID = "d91664c7";
  const APP_KEY = "42ccfb6e7bc9af092dcf9c81907435a3";

  async function postDish(event) {
    if (dish.ingredients.length == 0) {
      alert("Add at least one ingredient to your dish");
    } else {
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
  }

  const getData = async () => {
    let apiRes = null;
    try {
      apiRes = await Axios.get(`https://api.edamam.com/api/food-database/v2/parser?ingr=${searchIngredientName}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const caloriesPer100G = apiRes.data.parsed[0].food.nutrients.ENERC_KCAL;
      setActualCaloriesPer100G(caloriesPer100G);
      setActualIngredientName(searchIngredientName);
      setActualIngredientCalories(caloriesPer100G / 100 * actualIngredientWeight);
      if (apiRes.data.parsed[0].food.image) {
        setActualIngredientPhoto(apiRes.data.parsed[0].food.image);
      }
      else {
        setActualIngredientPhoto(defaultIngredientPhoto);
      }
    } catch (err) {
      console.error("Error response:");
      alert('Ingredient not found')
    } finally {
      console.log(actualIngredientName);
    }
  };

  function setActualDish() {
    if (actualIngredientName == '' || actualIngredientWeight == '' || actualIngredientCalories == '') {
      alert('Fill up all the ingredient fields');
    } else {
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

          caloriesDish: 0.0 + prevState.caloriesDish * 1.0 + actualIngredientCalories * 1.0
        };
      });
    }
  }

  function setActualDishName() {
    setDish(prevState => {
      return {
        ...prevState, name: nameDish
      };
    });
  }

  function resetActualDish() {
    setDish(emptyDish);
  }

  function showDish() {
    console.log({ dish });
  }

  const handleActualIngredientName = e => {
    let h = e.target.value;
    setActualIngredientName(h);
    setActualIngredientPhoto(defaultIngredientPhoto);
    setActualCaloriesPer100G('');
  };

  const handleNameDish = e => {
    let h = e.target.value;
    setNameDish(h);
  };

  const handleWeightIngredient = e => {
    let h = e.target.value;
    if(h.charAt(0) == "-" || h.charAt(0) == "0") h="";
    setActualIngredientWeight(h);
    if(actualCaloriesPer100G != ''){
      setActualIngredientCalories(actualCaloriesPer100G / 100 * h);
    }
  };

  const handleCaloriesIngredient = e => {
    let h = e.target.value;
    if(h.charAt(0) == "-" || h.charAt(0) == "0") h="";
    setActualIngredientCalories(h);
  };

  const handleSearchIngredientName = e => {
    let h = e.target.value;
    setSearchIngredientName(h);
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
      {/* <h1 className="header">Food</h1> */}
     
      <div className="App dish-container">
        <h1 className='header'>Dishes</h1>
        
        <h1 class="dishes-header">It's a place where you can organize your dishes</h1>
        <p class="dishes-info">At first, type name of product (for example 'apple'), add ingredient, 
          click 'Search' buttom to find caloric value 
          and add your dish to your collection!  </p>

        <h5 className="text-secondary dishes-steps">&bull; New Dish</h5>
        <div class="form-inline">
          <div >
            <input type="text" placeholder="Dish name" autoComplete="off" className="form-control text-dishes" onChange={handleNameDish} />
            <input type="submit" value="Change Name" className="btn btn-outline-secondary ml-2 dishes-buttons" onClick={setActualDishName} />
          </div>
        </div>

        <h5 className="text-secondary dishes-steps">&bull; Find ingredient</h5>
        <div class="form-inline">
          <div >
            <input type="text" placeholder="Ingredient name" autoComplete="off" className="form-control text-dishes" onChange={handleSearchIngredientName} />
            <input type="submit" value="Search" className="btn btn-outline-secondary ml-2 dishes-buttons" onClick={getData} />
          </div>
        </div>

        <h5 className="text-secondary dishes-steps">&bull; Add ingredient</h5>
        <div class="form-inline add-ingredients">
          <div>
            <input type="text" placeholder="Ingredient name" autoComplete="off"
              className="form-control text-dishes" value={actualIngredientName} onChange={handleActualIngredientName} />
          </div>
          <div>
            <input type="number" min="0" placeholder="Ingredient weight [g]" autoComplete="off"
              className="form-control text-dishes" value={actualIngredientWeight} onChange={handleWeightIngredient} />
          </div>
          <div>
            <input type="number" min="0" placeholder="Calories" autoComplete="off"
              className="form-control text-dishes" value={actualIngredientCalories} onChange={handleCaloriesIngredient} />
          </div>
          <div>
            <img src={actualIngredientPhoto} className="photo center mt-2" alt='Logo'></img>
          </div>
          <div>
            <input type="submit" value="Add to dish" className="btn btn-outline-secondary dishes-buttons" onClick={setActualDish} />
          </div>
        </div>
        {/* <output  class="h5 calories-dish-ingr" type="text" >{actualIngredientCalories} cal/{actualIngredientWeight}g</output> */}
        <h5 class="calories-dish-ingr">Your actual dish:</h5>
        <div className="card your-dish" style={{ width: '18rem' }}>
          <div onClick={resetActualDish} className="x-button-dish">Reset</div>
          <div class="card-header bg-info text-light new-dish">
            {dish.name}
          </div>
          <ul class="list-group list-group-flush dish-table-info">
            {ingredientsToDisplay}
            <li class="list-group-item"><b>Summary: {dish.caloriesDish} calories</b> </li>
          </ul>
        </div>

        <button className="btn btn-outline-secondary ml-2 dishes-buttons" onClick={postDish}>Add to dishes</button>
        
        <p class="collection-dish">Collection of yours dishes</p>
        <Dishes></Dishes>
        
      </div>
      
    </motion.div>
  );
};

export default App;