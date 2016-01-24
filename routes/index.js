var express = require('express');
var router = express.Router();
var request = require('request');

var baseUrl = 'https://devapi2-wirkn.rhcloud.com/v2/jobs/';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET ajax request for data */
router.get('/getJobs', function(req, res, next) {
    var lat = req.query.lat;
    var lon = req.query.lon;
    var searchTerm = req.query.q;

    var url = baseUrl + '?lat=' + lat + '&lon=' + lon + '&radius=25000&limit=600&offset=00&expired=false';
    if (searchTerm) {
        url += '&q=' + searchTerm;
    }

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
        console.log("requested");
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
