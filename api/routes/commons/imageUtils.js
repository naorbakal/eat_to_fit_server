const Image = require('../../../models/image');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const User = require ('../../../models/user');

const fileFilter = (req,file,cb) =>{
	if(file.mimetype=== 'image/png' || file.mimetype=== 'image/jpeg'){
		cb(null,true);
	}
	else{
		cb(null,new Error('Only files of types: image/png or image/jpeg are allowed'));
	}
}

const storage = multer.diskStorage({
	destination:function (req,file,cb){
		cb(null,'./images/');
	},
	filename: function (req,file,cb){
		cb(null, new Date().getTime() + path.extname(file.originalname));
	} 
});

function getUploadObj(){
    const upload = multer({
        storage: storage,
        fileFilter:fileFilter
    });

    return upload;
}

async function getUserImage(userId){
    let user = await User.findById(userId).exec();
    let userImage = await Image.findById(user.profilePicture).exec();
    return userImage;
}


function adjustImageUrl(path){
   let splitedPath = path.toString().split('\\');
   if(path.length <= 1){
       return req.file.path;
   }
   else{
      let strResult ="";  
      splitedPath.forEach(element => {
        strResult += '/';
        strResult += element;
      });
      return strResult;
   }
}

async function saveImageFileInDB(file){
    const imageData = fs.readFileSync(file.path);
	const imageUrl = adjustImageUrl(file.path);
	const image = new Image({
		type: file.mimetype,
		data:imageData,
		url:imageUrl
    });

	return await image.save();
}

module.exports={getUploadObj,getUserImage,saveImageFileInDB};