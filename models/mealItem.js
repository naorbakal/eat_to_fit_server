const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MealItemSchema = new Schema({
    productId: Schema.Types.ObjectId,
    quantity: {type:Number ,default:undefined},
    status:String
});

module.exports = mongoose.model('MealItem', MealItemSchema);


