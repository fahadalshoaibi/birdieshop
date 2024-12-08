const express = require('express');
const router = express.Router();
const { createOrder } = require('./order.controller'); // Use require for consistency

const { model } = require('mongoose');

router.post('/', createOrder);



module.exports = router;