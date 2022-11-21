const path = require('path');
const fs = require('fs');
const server = require("./server.js");
const io = server.io;
//Require database
const database = require("./database.js");

io.on('connection', (socket) => {
    console.log('A user (' + socket.id + ') connected to server');
    socket.emit("connected", {message:"You are connected"});
    
    socket.on("test", (socket) => {
        console.log("Test");
    });
});