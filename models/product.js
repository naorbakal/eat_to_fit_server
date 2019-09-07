const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    calories: mongoose.Types.Decimal128,
    carbs: mongoose.Types.Decimal128,
    protein: mongoose.Types.Decimal128,
    fat: mongoose.Types.Decimal128,
    unitType: String,
    unitQuantity: Number
    //per 100 grams or 1 unit
});

module.exports = mongoose.model('Product', ProductSchema);