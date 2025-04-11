const path = require('path');
const Product = require('../models/Products');

exports.getProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) return res.status(500).send("Error retrieving products.");
    res.sendFile(path.join(__dirname, '..', 'views', 'productList.html'));
  });
};

exports.getProduct = (req, res) => {
  Product.getById(req.params.id, (err, product) => {
    if (err) return res.status(500).send("Error retrieving product.");
    if (!product) return res.status(404).send("Product not found");
    res.sendFile(path.join(__dirname, '..', 'views', 'productDetails.html'));
  });
};

exports.getAdminProducts = (req, res) => {
  Product.getAll((err, products) => {
    if (err) return res.status(500).send("Error retrieving admin products.");
    res.sendFile(path.join(__dirname, '..', 'views', 'admin-products.html'));
  });
};

exports.addProduct = (req, res) => {
  Product.create(req.body, (err, result) => {
    if (err) return res.status(500).send("Error adding product.");
    res.redirect('/admin/products');
  });
};
