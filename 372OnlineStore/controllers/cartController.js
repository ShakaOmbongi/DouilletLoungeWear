const path = require('path');
const Cart = require('../models/Cart');

// Show cart HTML page
exports.getCart = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'cart.html'));
};

// API: Get all cart items for a user
exports.getCartItems = (req, res) => {
  const userId = req.query.userId;

  if (!userId) return res.status(400).send('Missing userId');

  Cart.getAllForUser(userId, (err, items) => {
    if (err) {
      console.error('Error fetching cart:', err.message);
      return res.status(500).send('Error fetching cart');
    }
    res.json(items);
  });
};

// ✅ Add product to cart (with hardcoded userId for now)
exports.addToCart = (req, res) => {
  const userId = 1; // <-- TEMP FIX while login isn't wired up to frontend
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).send('Missing productId or quantity');
  }

  Cart.addItem(userId, productId, quantity, (err, result) => {
    if (err) {
      console.error('Error adding to cart:', err.message);
      return res.status(500).send('Failed to add to cart');
    }
    res.send(`Product added to cart with ID ${result.id}`);
  });
};

// Update quantity of a cart item
exports.updateCartItem = (req, res) => {
  const { cartId, quantity } = req.body;

  if (!cartId || !quantity) return res.status(400).send('Missing cartId or quantity');

  Cart.updateItem(cartId, quantity, (err) => {
    if (err) {
      console.error('Error updating cart item:', err.message);
      return res.status(500).send('Failed to update cart item');
    }
    res.send('Cart item updated');
  });
};

// Remove a cart item
exports.removeFromCart = (req, res) => {
  const { cartId } = req.params;

  if (!cartId) return res.status(400).send('Missing cartId');

  Cart.removeItem(cartId, (err) => {
    if (err) {
      console.error('Error removing from cart:', err.message);
      return res.status(500).send('Failed to remove item');
    }
    res.send('Item removed from cart');
  });
};
