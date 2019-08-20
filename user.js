class User {
    constructor(email,
                password,
                firstName,
                lastName, 
                phoneNumber, 
                birthDate, 
                city,
                profilePicture = null) {
                    this.email = email;
                    this.password = password;
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.phoneNumber = phoneNumber;
                    this.birthDate = birthDate;
                    this.city = city;
                    this.profilePicture = profilePicture;
                }           
}

module.exports = User;