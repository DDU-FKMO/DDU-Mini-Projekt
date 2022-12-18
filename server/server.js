const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());
app.use(limiter);
app.use(express.static('../site/dist'));
app.get('/', (req, res) => {
    res.sendFile('../site/dist/index.html');
});
app.use('/*', express.static('../site/dist/index.html'));

//Setup server
const http = require('http');
///const https = require('https');

// Certificate
/**const privateKey = fs.readFileSync('/etc/letsencrypt/live/test.stevnbak.dk/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/test.stevnbak.dk/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/test.stevnbak.dk/chain.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
};*/

//Start server
///const httpsServer = https.createServer(credentials, app);
const httpServer = http.createServer(app);

//Socket
const {Server} = require('socket.io');
const {Socket} = require('socket.io-client');

/**httpsServer.listen(443, () => {
    console.log('listening on *:443');
});*/

httpServer.listen(5000, () => {
    console.log('listening on *:5000');
});

//Export io
module.exports = {
    io: new Server(httpServer),
    app: app,
};

//Load logic
require('./logic.js');
