var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config/config.js');

var baseUrl = config.wirkn_api + 'jobs/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { analytics_api_key: config.analytics_api_key });
});

/* GET ajax request for data */
router.get('/getJobs', function(req, res, next) {
    var lat = req.query.lat;
    var lon = req.query.lon;
    var radius = '25000';
    var searchTerm = req.query.q;
    var limit = req.query.limit || '10';
    var offset = req.query.offset || '00';
    var expired = 'false';

    var urlParts = [
        baseUrl,
        '?lat=' + lat,
        '&lon=' + lon,
        '&radius=' + radius,
        '&limit=' + limit,
        '&expired=' + expired,
        '&offset=' + offset
    ];

    if (searchTerm) {
        urlParts.push('&q=' + searchTerm);
    }
    
    var url = urlParts.join('');
    console.log(url);

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    });
});

router.get('/getJobs/:id', function(req, res, next) {
    request(baseUrl + req.params.id, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
        console.log("requested");
    });
});

module.exports = router;
