import React, { useEffect, useState } from 'react';
// import './sass/WindowPosts.sass';

const WindowPosts = () => {
    const [posts, setPosts] = useState([]);
    // const array_posts = [];

    async function getForumPost() {
        const response = await fetch("http://localhost:8000/posts")
            .then(response => response.json())
            .then(response => {
                // response.map(resp => setPosts(prevState => prevState + 'title:' + resp.title + 'content:' + resp.content + '  '));
                response.map(resp => 
                    setPosts(prevState => [...prevState, <li>{'title: ' + resp.title + ', '}{'content: ' + resp.content}</li>]));

                console.log(posts);
            })
            .catch(() => {
                alert('Error retrieving data!');
            });
        
       
        // setPosts(posts);
    }

    useEffect(() => {
        getForumPost()
    }, []);

    function showPostsInState() {
        console.log(posts);
        console.log(typeof posts);
    }


    return (

        <div style={{"width" : "30%"}}>
            <h1>Posts</h1>
            <div>{posts}</div>
            <button onClick={showPostsInState}>show posts in state</button>

        </div>

    );
};

export default WindowPosts;

