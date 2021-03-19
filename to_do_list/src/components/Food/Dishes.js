import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './sass/App.sass';
import { motion } from 'framer-motion';
import Pagination from './Pagination';


const Dishes = () => {
    // const [dishes, setDishes] = useState(0);
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dishesPerPage] = useState(3);
    const [idDish, setIdDish] = useState(`6053b531b489914858f37a10`);

    async function getDishes() {
        const response = await fetch("http://localhost:8000/dishes")
            .then(response => response.json())
            .then(response => {
                setLoading(true);
                dishesToDisplay(response);
                console.log(response);

            })
            // .then(window.scrollTo(0,document.body.scrollHeight))
            .catch(() => {
                alert('Error retrieving data!');
            });
    }

    async function deleteDish() {
        await fetch(`http://localhost:8000/dishes/${idDish}`, {
            method: 'DELETE',
          })
          .then(res => res.text()) // or res.json()
          .then(res => console.log(res))
      }

    // async function deleteDish() {
    //     try {
    //         let response = await fetch(`http://localhost:8000/dishes/${idDish}`, {
    //             method: "DELETE",
    //         });
    //     } catch (err) {
    //     }
    // }

    

    const dishesToDisplay = (response) => {
        const mappedDishes = response.map(resp => <div className="card" style={{ width: '18rem' }} >
            <button onClick={deleteDish}>X</button>
            <div class="card-header bg-primary text-light">{resp.name}</div>

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

    // const deleteDish = (id) => {
      
    //     console.log("usunieto " + id);
    // }

    useEffect(() => {
        getDishes();
    }, []);

    // Get current dishes
    const indexOfLastDish = currentPage * dishesPerPage;
    const indexOfFirstDish = indexOfLastDish - dishesPerPage;
    const currentDishes = dishes.slice(indexOfFirstDish, indexOfLastDish);
    console.log(currentDishes);

    // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="div-dishes">
            {currentDishes}
            <Pagination
            dishesPerPage={dishesPerPage}
            totalDishes={dishes.length}
            paginate={paginate}
            />
        </div>
    );
};

export default Dishes;