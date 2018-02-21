var mysql      = require('mysql');
var express = require('express');
var app = express();
var Validator = require('validator');
var isEmpty= require('lodash/isEmpty');



app.post('/AddProduct', function(req, res){
console.log("admin dodał skałdnik");
const{product, calorie, protein, fat, carb, id}=req.body;


  connection.query("insert into ingredient (name, calories, protein, fat, carb, ingredient_type) values ('"+product+"','"+calorie+"', '"+protein+"','"+fat+"', '"+carb+"', '"+id+"') ", function(err, result) {
            if (err) throw err;
            console.log("Dodano produkt przez admina");
        });
	});


app.post('/delete', function(req, res){
const{id_product_delete}=req.body;


 connection.query("delete  from ingredient where id='"+id_product_delete+"' ", function(err, result) {
            if (err) throw err;
            console.log("Usunięto produkt przez admina");
        });
	});

app.post('/EditProduct', function(req, res){

const{product, calorie, protein, fat, carb, id}=req.body;
console.log(req.body)
connection.query("update ingredient SET calories='"+calorie+"', fat='"+fat+"', carb='"+carb+"', protein='"+protein+"', name='"+product+"' where id ='"+id+"'  ", function(err, result) {
            if (err) throw err;
            console.log("edytowano produkt przez admina");
        });



	});




module.exports = app;

