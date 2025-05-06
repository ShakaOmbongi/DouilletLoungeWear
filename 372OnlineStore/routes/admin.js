const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('../controllers/productController');
const adminController = require('../controllers/adminController');
const requireLogin = require('../middleware/requireLogin');
const requireAdmin = require('../middleware/requireAdmin');

router.use(requireLogin, requireAdmin);

router.get('/dashboard', (req, res) => {
  res.send('Welcome to the admin dashboard');
});
// Serve admin login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'admin-login.html'));
});

// Handle admin login POST
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'shaka') {
    return res.redirect('/admin/products');
  }

  res.send('<h3>Invalid credentials. <a href="/admin/login">Try again</a>.</h3>');
});

// Serve the admin product management page
router.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'admin-products.html'));
});

// Fetch all products for admin 
router.get('/api/products', productController.getAdminProducts);

// Handle product creation
router.post('/add-product', productController.addProduct);

// Handle bulk upload of products
router.post('/upload', adminController.uploadProducts);

// Handle product editing
router.post('/edit-product', adminController.editProduct);

router.get('/api/products/:id', productController.getProduct);
router.use(requireLogin, requireAdmin);


module.exports = router;
