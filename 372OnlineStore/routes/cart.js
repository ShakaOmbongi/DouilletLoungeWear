const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// HTML page
router.get('/', cartController.getCart);

// API endpoints
router.get('/api', cartController.getCartItems); // GET cart for a user
router.post('/add', cartController.addToCart); // Add to cart
router.post('/update', cartController.updateCartItem); // Update quantity
router.post('/remove/:cartId', cartController.removeFromCart); // Remove item

module.exports = router;
