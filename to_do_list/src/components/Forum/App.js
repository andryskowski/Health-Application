import React, { useEffect, useState } from 'react';
import WindowPosts from './WindowPosts';
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

    // function postForumPost() {
    //     console.log('click');
    //     fetch(`http://localhost:8000/posts`, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           title: `sdsadsa`,
    //           content: `stdsasupi`
    //         })
    //       })
    //         .then(resp => resp.json())
    //         // .then(renderToys)
    // }

    useEffect(() => {
        getForumPost()
    }, []);

    function displayPosts() {
        return ('<h1>Posts</h1>')
    }


    return (

        <div className="content">
            <WindowPosts/>
            <h1 className="header">Forum</h1>
            {/* <button onClick={postForumPost}>dodaj post</button> */}
            {/* <button onClick={getForumPost}>get posts</button> */}
            
        </div>

    );
};

export default App;
