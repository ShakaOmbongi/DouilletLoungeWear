const express = require('express');
const path = require('path');
const router = express.Router();

const productController = require('../controllers/productController');
const adminController = require('../controllers/adminController');
const requireLogin = require('../middleware/requireLogin');
const requireAdmin = require('../middleware/requireAdmin');

// Public route: Admin login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'admin-login.html'));
});

// Handle login POST (hardcoded credentials)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'shaka') {
    res.cookie('sessionToken', 'admin-session', { httpOnly: true }); // Fake token
    return res.redirect('/admin/products');
  }

  res.send('<h3>Invalid credentials. <a href="/admin/login">Try again</a>.</h3>');
});


// Protected admin dashboard and tools
router.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'admin-products.html'));
});

router.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'admin-upload.html'));
});

router.get('/edit', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'admin-edit.html'));
});

router.get('/edit-product', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'product-edit.html'));
});

// Optional: protected API routes (if any)
router.get('/api/products', productController.getAdminProducts);
router.get('/api/products/:id', productController.getProduct);
router.post('/add-product', productController.addProduct);
router.post('/upload', adminController.uploadProducts);
router.post('/edit-product', adminController.editProduct);

module.exports = router;
