const mongoose = require('mongoose');
let user = require('./models/user');

mongoose.connect('mongodb://localhost/eat_to_fit', { useNewUrlParser: true });
let db = mongoose.connection;

db.once('open', function(){
    console.log("connected..");
});
/*
db.dropCollection("users", function (err, result) {

    if (err) {

        console.log("error delete collection");

    } else {

        console.log("delete collection success");

    }

});

*/


const newUser = new user({
    email: 'test@eat_to_fit.co.il'
});



db.on('error',function(err){
    console.log(err);
});


newUser.save();



