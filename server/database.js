const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

function addUserInfo(email, username, password, teacher) {
    let teachBool = teacher ? 1 : 0;
    //console.log('Adding user: [Email:' + email + ' Username:' + username + ' Password:' + password + ' Teacher:' + teacher + ']');
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (username, email, password, teacher) VALUES (?, ?, ?, ?)', [username, email, password, teachBool], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

function addClass(className, inviteCode) {
    let teachBool = teacher ? 1 : 0;
    //console.log('Adding user: [Email:' + email + ' Username:' + username + ' Password:' + password + ' Teacher:' + teacher + ']');
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO class (className, inviteCode) VALUES (?, ?)', [className, inviteCode], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

function addUserClass(id, inviteCode){
     return new Promise((resolve, reject) => {
        db.run('INSERT INTO dist (UserId, classId) VALUES (?, (SELECT id FROM class WHERE inviteCode = ?))', [id, inviteCode], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

function addTest(klasseId, questions, testName){
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO tests (questions, testName) VALUES (?, ?)', [questions, testName], function (err) {
            if (err) {
                reject(err);
            } else {
                addClassTest(klasseId, testName); // burde nok tilføjes error handling til denne?
                resolve(true);
            }
        });
    });
}

function addClassTest(klasseId,testName){
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO assignments (classId, testId) VALUES (?, (SELECT id FROM tests WHERE name = ?))', [klasseId, testName], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

function addResults(userId,testId,date, result){
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO results (userId,testId,date, result) VALUES (?, ?,?,?)', [userId,testId,date, result], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

function getUserClass(userId){
    return new Promise((resolve, reject) => {
        db.all('SELECT classId,className from dist LEFT join class on dist.classId = class.id WHERE userId = ?', [userId], function (err,result, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        });
    });
}

function getUserList(classId){
    return new Promise((resolve, reject) => {
        db.all('select username from dist left join users on dist.userId = users.id where classId = ?', [classId], function (err,result, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        });
    });
}



function checkUserInfo(email, password) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function (err,result, fields) {
            if (err) {
                reject(err);
            } else {
                resolve(row.id);
            }
        });
    });
}
function addSession(userId, ip) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO sessions (userId, ip) VALUES (?, ?)', [userId, ip], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
}
function checkSession(sessionId, ip) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM sessions WHERE id = ?', [sessionId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row == undefined) {
                    reject('Session not found');
                } else {
                    if (row.ip == ip) {
                        db.get("SELECT * FROM users WHERE id = ?", [row.userId], (err, row) => {
                            if(err || row == undefined) {
                                reject(err);
                            } else {
                                resolve({id: row.id, name: row.username, teacher: row.teacher});
                            }
                        });
                    } else {
                        reject('Ip mismatch');
                    }
                }
            }
        });
    });
}

module.exports = {
    addUserInfo,
    checkUserInfo,
    addSession,
    checkSession,
    addUserClass,
    addClass,
    addTest,
    addClassTest,
    getUserList,
    addResults,
    getUserClass,
};
