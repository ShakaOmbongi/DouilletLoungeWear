// middleware/requireLogin.js
module.exports = (req, res, next) => {
    const token = req.cookies.sessionToken;
    if (!token) {
      return res.redirect('/users/login?error=loginRequired');
    }
    next();
  };
  