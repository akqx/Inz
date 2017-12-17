var express = require('express');
var router = express.Router();

//JSONY do tablicy kalorcznosci poszczególnych typów produktów
router.get('/type/:name', function(req, res, next) {
    pool.getConnection(function(err, connection) {
   var name = req.params.name;
   connection.query("SELECT * FROM ingredient WHERE ingredient_type='" + name + "'", function(err, rows) {
                res.json(rows);
          
        });
    });
});

router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query("SELECT * FROM ingredient where id", function(err, rows) {
            if (!err && rows.length > 0) {
                res.json(rows);
            } else {
                res.json([]);
            }
        });
    });
});


router.get('/:id', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var id = req.params.id;
        connection.query("SELECT * FROM ingredient WHERE id='" + id + "' LIMIT 1", function(err, rows) {
            if (!err && rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.json([]);
            }
        });
    });
});
module.exports = router;