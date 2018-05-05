var express = require('express');
var router = express.Router();
var netCrawl = require('../services/crawl');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/hostUrl', function (req, res, next) {
    let defaultUrl = "https://www.cnblogs.com/sitehome/p/";
    netCrawl.start(defaultUrl, function(){

    });
    res.send("ok"+"------>"+req.body.hostUrl);
});

module.exports = router;
