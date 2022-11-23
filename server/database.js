const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

module.exports = {
    get: (table, id) => {
        
    }
}