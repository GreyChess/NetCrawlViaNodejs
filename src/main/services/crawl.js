let SuperAgent = require("superagent"),
    Cheerio = require("cheerio"),
    Async = require("async"),
    EventProxy = require("eventproxy");

let NetCrawl;
NetCrawl = function(){
};

NetCrawl.start = function(relayUrl, successCallback) {
    let eventProxy = new EventProxy(),
        arrayUrl = [],
        headNum,
        pageNum = 5,
        arrayPageUrl = arrayRelayUrl(relayUrl, pageNum);

    eventProxy.subscribe("QUERYSINGLEPAGE", function(articleUrl){
        // SuperAgent.get(articleUrl).end(function (err, pres) {
        //     let $ = Cheerio.load(pres.text);
        //     let headStr = $("title").eq(0).text();
            eventProxy.emit("BLOGHEADRECIEVED", articleUrl);
        // })

    });
    arrayPageUrl.forEach(function (pageUrl) {
        console.log(pageUrl);
        SuperAgent.get(pageUrl).end(function (err, pres) {
            // let $ = Cheerio.load(pres.text);
            // let arrayTitle = $("h4");
            // headNum = arrayTitle.length;

            headNum = pres.body.length;
            eventProxy.after("BLOGHEADRECIEVED", arrayPageUrl.length * headNum, function (headStrings) {
                successCallback(headStrings);
            });
            // for (let i = 0; i < headNum; i++) {
            //     let articleUrl = arrayTitle.eq(i).text();
            //     arrayUrl.push(articleUrl);
            //     eventProxy.emit("QUERYSINGLEPAGE", articleUrl);
            // }
            let arrayNewsBody = pres.body;
            arrayNewsBody.forEach(function(newsBody){
                eventProxy.emit("QUERYSINGLEPAGE", newsBody.title);
            })
        });
    });

    function arrayRelayUrl(relayUrlBase, pageNum){
        let arrayResult = [];
        for(let i = 0; i<pageNum; i++){
            arrayResult.push(relayUrlBase+"&page="+(i+1));
        }
        return arrayResult;
    }
};

module.exports = NetCrawl;
