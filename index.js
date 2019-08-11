var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true }, function(err, db) {
  dbo = db.db("mydb");
  dbo.createCollection("Clients");//, function(err, res){
    //dbo.close();
 // );
}
);



