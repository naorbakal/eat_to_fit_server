const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./api/routes/users");

mongoose.connect('mongodb+srv://admin:'+
//process.env.MONGO_ATLAS_PW+
'admin123' +
'@eattofitdb-7frbx.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true})
.catch(err=>{
     console.log(err);
 });

 app.use(bodyParser.json());

 app.use("/users",userRoutes);

module.exports = app;




 