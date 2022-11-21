const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const {Socket} = require('socket.io-client');

app.use(express.static("../site/dist/"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../site/dist/index.html'));
});
app.use('/*', express.static(path.join(__dirname, '../site/dist/index.html')));

server.listen(5000, () => {
    console.log('listening on *:5000');
});

//Export io
module.exports = {
    io: new Server(server)
};

//Load logic
require("./logic.js");
