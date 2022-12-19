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
        ///console.log('Recieved session: [' + id + '] from IP: [' + socket.handshake.address + ']');
        //Check if correct with database
        database
            .checkSession(id, socket.handshake.address)
            .then((userInfo) => {
                socket.emit('session', {approved: true, user: userInfo});
            })
            .catch((err) => {
                console.log(err);
                socket.emit('session', {approved: false, user: null});
            });
    });

    //Prøve info
    socket.on('getPrøver', (data) => {
        //Check if session is correct with database
        database
            .checkSession(data.session, socket.handshake.address)
            .then((userInfo) => {
                if (userInfo.id == data.user) {
                    database
                        .getTests(data.user)
                        .then((prøver) => {
                            database
                                .getCompletedTests(data.user)
                                .then((completedPrøver) => {
                                    console.log(completedPrøver);
                                    for (let i = 0; i < prøver.length; i++) {
                                        if (completedPrøver.includes(prøver[i].id)) {
                                            prøver[i].completed = true;
                                        } else {
                                            prøver[i].completed = false;
                                        }
                                    }
                                    socket.emit('prøveInfo', prøver);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    throw new Error('Session and user id does not match');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // get classes:
    socket.on('getKlasser', (data) => {
        //Check if session is correct with database
        database
            .checkSession(data.session, socket.handshake.address)
            .then((userInfo) => {
                if (userInfo.id == data.user) {
                    database
                        .getUserClass(data.user)
                        .then((klasser) => {
                            socket.emit('klasseInfo', klasser);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    throw new Error('Session and user id does not match');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });

    //Result info
    socket.on('getResults', (data) => {
        //Check if session is correct with database
        database
            .checkSession(data.sessionId, socket.handshake.address)
            .then((userInfo) => {
                if (userInfo.id == data.userId) {
                    if (userInfo.teacher == 1) {
                        database
                            .getResults(data.testId, data.classId)
                            .then((prøver) => {
                                socket.emit('resultInfo', prøver);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        throw new Error('User is not a teacher');
                    }
                } else {
                    throw new Error('Session and user id does not match');
                }
            })
            .catch((err) => {
                console.log(err);
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
                database.addSession(id, req.socket.remoteAddress).then((sessionId) => {
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
    database.checkUserExists(email)
    .then((eks => {
        if (!eks){
        database
        .addUserInfo(email, username, password, type == 'teacher' ? true : false)
        .then((id) => {
            if (id) {
                database.addSession(id, req.socket.remoteAddress).then((sessionId) => {
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
        }
        else{
            res.redirect('/register#error');
        }
    }))
    .catch((err) => {
            console.error(err);
            res.redirect('/register#error');
        });
    
});

//Prøve post request
app.post('/opgave-post', function (req, res) {
    console.log(req.body);
    //Check if session is correct with database
    database
        .checkSession(req.body.session, req.socket.remoteAddress)
        .then((userInfo) => {
            database
                .getTests(userInfo.id)
                .then((prøver) => {
                    let prøve = prøver.find((prøve) => {
                        return prøve.id == req.body.prøveId;
                    });
                    if (prøve) {
                        let svar = [];
                        let data = JSON.parse(prøve.questions);
                        for (let i = 0; i < data.questions.length; i++) {
                            svar.push(req.body['answer-' + data.questions[i].questionName]);
                        }
                        console.log('Svar:');
                        console.log(svar);
                        database.addResults(userInfo.id, prøve.id, Date.now(), svar).then((result) => {
                            if (result == true) {
                                res.redirect('/opgaver');
                            } else {
                                res.redirect('/opgaver#error');
                            }
                        });
                    } else {
                        throw new Error('Prøve not found');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log('Completed tests');
            console.log(err);
        });
});

app.post('/new-class', function (req, res) {
    var inviteCode = req.body.inviteCode;
    var className = req.body.className;
    var userId = req.body.userId;

    //Check if correct with database
    database
        .addClass(className, inviteCode)
        .then((id) => {
            if (id) {
                database.addUserClass(userId, inviteCode).then((succ) => {
                    res.redirect('/klasser');
                });
            } else {
                res.redirect('/opret_klasse#error');
            }
        })
        .catch((err) => {
            console.error(err);
            res.redirect('/opret_klasse#error');
        });
});

app.post('/join-class', function (req, res) {
    var inviteCode = req.body.inviteCode;
    var userId = req.body.userId;
    console.log(userId + ':' + inviteCode);
    //Check if correct with database
    database
        .checkClassJoin(userId, inviteCode)
        .then((works) => {
            database.addUserClass(userId, inviteCode).then((succ) => {
                console.log('success');
                res.redirect('/join_klasse#success');
            });
        })
        .catch((err) => {
            console.log(err);
            url = '/join_klasse#' + err;
            console.log(url);
            res.redirect(url); //'/join_klasse#error'
        });
});

app.post('/submit-test', function (req, res) {
    var className = req.body.className;
    var questions = req.body.questions;
    var testName = req.body.testName;
    //Check if correct with database
    database
        .testClassExist(className, questions, testName)
        .then((works) => {
            res.redirect('/submit-test#success');
        })
        .catch((err) => {
            console.log(err);
            url = '/submit-test#error';
            res.redirect(url);
        });
});