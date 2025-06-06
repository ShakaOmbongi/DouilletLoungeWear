CREATE TABLE IF NOT EXISTS cart (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TRIGGER IF NOT EXISTS update_cart_updated_at
AFTER UPDATE ON cart
FOR EACH ROW
BEGIN
  UPDATE cart SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;
