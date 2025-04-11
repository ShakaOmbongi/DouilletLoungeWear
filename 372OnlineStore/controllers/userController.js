const db = require('../db/database');
const crypto = require('crypto');

// CREATE A NEW USER
exports.createUser = (req, res) => {
  const { name, email, password, user_type } = req.body;

  const sql = `INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, email, password, user_type], function (err) {
    if (err) {
      console.error('Error creating user:', err.message);
      return res.status(500).send("Error creating user");
    }
    res.send(` Account created for ${name}. Your user ID is: ${this.lastID}`);
  });
};

// LOGIN AND CREATE SESSION
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const findUser = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(findUser, [email, password], (err, user) => {
    if (err) {
      console.error('Login error:', err.message);
      return res.status(500).send("Login error");
    }
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Generate session token
    const sessionToken = crypto.randomBytes(16).toString('hex');

    // Insert session into DB
    const insertSession = `INSERT INTO sessions (user_id, session_token) VALUES (?, ?)`;
    db.run(insertSession, [user.id, sessionToken], function (err) {
      if (err) {
        console.error('Session creation failed:', err.message);
        return res.status(500).send("Failed to create session");
      }

      res.redirect('/products');
    });
  });
};
