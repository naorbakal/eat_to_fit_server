const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MealItemSchema = new Schema({
    product: Schema.Types.ObjectId,
    quantity: {type:Number ,default:undefined},
    grams: {type:Number ,default:undefined}
});

module.exports = mongoose.model('MenuItem', MealItemSchema);


