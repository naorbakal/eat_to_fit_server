const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bodyMeasurementsSchema = new Schema({
    clientID: Schema.Types.ObjectId,
    weight: Number, //kg
    height: Number, //cm
    fatPercent: mongoose.Types.Decimal128,
    bodyMassPercent: mongoose.Types.Decimal128,
    date: Date
});

const bodyMeasurements = mongoose.model('bodyMeasurements', bodyMeasurementsSchema);

module.exports = bodyMeasurements;