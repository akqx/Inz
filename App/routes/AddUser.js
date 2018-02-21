var mysql      = require('mysql');
var express = require('express');
 var app = express();



//wszsyscy userzy na localhost:3001/users

app.get('/', function(req, res){
    connection.query("insert into user (username,password,email) values ('okml','spomlko','akklk@o')",function(err, result){
        if(err) throw err;
            console.log("Dodano użytkownika");
        });
});


module.exports = app;