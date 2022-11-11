const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
const {Socket} = require('socket.io-client');

///app.use(express.static('../site/public/'));
app.use(express.static("../site/dist/"));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../site/dist/index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected to server');
});

server.listen(5000, () => {
    console.log('listening on *:5000');
});
