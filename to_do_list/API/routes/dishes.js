const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');


//get back all the dishes
router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    }
    catch (err) {
        res.json({message: err});
    }
});

//submits a dish
router.post('/', async (req, res) => {
    const dish = new Dish({
        name: req.body.name,
        ingredients: req.body.ingredients,
        calories: req.body.calories
    });

        try {
            const savedDish = await dish.save();
            res.json(savedDish);
        }
        catch(err){
            res.json({message: err});
        }
});

//specific dish
router.get('/:dishId', async (req, res) => {
    try{
        const dish = await Dish.findById(req.params.dishId);
        res.json(dish);
    }
    catch (err){
        res.json({message: err});
    }
});

//delete dish
router.delete('/:dishId', async (req, res) => {
    try{
        const removedDish = await Dish.remove({ _id: req.params.dishId });
        res.json(removedDish);
    }
    catch (err){
        res.json({message: err});
    }
});

//update dish
router.patch('/:dishId', async (req, res) => {
    try{
        const updatedDish = await Dish.updateOne(
            { _id: req.params.dishId },
            { $set: {name: req.body.name }}
        );
        res.json(updatedDish);
    }
    catch (err){
        res.json({message: err});
    }
    });

module.exports = router;