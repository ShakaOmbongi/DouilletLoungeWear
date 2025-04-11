const db = require('../db/database');

const Cart = {
  getAllForUser: (userId, callback) => {
    db.all('SELECT * FROM cart WHERE user_id = ?', [userId], callback);
  },

  addItem: (userId, productId, quantity, callback) => {
    const sql = `INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`;
    db.run(sql, [userId, productId, quantity], function (err) {
      callback(err, { id: this?.lastID });
    });
  },

  updateItem: (cartId, quantity, callback) => {
    db.run('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, cartId], callback);
  },

  removeItem: (cartId, callback) => {
    db.run('DELETE FROM cart WHERE id = ?', [cartId], callback);
  }
};

module.exports = Cart;
