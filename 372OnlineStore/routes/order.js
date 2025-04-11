const express = require('express');
const path = require('path');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Serve the order history page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'order-history.html'));
});

// Fetch all orders (JSON response)
router.get('/api', orderController.getOrders);

// Fetch a single order by ID (JSON response)
router.get('/api/:id', orderController.getOrder);

// Create a new order
router.post('/create', orderController.createOrder);

module.exports = router;
