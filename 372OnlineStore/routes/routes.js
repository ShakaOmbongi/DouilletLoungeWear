const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', (req, res) => res.sendFile(__dirname + '/../views/index.html'));
router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProduct);

module.exports = router;
