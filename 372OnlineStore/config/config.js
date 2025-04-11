require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY,
  db: {
    path: process.env.DB_PATH || './db/store.db' // file-based for SQLite
  },
};
