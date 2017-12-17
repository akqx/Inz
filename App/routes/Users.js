var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection) {
   var name = req.params.name;
   connection.query("SELECT * FROM user", function(err, rows) {
                res.json(rows);
          
        });
    });
});


router.get('/:username', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var username = req.params.username;
        connection.query("SELECT * FROM user WHERE username='" + username + "' LIMIT 1", function(err, rows) {
            if (!err && rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.json([]);
            }
        });
    });
});
module.exports = router;