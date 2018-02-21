 var express    = require("express");
 var mysql= require('mysql');
 var app = express();
 var bodyParser= require("body-parser");
 

 connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'food_app'
});
connection.connec

 app.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });

 

app.use(bodyParser.json());

var insertuser=require('./routes/InsertUser');
app.use('/InsertUser/user',insertuser);

var admin=require('./routes/Admin');
app.use('/Admin',admin);

var checkuser=require('./routes/CheckUser');
app.use('/CheckUser/user',checkuser);

var food = require('./routes/Food');
app.use('/Food', food);

var users = require('./routes/Users');
app.use('/Users', users);

var forum = require('./routes/Forum');
app.use('/Forum/addedTopic', forum);

var recipe = require('./routes/Recipe');
app.use('/Recipe', recipe);


 app.listen(3001, function(){
 	console.log('Server is running on localhost:3001');
 });

module.exports=connection;
module.exports=app;