const express = require('express');
const path = require('path');
const router = express.Router();
const orderController = require('../controllers/orderController');
const requireLogin = require('../middleware/requireLogin');

// Serve the order history page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'order-history.html'));
});

// Fetch all orders 
router.get('/api', orderController.getOrders);


// Fetch a single order by ID 
router.get('/api/:id', orderController.getOrder);

// Create a new order
router.post('/create', orderController.createOrder);
// Serve success page
router.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'ordersuccess.html'));
});


module.exports = router;
