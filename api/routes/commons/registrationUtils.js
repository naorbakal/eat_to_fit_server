const Menu = require ('../../../models/menu');
const Meal = require ('../../../models/meal');
const MealItem = require('../../../models/mealItem');
const Product = require ('../../../models/product');

function setUserLoginSignUpResponse(user){
    return{
        userId:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        isNutritionist:user.isNutritionist,
        profilePicture:user.profilePicture
    }
}


module.exports={setUserLoginSignUpResponse};