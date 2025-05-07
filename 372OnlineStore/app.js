const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Public View Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'productList.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'cart.html'));
});

app.get('/orders', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'order-history.html'));
});

app.get('/products/details', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'productDetails.html'));
});

// User Auth Pages
app.get('/users/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/users/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Route Imports
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin'); // Only handles API (not login UI)
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const middlewareRoutes = require('./routes/middlewareRoute');

// Route Usage
app.use('/shop', shopRoutes);
app.use('/admin', middlewareRoutes); // handles login + protected views
app.use('/admin', adminRoutes);      // handles admin product API
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
