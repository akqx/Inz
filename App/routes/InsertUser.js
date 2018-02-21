var mysql      = require('mysql');
var express = require('express');
var app = express();
var Validator = require('validator');
var isEmpty= require('lodash/isEmpty');

function validateInput(data){
	let errors={};

if(Validator.isEmpty(data.username)){
	errors.username='Proszę wyDIPApełnić pole';
}

if(!Validator.isEmail(data.email)){
	errors.email='Niepoprawny email';
}
if(Validator.isEmpty(data.email)){
	errors.email='Proszę wypełnić pole';
}
if(Validator.isEmpty(data.passwordConfirmation)){
	errors.passwordConfirmation='Proszę wypełnić pole';
}

if(Validator.isEmpty(data.password)){
	errors.password='Proszę wypełnić pole';
}

if(!Validator.equals(data.password, data.passwordConfirmation)){
	errors.passwordConfirmation='Hasła muszą być takie same!';
}

return{
		errors,
		isValid:isEmpty(errors)
	}
}

app.post('/', function(req, res){
console.log("zal pl");

const{errors,isValid}=validateInput(req.body);
      if(isValid){
			const{username, password,email}=req.body;
		    connection.query("insert into user (username,password,email) values ('"+username+"','"+password+"','"+email+"')",function(err, result){
		            
		            if(err){
		            res.status(500).json({error:err});
                    console.log('Baza danych-> istnieje taki użytkownik');
                    }
					else{ 
				    res.json({success:true});
                    console.log('Dodano użytkownika');
                    }
             });
		}	
		else{
			res.status(400).json(errors);
			
		} 
	});


module.exports = app;

