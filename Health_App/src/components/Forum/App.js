import React, { useEffect, useState, useRef } from 'react';
import './sass/App.sass';
import { useAuth } from "../../contexts/AuthContext";
import { motion } from 'framer-motion';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [actualPostTitle, setActualPostTitle] = useState('');
    const [actualPostContent, setActualPostContent] = useState('');
    const TODAY_DATE = new Date().toISOString().slice(0, 10);
    //to set navigation bar of div with posts at bottom
    const el = useRef(null);
    const { currentUser } = useAuth();
    console.log(currentUser.email);

    async function getForumPost() {
        const response = await fetch("http://localhost:8000/posts")
            .then(response => response.json())
            .then(response => {
                // response.map(resp => setPosts(prevState => prevState + 'title:' + resp.title + 'content:' + resp.content + '  '));
                response.map(resp =>
                    setPosts(prevState => [...prevState, <li><b>{'email: ' + resp.email }</b>
                    {' title: ' + resp.title + ', ' + 
                    'date: ' + resp.date + ', ' + 
                    'content: ' + resp.content}</li>]));

                console.log(posts);
            })
            // .then(window.scrollTo(0,document.body.scrollHeight))
            .catch(() => {
                alert('Error retrieving data!');
            });
    }

    async function postForumPost(event) {
        event.preventDefault();
        console.log('click');
        await fetch(`http://localhost:8000/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: actualPostTitle,
                content: actualPostContent,
                date: TODAY_DATE,
                email: currentUser.email
            })
        })
            .then(resp => resp.json())
            .then(window.location.reload())
    }

    useEffect(() => {
        getForumPost();
        const windowPosts = document.querySelector('.ul-posts');
        window.scrollTo(0, windowPosts.scrollHeight);
    }, []);

    //to set navigation bar of div with posts at bottom
    useEffect(() => {
        el.current.scrollIntoView({ block: 'end', behavior: 'auto' });
    });

    function showPostsInState() {
        console.log(posts);
        console.log(typeof posts);
    }

    function handleOnChangeTitle(e) {
        let actualInput = e.target.value;
        setActualPostTitle(actualInput);
    }

    function handleOnChangeContent(e) {
        let actualInput = e.target.value;
        setActualPostContent(actualInput);
    }

    return (
        <div>
        <h1 className='header'>Forum</h1>
        <div className='parent'>
            <h2 className='title'>Posts</h2>
        </div>
        <motion.div initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}>
        <div className="App">
            <div className="window-posts">
                <ul className="ul-posts" style={{}}>{posts}
                </ul>
                {/* to set navigation bar of div with posts at bottom */}
                <div id={'el'} ref={el}>
                </div>
            </div>

            {/* <button onClick={showPostsInState}>show posts in state</button> */}
            <br></br>
            <form className='form-personalised' onSubmit={postForumPost}>
                <div className='form-item'>
                    <label className='label-personalised'>Title:</label>
                    <input className='input' type="text" onChange={handleOnChangeTitle} name="newPost" />
                </div>
                <div className='form-item'>
                    <label className='label-personalised'>Message:</label>
                    <input className='input' type="text" onChange={handleOnChangeContent} name="newPost" />
                </div>
                {/* <input type="submit" value="Wyślij" onClick={postForumPost}/> */}
                <button className="btn btn-outline-secondary form-item">Submit</button>
                {/* <input type="submit" value="Wyślij" /> */}
            </form>
        </div>
        </motion.div>
        </div>
    );
};

export default App;

