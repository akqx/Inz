var mysql = require('mysql');
var express = require('express');
var app = express();
var jwtDecode = require('jwt-decode');


//wszsyscy userzy na localhost:3001/users

app.post('/', function(req, res) {

    //jeżeli jest teraz zalogowany użytkownik
    if (req.headers['authorization']) {
        //pobieranie nazwy użytkownika z dekodowaniem   
        decoded = jwtDecode(req.headers['authorization'].split(' ')[1]);
        var username = decoded.username;
        username = username.substring(1, username.length - 1);

        res.status(201).json({ success: true });

        const { topic_content, topic_name } = req.body;
        connection.query("insert into forum_note(topic, date,content,id_user) values ('" + topic_name + "',CURRENT_TIMESTAMP,'" + topic_content + "', (select id from user where username='" + username + "' ) ) ", function(err, result) {
            if (err) throw err;
            console.log("Dodano temat");
        });
    } else
        res.status(403).json({ error: 'Nie ma zalgowanego użytkownika' });
});

app.get('/note', function(req, res, next) {
    var name = req.params.name;
    connection.query("select forum_note.id,username, topic,date, content from user, forum_note where user.id=forum_note.id_user order by date DESC", function(err, rows) {
        if (!err && rows.length > 0) {
            res.json(rows);
        } else {

            res.json([]);
        }

    });
});

app.get('/note/:id', function(req, res, next) {
    var id = req.params.id;
    connection.query("select username, topic,date, content from user, forum_note where user.id=forum_note.id_user and forum_note.id=" + id + "", function(err, rows) {
        if (!err && rows.length > 0) {
            res.json(rows);
        } else {

            res.json([]);
        }

    });
});


app.get('/note/comments/:id', function(req, res, next) {
    var id = req.params.id;
    connection.query("SELECT forum_comment.id, date, text, username, id_forum_note FROM food_app.forum_comment, user where forum_comment.id_user=user.id and id_forum_note=" + id + "; ", function(err, rows) {
        if (!err && rows.length > 0) {
            res.json(rows);
        } else {
            res.json([]);
        }
    });
});

app.get('/comment/:id', function(req, res, next) {
    var id = req.params.id;
    connection.query("SELECT username, forum_comment.id,date,text,id_forum_note from forum_comment,user where forum_comment.id='"+id+"' and user.id=id_user ", function(err, rows) {
        if (!err && rows.length > 0) {
            res.json(rows);
        } else {
            res.json([]);
        }
    });
});


app.post('/comment', function(req, res) {
    const { topic_id, note_comment} = req.body;

    decoded = jwtDecode(req.headers['authorization'].split(' ')[1]);
    var username = decoded.username;
    username = username.substring(1, username.length - 1);

 
     connection.query("insert into forum_comment (date, text, id_user, id_forum_note) values (NOW(), '"+note_comment+"', (select id from user where username='"+username+"'), "+topic_id+") ", function(err, result) {
            if (err) throw err;
            console.log("Dodano komantarz");
        });

});

app.post('/delete', function(req, res) {
    const {topic_id}=req.body;

     connection.query("delete  from forum_comment where id_forum_note='"+topic_id+"' ", function(err, result) {
            if (err) throw err;
            console.log("Usunięto komentarze do posta, przez autora");
        });
      connection.query("delete from forum_note where id='"+topic_id+"' ", function(err, result) {
            if (err) throw err;
            console.log("Usunięto post,przez autora");
        });

});

app.post('/comment/delete', function(req, res) {
const{id_comment_delete}=req.body;

 connection.query("delete from forum_comment where id='"+id_comment_delete+"' ", function(err, result) {
            if (err) throw err;
            console.log("Usunięto komentarz przez komentującego");
        });


});

app.post('/edit/note', function(req, res) {
const{id, topic,content}=req.body;

 connection.query("UPDATE forum_note SET topic='"+topic+"', content='"+content+"' where id='"+id+"' ", function(err, result) {
            if (err) throw err;
            console.log("Zmieniono post przez autora");
        });
});


app.post('/edit/comment', function(req, res) {
const{id, comment}=req.body;

 connection.query("update forum_comment SET text='"+comment+"'where id ='"+id+"'", function(err, result) {
            if (err) throw err;
            console.log("Zmieniono komantarz przez komentującego");
        });

});


module.exports = app;

