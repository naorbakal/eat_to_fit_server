const mongoose = require('mongoose');
const Nutritionist = require('../nutritionist');
const BodyMeasurements =require ('../bodyMeasurements');

const Schema = mongoose.Schema;

// Create a Schema and a Model

const UserSchema = new Schema({
    //User
    //_id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    firstName: String,
    lastName: String, 
    phoneNumber: String, 
    birthDate: Date,
    city: String,
    profilePicture: String,
    //Client
    nutritionistID: Schema.Types.ObjectId,
    allergies: {type:Array,default:undefined},
    avoiding: {type:Array,default:undefined},
    bodyMeasurements: {type:Array,default:undefined},
    //
    //Nutritionist
    summary: String,
    specialization: String,
    location: String,
    yearsOfExpericence: Number,
    clientsIDs: {type:Array,default:undefined},
    PostsIDs: {type:Array,default:undefined},
    menusIDs: {type:Array,default:undefined}
});

module.exports = mongoose.model('Users', UserSchema);