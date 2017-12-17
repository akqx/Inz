 var express    = require("express");
 var mysql= require('mysql');
 var app = express();
 

 pool= mysql.createPool({
	host:'localhost',
	user:'root',
	password:'root',
	database:'food_app'
});

 app.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });


var food = require('./routes/Food');
app.use('/Food', food);

var users = require('./routes/Users');
app.use('/Users', users);



 app.listen(3001, function(){
 	console.log('Server is running on localhost:3001');
 });

module.export=pool;
module.export=app;