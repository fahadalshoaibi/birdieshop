const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const 

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

// Correct the route definition
app.use('/api/products', require('./src/products/Products.routes'));
app.use('/api/orders', require('./src/orders/order.route'));

async function main() {
  await mongoose.connect('mongodb+srv://fahad20032012:smartbird@products.hvj8k.mongodb.net/shop?retryWrites=true&w=majority');
  console.log("Mongodb connected");
}

main().catch(err => console.log(err));

// Define the root route
app.use('/', (req, res) => {
  res.send("Welcome to the backend");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});