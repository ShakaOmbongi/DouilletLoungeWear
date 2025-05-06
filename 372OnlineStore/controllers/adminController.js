const path = require('path');
const fs = require('fs');
const db = require('../db/database');
const Product = require('../models/Products');

// Bulk upload JSON file
exports.uploadProducts = (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("No file uploaded.");

  const filePath = path.join(__dirname, '..', file.path);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Failed to read file:", err.message);
      return res.status(500).send("Error reading uploaded file.");
    }

    let products;
    try {
      products = JSON.parse(data).products;
    } catch (parseErr) {
      return res.status(400).send("Invalid JSON format.");
    }

    const insert = db.prepare(`INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)`);
    db.serialize(() => {
      db.run("BEGIN");
      products.forEach(p => insert.run(p.name, p.description, p.price, p.image));
      db.run("COMMIT");
    });

    res.redirect('/admin/products');
  });
};

// Edit product
exports.editProduct = (req, res) => {
  const { id, name, description, category, price, image } = req.body;

  const sql = `
    UPDATE products
    SET name = ?, description = ?, price = ?, image = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(sql, [name, description, category, price, image, id], function (err) {
    if (err) {
      console.error("Update error:", err.message);
      return res.status(500).send("Failed to update product.");
    }

    res.redirect('/admin/products');
  });
};

// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM products WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Delete error:", err.message);
      return res.status(500).send("Failed to delete product.");
    }

    res.redirect('/admin/products');
  });
};
