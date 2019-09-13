
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const boolParser = require('express-query-boolean');

//mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const userRoute = require("./api/routes/users");
const loginRoute = require("./api/routes/login");
const signUpRoute = require("./api/routes/signUp");
const bodyMeasurementsRoute = require("./api/routes/bodyMeasurements");
const productsRoute = require("./api/routes/products");
const menusRoute = require ("./api/routes/menus");
const nutritionistsRoute = require("./api/routes/nutritionists");
const clientsRoute = require("./api/routes/clients");
const calendarRoute = require("./api/routes/meetings");
const postsRoute = require ("./api/routes/posts");
const chatRoute = require("./api/routes/chat");
const meetingsRoute = require("./api/routes/meetings")

mongoose.connect('mongodb+srv://admin:'+
//process.env.MONGO_ATLAS_PW+
'admin123' +
'@eattofitdb-7frbx.mongodb.net/EatToFit?retryWrites=true&w=majority',
{useUnifiedTopology: true, 
  useNewUrlParser: true}
)
.catch(err=>{
     console.log(err);
 });

 app.use(bodyParser.json());
 app.use(boolParser());

 app.use(session({
    secret: 'my-secret',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore(
        { url:'mongodb+srv://admin:admin123@eattofitdb-7frbx.mongodb.net/EatToFit?retryWrites=true&w=majority'}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // two weeks
    }
}));

app.use("/signUp",signUpRoute);
app.use("/login", loginRoute);
app.use("/users",userRoute);
app.use("/bodyMeasurements", bodyMeasurementsRoute);
app.use("/products", productsRoute);
app.use("/menus",menusRoute);
app.use("/nutritionists",nutritionistsRoute)
app.use("/calendar", calendarRoute);
app.use('/images', express.static(__dirname + '/images'));
app.use('/posts',postsRoute);
app.use('/chat',chatRoute);
app.use('/clients',clientsRoute);
app.use('/meetings',meetingsRoute);


module.exports = app;




 