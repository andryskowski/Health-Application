import React, { useState, useEffect } from 'react';
import './sass/App.sass';
import { motion } from 'framer-motion';
import Pagination from './Pagination';
import { Card } from "react-bootstrap"

const Dishes = () => {
    const [dishes, setDishes] = useState([]);
    //pagination
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dishesPerPage] = useState(4);

    async function getDishes() {
        await fetch('http://localhost:8000/dishes')
            .then(response => response.json())
            .then(response => {
                setLoading(true);
                dishesToDisplay(response);
            })
            // .then(window.scrollTo(0,document.body.scrollHeight))
            .catch((error) => {
                console.error(error.name + ': ' + error.message);
                alert('Error retrieving data!');
            });
    }

    async function deleteDish(id) {
        const currentDish = document.getElementById(id);
        currentDish.style.opacity = (0.3);
        await fetch(`http://localhost:8000/dishes/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))
    }

    const dishesToDisplay = (response) => {

        const mappedDishes = response.map(resp =>

            <div className="card dish-from-collection " id={resp._id} style={{ width: '18rem' }} >
                <div className="x-button-dish" id={resp._id} onClick={() => { deleteDish(resp._id); }}>X</div>
                <div class="card-header bg-primary text-light ">{resp.name}</div>

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

    // Get current dishes
    const indexOfLastDish = currentPage * dishesPerPage;
    const indexOfFirstDish = indexOfLastDish - dishesPerPage;
    const currentDishes = dishes.slice(indexOfFirstDish, indexOfLastDish);


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <Card>
            <Card.Body>
                <div className="div-dishes">
                    {currentDishes}
                </div>
                <Pagination
                    dishesPerPage={dishesPerPage}
                    totalDishes={dishes.length}
                    paginate={paginate}
                />

            </Card.Body>
        </Card>
    );
};

export default Dishes;