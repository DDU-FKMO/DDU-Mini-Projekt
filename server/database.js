const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

function addUserInfo(email, username, password, teacher) {
    let teachBool = teacher ? 1 : 0;
    console.log('Adding user: [Email:' + email + ' Username:' + username + ' Password:' + password + ' Teacher:' + teacher + ']');
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (userrname, email, password, teacher) VALUES (?, ?, ?, ?)', [username, email, password, teachBool], function (err) {
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

function addTest(klasseId, questions, name){
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO tests (questions, testName) VALUES (?, ?)', [questions, name], function (err) {
            if (err) {
                reject(err);
            } else {
                addClassTest(klasseId, name); // burde nok tilføjes error handling til denne?
                resolve(true);
            }
        });
    });
}

function addClassTest(klasseId,name){
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO assignments (classId, testId) VALUES (?, (SELECT id FROM tests WHERE name = ?))', [klasseId, name], function (err) {
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




function checkUserInfo(email, password) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
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
        db.run('INSERT INTO sessions (UserId, Ip) VALUES (?, ?)', [userId, ip], function (err) {
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
        db.get('SELECT * FROM sessions WHERE Id = ?', [sessionId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row == undefined) {
                    reject('Session not found');
                } else {
                    if (row.Ip == ip) {
                        resolve(row.UserId);
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
    addTest,
    addClassTest,
    addResults,
};
