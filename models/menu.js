const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    mealsIDs: Array,
    Date: Date
});

module.exports = mongoose.model('Menu', MenuSchema);


