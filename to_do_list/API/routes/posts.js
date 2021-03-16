const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//get back all the posts, !limit
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    }
    catch (err) {
        res.json({message: err});
    }
});

//submits a post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        email: req.body.email
    });

        try {
            const savedPost = await post.save();
            res.json(savedPost);
        }
        catch(err){
            res.json({message: err});
        }
});

//specific post
router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }
    catch (err){
        res.json({message: err});
    }
});

//delete post
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    }
    catch (err){
        res.json({message: err});
    }
});

//update post 
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: {name: req.body.name }}
        );
        res.json(updatedPost);
    }
    catch (err){
        res.json({message: err});
    }
    });

module.exports = router;