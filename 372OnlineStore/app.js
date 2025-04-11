const path = require('path');
const express = require('express');
const app = express();

// Middleware for parsing JSON & URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets (CSS, JS, images)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Define Routes for Public View Pages
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

// Sign Up page
app.get('/users/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Login page
app.get('/users/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Admin Pages (Not for Public View)
app.get('/admin/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-upload.html'));
});

app.get('/admin/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-products.html'));
});

app.get('/admin/edit-product', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'product-edit.html'));
});

app.get('/admin/edit', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin-edit.html'));
});

//  Import API Routes (For Future Backend Functionality)
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

// Use API Routes
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);


// Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
