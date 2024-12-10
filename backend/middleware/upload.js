const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage();
// filters files by validating type
const fileFilter = (req, file, cb) => {
    try {
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(ext)) {
            cb(null, true); // accept
        } else {
            cb(new Error(`Invalid file type: ${ext}. Only .jpg, .jpeg, and .png are allowed.`));
        }
    } catch (err) {
        cb(err);
    }
};
// multer initializes with storage and file filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // limit size to 5 MB
    fileFilter: fileFilter,
});
module.exports = upload;