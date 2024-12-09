const tf = require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const labels = Object.keys(require('./imagenet_class_index.json')).reduce((acc, key) => {           // labels returns key by 2nd element
    acc[key] = require('./imagenet_class_index.json')[key][1]; 
    return acc;
}, {});


let cocoModel;
const loadCocoSSD = async() => {
    if (!cocoModel) {
        console.log("Loading Coco SSD model...");
        cocoModel = await cocoSsd.load();
        console.log('Coco SSD model loaded');
    }
    return cocoModel;
};
const detectObjects = async (imageBuffer) => {
    if (!imageBuffer) {
        throw new Error("No image provided");
    }
    const cocoModel = await loadCocoSSD();
    const imageTensor = tf.node.decodeImage(imageTensor);

    imageTensor.dispose();
    console.log("Object detection predictions: ", predictions);
    return predictions.map(prediction => ({
        bbox: prediction.bbox,
        class: prediction.class,
        score: prediction.score,
    }));
};

let model;
const loadModel = async () => {
    if (!model) {
        model = await tf.loadGraphModel('https://www.kaggle.com/models/google/mobilenet-v2/TfJs/100-224-classification/3', { fromTFHub: true });
        console.log('MobileNet model loaded.');
    }
    return model;
};
const preprocessImage = (imageBuffer) => {
    if (!imageBuffer) {
        throw new Error("Invalid image buffer");
    }
    return tf.tidy(() => {
        const tensor = tf.node.decodeImage(imageBuffer)
            .resizeNearestNeighbor([224, 224]) // Resize for MobileNet
            .toFloat()
            .expandDims() // Add batch dimension
            .div(255); // Normalize
        return tensor;
    });
};
const classifyImage = async (imageBuffer) => {
    if (!imageBuffer) {
        throw new Error('No image buffer provided');
    }

    const model = await loadModel();
    const preprocessedTensor = preprocessImage(imageBuffer);

    const predictionResult = tf.tidy(() => {
        const predictions = model.predict(preprocessedTensor);
        const topPrediction = predictions.argMax(-1).dataSync()[0];
        const adjustedPrediction = topPrediction - 1; // Adjust offset
        const label = labels[adjustedPrediction] || 'Unknown';

        console.log('Predictions:', predictions.arraySync());
        console.log('Top Prediction Index:', topPrediction);
        console.log('Adjusted Index:', adjustedPrediction);
        console.log('Label:', label);

        return { label, index: adjustedPrediction };
    });

    preprocessedTensor.dispose();
    return predictionResult;
};

module.exports = { detectObjects, classifyImage };