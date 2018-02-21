var mysql      = require('mysql');
var express = require('express');
 var app = express();


//wszyscy uzytkownicy na localhost:3001/users/username
app.get('/username', function(req, res, next) {
   connection.query("SELECT username FROM user ORDER BY username ASC", function(err, rows) {
               if (!err && rows.length > 0) {
                res.json(rows);
            } else {
                res.json([]);
            }
          
        });
    });

//konkretny user na localhost:3001/users/nazwauzytkownika
app.get('/:username', function(req, res, next) {
        var username = req.params.username;
        connection.query("SELECT * FROM user WHERE username='" + username + "' LIMIT 1", function(err, rows) {
            if (!err && rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.json([]);
            }
        });
    });


//wszsyscy userzy na localhost:3001/users
app.get('/', function(req, res, next) {
   connection.query("SELECT * FROM user where id", function(err, rows) {
               if (!err && rows.length > 0) {
                res.json(rows);
            } else {
                res.json([]);
            }
          
        });
    });


module.exports = app;