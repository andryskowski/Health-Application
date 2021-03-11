import React, { useEffect, useState } from 'react';
// import './sass/WindowPosts.sass';

const WindowPosts = () => {
    const [posts, setPosts] = useState([]);
    const [actualPostContent, setActualPostContent] = useState('');
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
    }

    
    function postForumPost() {
        console.log('click');
        fetch(`http://localhost:8000/posts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: `nowyPost`,
              content: actualPostContent
            })
          })
            .then(resp => resp.json())
          
            // .then(renderToys)
    }

    useEffect(() => {
        getForumPost()
    }, []);

    function showPostsInState() {
        console.log(posts);
        console.log(typeof posts);
        console.log(actualPostContent);
    }

    function handleOnChangePost(e) {
        let h = e.target.value;
        setActualPostContent(h);
    }

    return (

        <div style={{ "width": "30%" }}>
            <h1>Posts</h1>
            <div>{posts}</div>
            <button onClick={showPostsInState}>show posts in state</button>
            <br></br>
            <form>
                <label>
                    Content:
                <input type="text" onChange={handleOnChangePost} name="newPost" />
                </label>
                
            </form>
            <button onClick={postForumPost}>Send</button>
        </div>

    );
};

export default WindowPosts;

