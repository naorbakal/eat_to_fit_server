const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);


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
 app.use(session({
    secret: 'my-secret',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore(
        { url:'mongodb+srv://admin:admin123@eattofitdb-7frbx.mongodb.net/test?retryWrites=true&w=majority'}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
    }
}));
 app.use("/users",userRoutes);


module.exports = app;




 