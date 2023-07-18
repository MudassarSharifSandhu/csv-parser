const express = require('express');
const path = require('path');
const mongoRoute = express();
const multer = require('multer');
const shortId = require('shortid');
const bulkCSVDataToMongo = require('../controllers/parser.controller');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortId.generate() + "-" + file.originalname);
    },
});
const upload = multer({ storage });
mongoRoute.post('/', upload.single('file'), bulkCSVDataToMongo.insertCSVDataToMongo);
module.exports = mongoRoute;
