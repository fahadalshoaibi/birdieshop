require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5173;
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { detectObjects } = require('./services/service.tensorflow');
const imageRoutes = require('./routes/imageRoutes');          // For classification
const detectRoutes = require('./routes/detectRoutes');        // For object detect


app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

app.post('/api/detect', upload.single('image'), async (req, res) => {
  try {
      if (!req.file || !req.file.buffer) {
          return res.status(400).send('No image file uploaded');
      }

      const predictions = await detectObjects(req.file.buffer);

      res.json({ message: 'Object detection successful', predictions });
  } catch (error) {
      console.error('Error in detection route:', error);
      res.status(500).send('Failed to process the image');
  }
});

app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
      }

      const imageBuffer = req.file.buffer;

      // Call the AI function to analyze the image
      const labels = await analyzeImage(imageBuffer);

      res.status(200).json({ labels });
  } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
// Correct the route definition
app.use('/api/products', require('./src/products/Products.routes'));

async function main() {
  await mongoose.connect('mongodb+srv://fahad20032012:smartbird@products.hvj8k.mongodb.net/shop?retryWrites=true&w=majority');
  console.log("Mongodb connected");
}

main().catch(err => console.log(err));

// Define the root route
app.use('/api/images', imageRoutes);  // Routes for classification
app.use('/api', detectRoutes);       // Routes for detection
app.use('/', (req, res) => {
  res.send("Welcome to the backend");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});