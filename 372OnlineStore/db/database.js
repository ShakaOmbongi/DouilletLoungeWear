const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const config = require('../config/config'); // Make sure this path is correct

// Resolve full path to store.db
const dbPath = path.resolve(__dirname, '..', config.db.path);

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite:', err.message);
  } else {
    console.log('Connected to SQLite at', dbPath);

    //  List all tables in the database (for verification)
    db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, rows) => {
      if (err) {
        console.error(" Failed to read tables:", err.message);
      } else {
        console.log("Tables in DB:", rows.map(row => row.name));
      }
    });
  }
});

module.exports = db;
