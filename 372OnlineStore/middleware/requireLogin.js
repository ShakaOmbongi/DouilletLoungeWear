// middleware/requireLogin.js
module.exports = (req, res, next) => {
    const sessionToken = req.cookies.sessionToken;
  
    if (!sessionToken) {
      return res.redirect('/users/login?error=loginRequired');
    }
  
    next();
  };
  