import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './sass/App.sass';
import { motion } from 'framer-motion';

const Dishes = () => {
    const [dishes, setDishes] = useState(0);

    async function getDishes() {
        const response = await fetch("http://localhost:8000/dishes")
            .then(response => response.json())
            .then(response => {
                dishesToDisplay(response);
                console.log(response);

            })
            // .then(window.scrollTo(0,document.body.scrollHeight))
            .catch(() => {
                alert('Error retrieving data!');
            });
    }
    const dishesToDisplay = (response) => {
        const mappedDishes = response.map(resp => <div className="card" style={{ width: '18rem' }}>
            <div class="card-header">{resp.name}</div>

        {resp.ingredients.map(ingredient => 
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
            {ingredient.ingredientName}, 
            {ingredient.ingredientCal} cal, 
            {ingredient.ingredientWeight} g,
            <img src={ingredient.ingredientPhoto} className="photo"></img>
            </li>
        </ul>)}

        <li class="list-group-item">{resp.calories} calories</li></div>);
        setDishes(mappedDishes);
        
    }

    useEffect(() => {
        getDishes();
    }, []);

  return (
    <div className="div-dishes">
    {dishes}
    </div>
  );
};

export default Dishes;