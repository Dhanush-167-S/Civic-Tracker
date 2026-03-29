const multer = require("multer");

const storage = multer.memoryStorage();

const Upload = multer({ storage });

module.exports = Upload;
