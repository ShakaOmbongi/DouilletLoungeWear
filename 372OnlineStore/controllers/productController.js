const path = require('path');
const Product = require('../models/Products');
const db = require('../db/database');

// API: Get all products (JSON response)
exports.getProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) return res.status(500).json({ error: "Error retrieving products." });
    res.json(products);
  });
};

// API: Get a single product by ID (JSON response)
exports.getProduct = (req, res) => {
  Product.getById(req.params.id, (err, product) => {
    if (err) return res.status(500).json({ error: "Error retrieving product." });
    if (!product) return res.status(404).json({ error: "Product not found." });
    res.json(product);
  });
};

// Admin: Serve admin product management page
exports.getAdminProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) return res.status(500).send("Error retrieving admin products.");
    res.sendFile(path.join(__dirname, '..', 'views', 'admin-products.html'));
  });
};

// Admin: Add a new product
exports.addProduct = (req, res) => {
  Product.create(req.body, (err, result) => {
    if (err) return res.status(500).send("Error adding product.");
    res.redirect('/admin/products');
  });
};

// API: Search products
exports.searchProducts = (req, res) => {
  const { search, category } = req.query;
  let sql = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (search) {
    sql += ' AND name LIKE ?';
    params.push(`%${search}%`);
  }
  if (category) {
    sql += ' AND category = ?';
    params.push(category);
  }

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: "Search failed." });
    res.json(rows);
  });
};
