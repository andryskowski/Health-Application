import React, { useEffect, useState } from 'react';
// import './sass/WindowPosts.sass';

const WindowPosts = () => {
    const [posts, setPosts] = useState(0);
    // const array_posts = [];

    async function getForumPost() {
        const response = await fetch("http://localhost:8000/posts")
            .then(response => response.json())
            .then(response => {
                // response.map(resp => array_posts.push(<a>{resp.title}</a>))
                // array_posts.push(response);
                // console.log(array_posts);
                response.map(resp => setPosts(prevState => prevState + 'title:' + resp.title + 'content:' + resp.content + '  '));
                // setPosts(response);
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


    return (

        <div style={{"width" : "20%"}}>
            <h1>Posts</h1>
            <div>{posts}</div>
            

        </div>

    );
};

export default WindowPosts;

