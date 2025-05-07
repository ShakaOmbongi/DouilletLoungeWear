const express = require('express');
const path = require('path');
const db = require('../db/database');
const router = express.Router();
const productController = require('../controllers/productController');
const adminController = require('../controllers/adminController');
const requireLogin = require('../middleware/requireLogin');
const requireAdmin = require('../middleware/requireAdmin');

//  Admin login page (no protection needed)
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'admin-login.html'));
});

//  Handle login POST (no protection needed)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE name = ? AND password = ? AND user_type = "admin"';
  db.get(sql, [username, password], (err, user) => {
    if (err) {
      console.error('Login error:', err.message);
      return res.status(500).send("Login error");
    }

    if (!user) {
      return res.send('<h3>Invalid credentials. <a href="/admin/login">Try again</a>.</h3>');
    }

    // (Optional: set cookie session if needed)
    // res.cookie("sessionToken", "adminToken123");

    res.redirect('/admin/products');
  });
});

//  Protect the following admin routes
router.use(requireLogin, requireAdmin);

//  Serve admin dashboard (optional)
router.get('/dashboard', (req, res) => {
  res.send('Welcome to the admin dashboard');
});

//  Serve product management HTML
router.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'admin-products.html'));
});

//  JSON API: fetch all products
router.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//  Admin: create, upload, edit
router.post('/add-product', productController.addProduct);
router.post('/upload', adminController.uploadProducts);
router.post('/edit-product', adminController.editProduct);
router.get('/api/products/:id', productController.getProduct);

module.exports = router;
