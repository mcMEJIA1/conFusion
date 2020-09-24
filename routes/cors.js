var express = require('express');
var cors = require('cors');

const app = express();

/**
 * This contain all the acepted origins
 */
const whitelist = ['http://loaclhost:3000', 'https://loaclhost:3443'];

var corsOptionsDelegate= (req, callback) => {
    var corsOptions;

    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }else {
        corsOptions = { origin: false };
    }

    callback(null, corsOptions)
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);