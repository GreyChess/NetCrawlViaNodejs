var express = require('express');
var router = express.Router();
var NetCrawl = require('../services/crawl');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/hostUrl', function (req, res, next) {
    //req.body
    let relayUrl = "http://v2.sohu.com/public-api/feed?scene=CHANNEL&sceneId=15&size=20";
    NetCrawl.start(relayUrl, function(headers){
        let arrayResult = [];
        headers.forEach(function(url){
            arrayResult.push(url);
        });
        res.send(JSON.stringify(arrayResult));
    });
});

module.exports = router;
