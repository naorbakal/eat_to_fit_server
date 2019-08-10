// require client, posts, menus

class Nutritionist{
    constructor(email,
        password,
        firstName,
        lastName, 
        phoneNumber, 
        birthDate, 
        city,
        profilePicture = null){
            super(email,password,firstName,lastName,phoneNumber,birthDate,city,profilePicture);
            this.summary;
            this.specialization;
            this.location;
            this.yearsOfExpericence;
            this.clientsIDs = new Array;
            this.PostsIDs = new Array;
            this.menusIDs = new Array;
    }
}