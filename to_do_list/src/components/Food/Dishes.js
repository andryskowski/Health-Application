import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './sass/App.sass';
import { motion } from 'framer-motion';
import Pagination from './Pagination';

const Dishes = () => {
    // const [dishes, setDishes] = useState(0);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);

    async function getDishes() {
        const response = await fetch("http://localhost:8000/dishes")
            .then(response => response.json())
            .then(response => {
                setLoading(true);
                dishesToDisplay(response);
                // setPosts(response);
                console.log(response);

            })
            // .then(window.scrollTo(0,document.body.scrollHeight))
            .catch(() => {
                alert('Error retrieving data!');
            });
    }
    const dishesToDisplay = (response) => {
        const mappedDishes = response.map(resp => <div className="card" style={{ width: '18rem' }}>
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
        setPosts(mappedDishes);

    }

    useEffect(() => {
        getDishes();
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    console.log(currentPosts);

    // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="div-dishes">
            {currentPosts}
            {/* <Posts posts={currentPosts} loading={loading} /> */}
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            />
        </div>
    );
};

export default Dishes;