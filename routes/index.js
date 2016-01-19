var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var cache = [];

router.get('/getData', function(req, res, next) {
    if (cache.length == 0){
        var lat = req.param('lat');
        var lon = req.param('lon');
    	request('https://devapi2-wirkn.rhcloud.com/v2/jobs/?lat=' + lat + '&lon=' + lon + '&radius=25000&limit=600&offset=00&expired=false', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                cache = JSON.parse(body);
                res.send(body);
            }
            console.log("requested");
        });
    }
    else{
        res.send(JSON.stringify(cache));
    }
});




module.exports = router;
