const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MealSchema = new Schema({
    title: String,
    mealItemsIDs: Array 
});

module.exports = mongoose.model('Meal', MealSchema);


