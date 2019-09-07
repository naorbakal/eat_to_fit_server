

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