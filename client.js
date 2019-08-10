const User = require('./User');

class Client extends User {
    constructor(email,
        password,
        firstName,
        lastName, 
        phoneNumber, 
        birthDate, 
        city,
        profilePicture = null){
        super(email,password,firstName,lastName,phoneNumber,birthDate,city,profilePicture);
        this.nutritionistID = null;
        //this.bodyMeasurements = new Array;
        this.allergies = new Array;
        this.avoiding = new Array;
    }
}