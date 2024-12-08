const Order = require('./order.model');

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};


const getOrderByEmail = async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting order by email", error);
    res.status(500).json({ message: "Failed to get order by email" });
  }
}
module.exports = { createOrder, getOrderByEmail };