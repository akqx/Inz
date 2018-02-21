var mysql = require('mysql');
var express = require('express');
var app = express();
var multer= require('multer');


//JSONY do tablicy kalorcznosci poszczególnych typów produktów
//localhost:3001/food/type/napoje
app.get('/type/:name', function(req, res, next) {
   var name = req.params.name;
   connection.query("SELECT * FROM ingredient WHERE ingredient_type='" + name + "'", function(err, rows) {
              if (!err && rows.length > 0) {
                res.json(rows);
            } else {

                res.json([]);
            }
          
        });
    });


//wszystkie na localhost:3001/food/abc
app.get('/abc', function(req, res, next) {
         connection.query("SELECT * FROM ingredient where id ORDER BY name ASC", function(err, rows) {
            if (!err && rows.length > 0) {
                res.json(rows);
            } else {
                res.json([]); 
            }
        });
    });

//wszystkie na localhost:3001/food
app.get('/', function(req, res, next) {
         connection.query("SELECT * FROM ingredient where id", function(err, rows) {
            if (!err && rows.length > 0) {
                res.json(rows);
            } else {
                res.json([]); 
            }
        });
    });

//localhost:3001/food/1
app.get('/:id', function(req, res, next) {
        var id = req.params.id;
        connection.query("SELECT * FROM ingredient WHERE id='" + id + "' LIMIT 1", function(err, rows) {
            if (!err && rows.length > 0) {
                res.json(rows);
            } else {
                res.json([]);
            }
        });
    });

var date;
app.post('/date', function (req, res) {
  console.log(req.body)
date=req.body.date;
});



var storage = multer.diskStorage({
        destination: './ui-react/src/pic/users',
        filename: function (req, file, cb) {
            switch (file.mimetype) {
                case 'image/jpeg':
                    ext = '.jpeg';
                    break;
                case 'image/png':
                    ext = '.png';
                    break;
                    case 'image/jpg':
                    ext = '.jpg';
                    break;
            }
            cb(null, (date+file.originalname));
        }
    });

var upload = multer({storage: storage});

app.use(upload.single('photo'));

app.post('/image1', function (req, res) {
  console.log('IMG START')
    console.log(JSON.stringify(req.body.photo)) // form fields
    console.log(req.photo) // form files
    console.log(req.file) // form files
    res.send(req.body.photo);
    console.log('IMG END')
});


module.exports = app;

