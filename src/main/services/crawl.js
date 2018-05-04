var Http = require("http"),
    Url = require("url"),
    SuperAgent = require("superagent"),
    Cheerio = require("cheerio"),
    Async = require("async"),
    EventProxy = require("eventproxy");

var eventProxy = new EventProxy(),
    arrayUrl = [],
    arrayPageUrl = [],
    pageNum = 10;

for (let i = 1; i < pageNum; i++) {
    arrayPageUrl.push('https://www.cnblogs.com/sitehome/p/' + i);
}

function start() {
    function onRequest(req, res) {
        eventProxy.after("BlogArticleHtml", arrayPageUrl.length * 20, function (articleUrls) {
            res.write("<br/>");
            res.write("articleUrls.lenth is" + articleUrls.length + "<br/>");
            for (let i = 0; i < articleUrls.length; i++) {
                res.write("articleUrl is" + articleUrls[i] + "<br/>")
            }
        })
        arrayPageUrl.forEach(function (pageUrl) {
            console.log(pageUrl);
            SuperAgent.get(pageUrl).end(function (err, pres) {
                let $ = Cheerio.load(pres.text);
                let curPageUrls = $(".titlelnk");
                for (let i = 0; i < curPageUrls.length; i++) {
                    let articleUrl = curPageUrls.eq(i).attr("href");
                    arrayUrl.push(articleUrl);
                    eventProxy.emit("BlogArticleHtml", articleUrl);
                }
            });
        });
    }

    Http.createServer(onRequest).listen(3000);
}


exports.start = start;
