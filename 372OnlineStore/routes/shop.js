const express = require('express');
const path = require('path');
const router = express.Router();
const productController = require('../controllers/productController');

// Serve the homepage
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// Serve the product listing page
router.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'productList.html'));
});

// Fetch all products
router.get('/api/products', productController.getProducts);

// Fetch a single product by ID 
router.get('/api/product/:id', productController.getProduct);

// Serve product details page
router.get('/product/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'productDetails.html'));
});

module.exports = router;
