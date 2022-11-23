const path = require('path');
const fs = require('fs');
const server = require("./server.js");
const io = server.io;
const app = server.app;

//Require database
const database = require("./database.js");

//Connection with client
io.on('connection', (socket) => {
    //console.log('A user (' + socket.id + ') connected to server');
    socket.emit("connected", {message:"You are connected"});

    //Session check
    socket.on("session", (id) => {
        console.log("Recieved session: [" + id  + "]");
        //Check if correct with database
        var approved = false;
        if(id) approved = true; 
        socket.emit("session", approved);
    })
});

//Login post request
app.post('/login-post', function(req,res){
    var email = req.body.Email;
    var password = req.body.Password;
    console.log("Recieved login data: [Email:'" + email + "' Password:'" + password + "']");
    //Check if correct with database
    var approved = true;
    if(approved) {
        var sessionId = 0;
        res.redirect("/login#" + sessionId);
    } else {
        res.redirect("/login#error");
    }
});