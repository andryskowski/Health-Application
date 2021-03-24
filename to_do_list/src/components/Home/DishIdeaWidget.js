import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './sass/App.sass';
import { Link } from "react-router-dom";

const DishIdeaWidget = () => {
    const APP_ID = "8bf2417a";
    const APP_KEY = "0bc46a300e6d997eb656edde84e08192";
    const [dishIdeaName, setDishIdeaName] = useState("Dish");
    const [dishIdeaLink, setDishIdeaLink] = useState("https://google.com");
    const [dishIdeaImg, setDishIdeaImg] = useState("https://cdn2.iconfinder.com/data/icons/hotel-96/64/restaurant-food-dinner-plate-dish-512.png");

    function getRandomLetter() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        return alphabet[Math.floor(Math.random() * alphabet.length)]
    }

    const getData = async () => {
        let apiRes = null;
        try {
            const randomLetter = getRandomLetter();
            apiRes = await Axios.get(`https://api.edamam.com/search?q=${randomLetter}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`);
            
            
        } catch (err) {
            console.error("Error response:");
        } finally {
            const amountRecipes = apiRes.data.hits.length;
            const indexRecipe = Math.floor(Math.random() * amountRecipes);
            console.log(apiRes.data.hits[indexRecipe].recipe.label);
            console.log(apiRes.data.hits[indexRecipe].recipe.image);
            console.log(apiRes);
            setDishIdeaName(apiRes.data.hits[indexRecipe].recipe.label);
            setDishIdeaLink(apiRes.data.hits[indexRecipe].recipe.url)
           setDishIdeaImg(apiRes.data.hits[indexRecipe].recipe.image);

        }

    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="dish-widget widget">
                <h1>Recipe of the Day:</h1>
                {/* <h4 href={dishIdeaLink}>{dishIdeaName}</h4> */}
                <h4><a href={dishIdeaLink} class="stretched-link link">{dishIdeaName}</a></h4>
                <img width="100" height="100" src={dishIdeaImg}></img>
            </div>
        </>

    );
};

export default DishIdeaWidget;