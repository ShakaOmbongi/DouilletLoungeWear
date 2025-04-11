const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('../controllers/productController');
const adminController = require('../controllers/adminController');

// Serve the admin product management page
router.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'admin-products.html'));
});

// Fetch all products for admin (JSON response)
router.get('/api/products', productController.getAdminProducts);

// Handle product creation
router.post('/add-product', productController.addProduct);

// Handle bulk upload of products
router.post('/upload', adminController.uploadProducts);

// Handle product editing
router.post('/edit-product', adminController.editProduct);

module.exports = router;
