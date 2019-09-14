const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    author:Schema.Types.ObjectId,
    name: String,
    mealsIds: Array,
    replicaOf:{type:Schema.Types.ObjectId,default:null},
    date: Date,
    calories: Number, 
    protein: Number,
    carbs: Number,
    fat: Number
});

module.exports = mongoose.model('Menu', MenuSchema);


