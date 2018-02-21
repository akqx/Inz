var mysql = require('mysql');
var express = require('express');
var app = express();
var Validator = require('validator');
var isEmpty = require('lodash/isEmpty');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

function validateInput(data) {
    let errors = {};
    if (Validator.isEmpty(data.nick)) {
        errors.nick = "Wpisz nazwę użytkownika";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Wpisz hasło";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}

app.post('/', function(req, res) {
    const { errors, isValid } = validateInput(req.body);
    if (isValid) {
        const { nick, password } = req.body;
        connection.query("select password, username from user where password='" + password + "' and username='" + nick + "';  ", function(err, result) {
            if (result.length > 0) {

                const token = jwt.sign({
                    username: nick
                }, 'spoko');
                res.json({ token });

            } else {
                console.log('brak uzytkownika');
            }

        });
        console.log(nick + " " + password)
    }
});


app.get('/', function(req, res) {
    console.log(res);
});


app.post('/login/reset', function(req, res) {
    console.log(req.body);

    const { user } = req.body;


    connection.query("select password, email from user where username='" + user + "' ", function(err, result) {

    console.log(result[0].password)
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aplikacja.gromadzaca.przepisy@gmail.com',
                pass: 'Inzynierka2018'
            }
        });

        var mailOptions = {
            from: 'aplikacja.gromadzaca.przepisy@gmail.com',
            to: result[0].email,
            subject: 'Przypomnienie hasła',
            text: 'Twoje hasło to: '+result[0].password
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });


});





module.exports = app;