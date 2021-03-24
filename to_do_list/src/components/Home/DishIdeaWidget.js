import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './sass/App.sass';

const DishIdeaWidget = () => {
    const APP_ID = "8bf2417a";
    const APP_KEY = "0bc46a300e6d997eb656edde84e08192";

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
            console.log(apiRes);
            console.log(apiRes.data.hits[0].recipe.label);
        }

    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className="dish-widget widget">
                <h1>Recipe of the Day:</h1>
            </div>
        </>

    );
};

export default DishIdeaWidget;