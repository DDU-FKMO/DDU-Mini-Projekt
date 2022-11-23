const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const server = http.createServer(app);
const {Server} = require('socket.io');
const {Socket} = require('socket.io-client');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 1000 // limit each IP to 100 requests per windowMs
  });
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());
app.use(limiter);

app.use(express.static("../site/dist/"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../site/dist/index.html'));
});

server.listen(5000, () => {
    console.log('listening on *:5000');
});

//Export io
module.exports = {
    io: new Server(server),
    app: app
};

//Load logic
require("./logic.js");

//Redirect all to index
app.use('/*', express.static(path.join(__dirname, '../site/dist/index.html')));
