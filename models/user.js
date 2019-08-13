const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model

const UserSchema = new Schema({
    //User
    sessionid: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String, 
    phoneNumber: String, 
    birthDate: Date, 
    city: String,
    profilePicture: String,
    //Client
    nutritionistID: [Schema.Types.ObjectId],
    allergies: Array,
    avoiding: Array,
    //
    //Nutritionist
    summary: String,
    specialization: String,
    location: String,
    yearsOfExpericence: Number,
    clientsIDs: Array,
    PostsIDs: Array,
    menusIDs: Array
});

const user = mongoose.model('Users', UserSchema);

module.exports = user;