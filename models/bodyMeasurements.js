const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bodyMeasurementsSchema = new Schema({
    clientEmail: String,
    weight: String, //kg
    height: String, //cm
    fatPercent: String,
    bodyMass: String,
    date: Date
});

const bodyMeasurements = mongoose.model('bodyMeasurements', bodyMeasurementsSchema);

module.exports = bodyMeasurements;