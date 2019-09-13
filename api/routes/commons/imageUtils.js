var expess = require("express");
var fs = require("fs");

const Image = require('../../../models/image');

async function saveImage(image){
    const serverUrl = "https://eattofit.herokuapp.com/"
    let base64Image = image.split(';base64,').pop();
    let mimeType= image.split(';')[0];
    mimeType = mimeType.split(':')[1].split('/')[1];
    const filePath = './images/'+new Date().getTime() +'.' + mimeType;
    fs.writeFileSync(filePath,base64Image,{encoding: 'base64'});
    const imageUrl = serverUrl + filePath.split('./').pop();
    const imageDB = new Image({
		type: mimeType,
		url:imageUrl
    });
    return await imageDB.save();
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

 module.exports={saveImage};