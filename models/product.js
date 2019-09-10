const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    calories: Number,
    carbs: Number,
    protein: Number,
    fat: Number,
    unitType: String,
    unitQuantity: Number
    //per 100 grams or 1 unit
});

module.exports = mongoose.model('Product', ProductSchema);