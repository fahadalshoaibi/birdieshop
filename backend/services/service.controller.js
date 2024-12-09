const { classifyImage } = require('../services/service.tensorflow');

const recognizeProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const prediction = await classifyImage(req.file.buffer);

        // Use regex for a partial match or a library like Fuse.js for fuzzy matching
        const product = await Product.findOne({ name: { $regex: new RegExp(prediction.label, 'i') } });

        if (!product) {
            return res.status(404).json({ message: 'No matching product found' });
        }

        res.status(200).json({ prediction, product });
    } catch (error) {
        res.status(500).json({ message: `Error recognizing product: ${error.message}` });
    }
};

module.exports = {
    recognizeProduct,
};
