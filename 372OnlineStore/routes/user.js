const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


// Show signup and login pages
router.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/../views/signup.html');
});

router.get('/login', (req, res) => {
  res.sendFile(__dirname + '/../views/login.html');
});

// Handle form submissions
router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);

router.post('/logout', (req, res) => {
  res.clearCookie('sessionToken'); // remove session cookie
  res.redirect('/users/login');    // redirect to login
});


module.exports = router;
