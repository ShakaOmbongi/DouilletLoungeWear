const Product = require('../models/Products');

exports.uploadProducts = (req, res) => {
  console.log("Uploading products bulk file");
  res.redirect('/admin/products');
};

exports.editProduct = (req, res) => {
  const productData = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    category: req.body.category
  };

  Product.update(productData, (err, result) => {
    if (err) return res.status(500).send("Error updating product.");
    res.redirect('/admin/products');
  });
};
