var SuperAgent = require("superagent"),
    Cheerio = require("cheerio"),
    Async = require("async"),
    EventProxy = require("eventproxy");

var NetCrawl;
NetCrawl = function(){
};

NetCrawl.start = function(hostUrl, successCallback) {
    let eventProxy = new EventProxy(),
        arrayUrl = [],
        arrayPageUrl = [],
        headNum = 5,
        pageNum = 2;

    for (let i = 1; i < pageNum; i++) {
        arrayPageUrl.push(hostUrl + i);
    }
    eventProxy.after("BLOGHEADRECIEVED", arrayPageUrl.length * headNum, function (headStrings) {
        successCallback(headStrings);
    });
    eventProxy.subscribe("QUERYSINGLEPAGE", function(articleUrl){
        SuperAgent.get(articleUrl).end(function (err, pres) {
            let $ = Cheerio.load(pres.text);
            let headStr = $("title").eq(0).text();
            eventProxy.emit("BLOGHEADRECIEVED", headStr);
        })
    });
    arrayPageUrl.forEach(function (pageUrl) {
        console.log(pageUrl);
        SuperAgent.get(pageUrl).end(function (err, pres) {
            let $ = Cheerio.load(pres.text);
            let curPageUrls = $(".titlelnk");
            headNum = curPageUrls.length();
            for (let i = 0; i < headNum; i++) {
                let articleUrl = curPageUrls.eq(i).attr("href");
                arrayUrl.push(articleUrl);
                eventProxy.emit("QUERYSINGLEPAGE", articleUrl);
            }
        });
    });
};

module.exports = NetCrawl;
