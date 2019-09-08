const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    calories: mongoose.Schema.Types.Double,
    carbs: mongoose.Schema.Types.Double,
    protein: mongoose.Schema.Types.Double,
    fat: mongoose.Schema.Types.Double,
    unitType: String,
    unitQuantity: Number
    //per 100 grams or 1 unit
});

module.exports = mongoose.model('Product', ProductSchema);