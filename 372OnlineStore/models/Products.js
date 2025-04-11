const db = require('../db/database');

const Product = {
  getAll: (callback) => {
    db.all('SELECT * FROM products', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM products WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { name, description, price, imageUrl, category } = data;
    const sql = 'INSERT INTO products (name, description, price, image, category) VALUES (?, ?, ?, ?, ?)';
    const params = [name, description, price, imageUrl, category];
    db.run(sql, params, function (err) {
      callback(err, { id: this?.lastID });
    });
  },

  update: (data, callback) => {
    const sql = `UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ? WHERE id = ?`;
    const params = [
      data.name,
      data.description,
      data.price,
      data.imageUrl,
      data.category,
      data.id
    ];
    db.run(sql, params, function (err) {
      callback(err, { changes: this?.changes });
    });
  }
};

module.exports = Product;
