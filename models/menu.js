const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    author:Schema.Types.ObjectId,
    name: String,
    mealsIds: Array,
    Date: Date,
    Calories: Number
});

module.exports = mongoose.model('Menu', MenuSchema);


