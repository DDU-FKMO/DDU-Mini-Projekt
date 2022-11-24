const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

function addUserInfo(email, username, password, teacher) {
    console.log('Adding user: [Email:' + email + ' Username:' + username + ' Password:' + password + ' Teacher:' + teacher + ']');
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO users (userrname, email, password, teacher) VALUES (?, ?, ?, ?)', [username, email, password, teacher], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
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
};
