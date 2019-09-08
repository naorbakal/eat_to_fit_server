const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;

const bodyMeasurementsSchema = new Schema({
    clientID: Schema.Types.ObjectId,
    weight: Number, //kg
    height: Number, //cm
    fatPercent: mongoose.Schema.Types.Double,
    bodyMassPercent: mongoose.Schema.Types.Double,
    date: Date
});

const bodyMeasurements = mongoose.model('bodyMeasurements', bodyMeasurementsSchema);

module.exports = bodyMeasurements;