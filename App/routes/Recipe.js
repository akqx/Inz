var mysql = require('mysql');
var express = require('express');
var app = express();
var jwtDecode = require('jwt-decode');



app.post('/', function(req, res) {
    const { author, recipe_name, category, recipe_content, ingredient, image_name } = req.body;
    console.log(req.body)
    connection.query("insert into recipe( photo_name, description,text,id_recipe_type, id_user)  values  ('" + image_name + "','" + recipe_content + "','" + recipe_name + "', (select id from recipe_type where name='" + category + "'),(select id from user where username='" + author + "'))", function(err, rows) {

        var ID = rows.insertId;
        console.log(rows.insertId)
        for (var i in ingredient) {
            connection.query("insert into weight (weight, id_ingredient, id_recipe) values ('" + ingredient[i].grams + "','" + ingredient[i].id + "','" + ID + "')", function(err, rows, next) {

            });
        }
    });
});


//http://localhost:3001/recipe/type/daniaglowne
app.get('/type/:name', function(req, res, next) {
    var name = req.params.name;
    connection.query("select * from recipe where id_recipe_type=(select id from recipe_type where name='" + name + "') ", function(err, rows) {
        if (!err && rows.length > 0) {
            res.json(rows);

        } else {

            res.json([]);
        }

    });
});


app.get('/getRecipe/:id', function(req, res, next) {
    var id = req.params.id;
    //        connection.query("select recipe.id , photo_name, description, text ,id_recipe_type, id_user, username from recipe , user where id='" + id + "' and username=(select username from user where id='"+id+"')  ", function(err, rows) {

    connection.query("select username, text, photo_name, description,text, id_user, id_recipe_type from user, recipe where user.id=recipe.id_user and recipe.id=" + id + "", function(err, rows) {
        if (!err && rows.length > 0) {
            res.json(rows);

        } else {

            res.json([]);
        }

    });
});

app.get('/getIngredient/:id', function(req, res, next) {
    var id = req.params.id;
    connection.query("SELECT weight.id, weight.weight, weight.id_recipe, ingredient.name, ingredient.calories, ingredient.protein, ingredient.fat, ingredient.carb  FROM weight, ingredient  where weight.id_ingredient=ingredient.id and id_recipe='" + id + "' ", function(err, rows) {
        if (!err && rows.length > 0) {
            res.json(rows);

        } else {

            res.json([]);
        }

    });
});


app.post('/addedRecipe/comment', function(req, res, next) {
    const { recipe_id, text } = req.body;

    decoded = jwtDecode(req.headers['authorization'].split(' ')[1]);
    var username = decoded.username;
    username = username.substring(1, username.length - 1);


    connection.query("insert into recipe_comment (date, text, id_user, id_recipe) values (NOW(), '" + text + "', (select id from user where username='" + username + "'), '" + recipe_id + "') ", function(err, result) {
        if (err) throw err;
        console.log("Dodano komantarz do przepisu");
    });
    console.log(req.body)


});

app.get('/comments/:id', function(req, res, next) {
    var id = req.params.id;
    connection.query("SELECT recipe_comment.id, date, text, username, id_recipe FROM food_app.recipe_comment, user where recipe_comment.id_user=user.id and id_recipe=" + id + "; ", function(err, rows) {
        if (!err && rows.length > 0) {
            res.json(rows);
        } else {
            res.json([]);
        }
    });
});


app.post('/comment/delete', function(req, res) {
    const { id_comment_delete } = req.body;
    console.log('USUNIECIE')
    console.log(req.body)

    connection.query("delete from recipe_comment where id='" + id_comment_delete + "' ", function(err, result) {
        if (err) throw err;
        console.log("Usunięto komentarz przepisu przez komentującego");
    });


});

app.post('/delete', function(req, res) {
    console.log(req.body)
    const { id } = req.body;
    
    connection.query("delete from fav_user_recipe where id_recipe='" + id + "' ", function(err, result) {
        if (err) throw err;
        console.log("Usunięto przepis z ulubionych");
    });

    connection.query("delete from recipe_comment where id_recipe='" + id + "' ", function(err, result) {
        if (err) throw err;
        else console.log("Usunięto komentarze do przepisu");
    });

    connection.query("delete from recipe_information where id_recipe='" + id + "' ", function(err, result) {
        if (err) throw err;
        console.log("Usunięto informacje do przepisu");
    });
 
    connection.query("delete from weight where id_recipe='" + id + "' ", function(err, result) {
        if (err) throw err;
        else console.log("Usunięto wagę, kaloryczność przepisu do przepisu");
    });


    connection.query("delete from recipe where id='" + id + "' ", function(err, result) {
        if (err) throw err;
        console.log("Usunięto przepis");
    });

});

app.post('/favourite/add', function(req, res) {
    console.log(req.body)
    const { id_recipe } = req.body;

    decoded = jwtDecode(req.headers['authorization'].split(' ')[1]);
    var username = decoded.username;
    username = username.substring(1, username.length - 1);
    console.log(username);
    connection.query("insert into fav_user_recipe(id_user, id_recipe) values ( (select id from user where username='" + username + "'), '" + id_recipe.id + "') ", function(err, result) {
        if (err) throw err;
        console.log("Dodano przepis do ulubionych");
    });


});

app.post('/favourite/delete', function(req, res) {
    console.log(req.body)
    const { id_recipe } = req.body;

    decoded = jwtDecode(req.headers['authorization'].split(' ')[1]);
    var username = decoded.username;
    username = username.substring(1, username.length - 1);
    console.log(username);
    connection.query("delete from fav_user_recipe where  id_user= (select id from user where username='" + username + "') and id_recipe=" + id_recipe.id + " ", function(err, result) {
        if (err) throw err;
        console.log("Usunięto przepis do ulubionych");
    });


});

app.get('/heart/:id/:name', function(req, res) {

    var id = req.params.id;
    var name = req.params.name;
    connection.query("SELECT * from fav_user_recipe where id_user= (select id from user where username='" + name + "') and id_recipe=" + id + " ", function(err, rows) {
        if (!err && rows.length > 0) {
            res.json(rows);

        } else {

            res.json([]);
        }

    });

});

app.get('/heart/:name', function(req, res) {

    var name = req.params.name;
    connection.query("SELECT * from recipe,  fav_user_recipe  where fav_user_recipe.id_user= (select id from user where username='" + name + "') and recipe.id=fav_user_recipe.id_recipe", function(err, rows) {
        if (!err && rows.length > 0) {
            res.json(rows);

        } else {

            res.json([]);
        }

    });

});

app.post('/info', function(req, res) {

    console.log(req.body)
    const { range_hours, range_min, select_Val, vege, recipe_id } = req.body;
    connection.query("delete from recipe_information where id_recipe='" + recipe_id + "' ", function(err, result) {
        if (err) throw err;
    });

    connection.query("insert into recipe_information (vegeterian, prepare_method, prepare_time, id_recipe) values ('" + vege + "', '" + select_Val + "','" + range_hours + " h: " + range_min + " min','" + recipe_id + "') ", function(err, result) {
        if (err) throw err;
        console.log("+ dodatkowe informacje do przepisu");
    });



});

app.get('/getInfo/:id', function(req, res, next) {
    var id = req.params.id;
    //        connection.query("select recipe.id , photo_name, description, text ,id_recipe_type, id_user, username from recipe , user where id='" + id + "' and username=(select username from user where id='"+id+"')  ", function(err, rows) {

    connection.query("select * from recipe_information where id_recipe=" + id + "", function(err, rows) {
        if (!err && rows.length > 0) {
            res.json(rows);

        } else {

            res.json([]);
        }

    });
});



module.exports = app;