const mongoose = require('mongoose');

const DishSchema = mongoose.Schema(
    {
        name: String,
        ingredients: Array,
        calories: String
    }
);

module.exports = mongoose.model('Dishes', DishSchema);

