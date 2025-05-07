# Douillet Lounge Wear – Full Stack Node.js App

Douillet Lounge Wear is a full-stack Node.js application using SQLite. It simulates an e-commerce experience where users can browse lounge wear, add items to a cart, and place orders. Admins can manage the product catalog and upload bulk data.

---

## Project Features

- View all products and product details  
- Filter/search products by category  
- Add, update, and remove items from cart  
- Checkout functionality (order creation)  
- Admin tools for:  
  - Adding and editing products  
  - Bulk uploading product data  

---

## Project Structure

- `views/` — HTML frontend pages  
- `assets/` — CSS, images, and JS files  
- `routes/` — API and page route definitions  
- `controllers/` — Logic handling requests/responses  
- `models/` — Database interaction logic  
- `db/` — SQLite database file and related logic  
- `config/` — App config, including DB path from `.env`  

---

## Demo Video

[![Watch the demo](https://img.youtube.com/vi/c1NjClBm6YU/0.jpg)](https://youtu.be/c1NjClBm6YU)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/douillet-lounge-wear.git
cd douillet-lounge-wear

install
npm install express sqlite3 multer dotenv
npm install --save-dev nodemon
npm install cookie-parser


.env
PORT=3000
SECRET_KEY=your-secret-key
DB_PATH=./db/storecopy.db

how to start? 
node app.js

visit
http://localhost:3000
