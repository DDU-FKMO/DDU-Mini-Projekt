const path = require('path');
const fs = require('fs');
const server = require('./server.js');
const io = server.io;
const app = server.app;

//Require database
const database = require('./database.js');

//Connection with client
io.on('connection', (socket) => {
    //console.log('A user (' + socket.id + ') connected to server');
    socket.emit('connected', {message: 'You are connected'});

    //Session check
    socket.on('session', (id) => {
        console.log('Recieved session: [' + id + ']');
        //Check if correct with database
        database
            .checkSession(id, socket.request.connection.remoteAddress)
            .then((userId) => {
                ///console.log('UserId: ' + userId);
                socket.emit('session', {approved: true, userId: userId});
            })
            .catch((err) => {
                console.log(err);
                socket.emit('session', {approved: false, userId: null});
            });
    });
});

//Login post request
app.post('/login-post', function (req, res) {
    var email = req.body.Email;
    var password = req.body.Password;
    console.log("Recieved login data: [Email:'" + email + "' Password:'" + password + "']");
    //Check if correct with database
    database
        .checkUserInfo(email, password)
        .then((id) => {
            if (id) {
                database.addSession(id, req.connection.remoteAddress).then((sessionId) => {
                    res.redirect('/login#' + sessionId);
                });
            } else {
                res.redirect('/login#error');
            }
        })
        .catch((err) => {
            console.error(err);
            res.redirect('/login#error');
        });
});

//Register post request
app.post('/register-post', function (req, res) {
    var email = req.body.Email;
    var username = req.body.Name;
    var password = req.body.Password;
    var type = req.body.Type;

    //Check if correct with database
    database
        .addUserInfo(email, username, password, type == 'teacher' ? true : false)
        .then((id) => {
            if (id) {
                database.addSession(id, req.connection.remoteAddress).then((sessionId) => {
                    res.redirect('/login#' + sessionId);
                });
            } else {
                res.redirect('/register#error');
            }
        })
        .catch((err) => {
            console.error(err);
            res.redirect('/register#error');
        });
});
