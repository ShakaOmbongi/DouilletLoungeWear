// middleware/requireAdmin.js
const db = require('../db/database');

module.exports = (req, res, next) => {
  const sessionToken = req.cookies?.sessionToken;

  if (!sessionToken) {
    return res.redirect('/users/login?error=loginRequired');
  }

  // Verify sessionToken and check if the user is an admin
  const sql = `
    SELECT u.user_type FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.session_token = ?
  `;

  db.get(sql, [sessionToken], (err, row) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).send('Internal Server Error');
    }

    if (!row || row.user_type !== 'admin') {
      return res.status(403).send('Access denied: Admins only');
    }

    next();
  });
};
