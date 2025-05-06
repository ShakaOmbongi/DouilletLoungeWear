const db = require('../db/database');
const crypto = require('crypto');

// CREATE A NEW USER
exports.createUser = (req, res) => {
  const { name, email, password, user_type } = req.body;

  const sql = `INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, email, password, user_type], function (err) {
    if (err) {
      console.error('Error creating user:', err.message);
      return res.redirect('/users/signup?signup=fail');
    }
    return res.redirect('/users/login?signup=success');
  });
};
exports.getSessionInfo = (req, res) => {
  const sessionToken = req.cookies.sessionToken;
  if (!sessionToken) {
    return res.status(401).json({ message: "Not logged in" });
  }

};
// LOGIN AND CREATE SESSION
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const findUser = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(findUser, [email, password], (err, user) => {
    if (err || !user) {
      console.error('Login failed:', err?.message || 'Invalid credentials');
      return res.redirect('/users/login?error=invalid');
    }

    const sessionToken = crypto.randomBytes(16).toString('hex');

    const insertSession = `INSERT INTO sessions (user_id, session_token) VALUES (?, ?)`;
    db.run(insertSession, [user.id, sessionToken], function (err) {
      if (err) {
        console.error('Session creation failed:', err.message);
        return res.redirect('/users/login?error=invalid');
      }

      res.setHeader('Set-Cookie', `session_token=${sessionToken}; HttpOnly; Path=/`);
      res.redirect('/products');
    });
  });
};
