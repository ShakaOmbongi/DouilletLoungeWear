const db = require('../db/database');

const Order = {
  getAll: (callback) => {
    db.all('SELECT * FROM orders', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM orders WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { userId, totalAmount } = data;
    const sql = `INSERT INTO orders (user_id, total_amount) VALUES (?, ?)`;
    db.run(sql, [userId, totalAmount], function (err) {
      callback(err, { id: this?.lastID });
    });
  }
};

module.exports = Order;
