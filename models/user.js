const mongoose = require('mongoose');
const Nutritionist = require('../nutritionist');
const BodyMeasurements =require ('../bodyMeasurements');

const Schema = mongoose.Schema;

// Create a Schema and a Model

const UserSchema = new Schema({
    //User

    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}, 
    phoneNumber: {type: String, required: true},  
    birthDate: {type: Date, required: true},
    profilePicture: String,
    gender: {type:String, required: true},
    isNutritionist: {type:Boolean, required: true},

    //Client
    nutritionistID: Schema.Types.ObjectId,
    allergies: {type:Array,default:undefined},
    avoiding: {type:Array,default:undefined},
    //homeAddress: String,
     
    //Nutritionist
    summary: String,
    yearsOfExpericence: Number,
    officeAddress: String,
    
    clientsIDs: {type:[Schema.Types.ObjectId],default:undefined},
    PostsIDs: {type:[Schema.Types.ObjectId],default:undefined},
    menusIDs: {type:[Schema.Types.ObjectId],default:undefined}
});

module.exports = mongoose.model('Users', UserSchema);