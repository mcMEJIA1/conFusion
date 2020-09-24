var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../authenticate');
var multer = require('multer');
var cors = require('./cors');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/images')
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jepg|png|gif)$/)) {
        return cb(new Error('Tou can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

const uploadRouter = express.Router();

uploadRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200)
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','appliction/json');
    res.json(req.file);
});

module.exports = uploadRouter;