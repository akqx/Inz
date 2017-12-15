 var express    = require("express");
 var mysql= require('mysql');

var connection= mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'food_app'
});
 var app = express();

 connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });


 app.get("/user",function(req,res){connection.query('select * from ingredient where id_ingredient_type=3', function(err,result){
	res.json(result);
});
});
 app.listen(3000);