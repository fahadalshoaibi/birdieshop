const express = require('express');
const router = express.Router();
const { createOrder,getOrderByEmail } = require('./order.controller'); // Use require for consistency

const { model } = require('mongoose');

router.post('/', createOrder);

router.get("/email/:email", getOrderByEmail); 



module.exports = router;