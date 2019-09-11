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
    profilePicture: Schema.Types.ObjectId,
    gender: {type:String, required: true},
    isNutritionist: {type:Boolean, required: true},

    //Client
    nutritionistID: {type:Schema.Types.ObjectId, default:null},
    allergies: {type:Array,default:[]},
    avoiding: {type:Array,default:[]},
    //homeAddress: String,
     
    //Nutritionist
    summary: String,
    yearsOfExperience: Number,
    officeAddress: String,
    
    clientsIDs: {type:[Schema.Types.ObjectId],default:[]},
    PostsIDs: {type:[Schema.Types.ObjectId],default:[]},
    menusIDs: {type:[Schema.Types.ObjectId],default:[]}
});

module.exports = mongoose.model('Users', UserSchema);