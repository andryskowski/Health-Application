import React, { useEffect, useState } from 'react';
// import './sass/App.sass';

const App = () => {
  
    function getForumPost() {
        fetch("http://localhost:8000/posts")
            .then(response => response.json())
            .then(response => {
                console.log(response)

            })
            .catch(() => {
                alert('Error retrieving data!');
            });
    }

    


    return (

        <div className="content">
            <h1 className="header">Forum</h1>
            {/* <button onClick={postForumPost}>dodaj post</button> */}
        </div>

    );
};

export default App;

