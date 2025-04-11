const db = require('../db/database');

const User = {
  create: (data, callback) => {
    const { name, email, password, user_type } = data;
    const sql = 'INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)';
    db.run(sql, [name, email, password, user_type], function (err) {
      callback(err, { id: this?.lastID });
    });
  }
};

module.exports = User;
