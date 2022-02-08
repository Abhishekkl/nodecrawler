var Crawler = require("crawler");

const argv = process.argv;
const url = argv[2].split('=')[1]
const words = (argv[3].toLowerCase().split('=')[1]).split(',')

const findWordCount = (body) => {
    let searchedobj = {}
    let val;
    body.map((e)=>{
        val = e.toLowerCase()
        if(words.includes(val)){
            searchedobj[val] = searchedobj[val] ? ++searchedobj[val] : 1
        }
    })
    return searchedobj;
}

const crawler = new Crawler({
    maxConnections : 10,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            const $ = res.$;
            let body = $("body").text().split(/\s+/);
            console.log(findWordCount(body))
        }
        done();
    }
});

crawler.queue(url);