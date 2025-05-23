const path = require('path');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.getOrders = (req, res) => {
  Order.getAll((err, orders) => {
    if (err) return res.status(500).send("Error retrieving orders.");
    res.sendFile(path.join(__dirname, '..', 'views', 'order-history.html'));
  });
};

exports.getOrder = (req, res) => {
  Order.getById(req.params.id, (err, order) => {
    if (err) return res.status(500).send("Error retrieving order.");
    if (!order) return res.status(404).send("Order not found");
    res.json(order);
  });
};

exports.createOrder = (req, res) => {
  const { userId, totalAmount } = req.body;

  Order.create({ userId, totalAmount }, (err, result) => {
    if (err) return res.status(500).send("Error creating order.");
    console.log('New order created:', result.id);

    Cart.clearForUser(userId, (err) => {
      if (err) {
        console.error("Failed to clear cart:", err.message);
        return res.status(500).send("Order placed, but cart not cleared.");
      }

      res.redirect('/orders/success');
    });
  });
};
