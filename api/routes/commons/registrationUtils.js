const Menu = require ('../../../models/menu');
const Meal = require ('../../../models/meal');
const MealItem = require('../../../models/mealItem');
const Product = require ('../../../models/product');
const Image = require('../../../models/image');

async function setUserLoginSignUpResponse(user){
    let profilePictureInBits=null;
    if(user.profilePicture){
        profilePictureInBits=await Image.findById(user.profilePicture).exec();
        profilePictureInBits=profilePictureInBits.content;
    }
    return{
        userId:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        isNutritionist:user.isNutritionist,
        profilePicture:profilePictureInBits,
        nutritionistID:user.nutritionistID,
        hasNewMessage:user.hasNewMessage
    }
}


module.exports={setUserLoginSignUpResponse};