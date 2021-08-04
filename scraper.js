"use strict";
exports.__esModule = true;
exports.getHtml = void 0;
var https = require("https");
var cheerio = require("cheerio");
function getHtml(url) {
    return new Promise(function (resolve, reject) {
        https.get(url, function (response) {
            var HTML = "";
            response.on("data", function (chunk) {
                HTML += chunk;
            });
            response.on("end", function () {
                resolve(HTML);
            });
        })
            .on("error", function (error) {
            reject(error);
        });
    });
}
exports.getHtml = getHtml;
console.log(prompt("Wow"));
function crawlSite(HTML) {
    var links = [];
    var loadedData = cheerio.load(HTML);
    loadedData("loc").each(function (iteration, element) {
        links.push(loadedData(element).text());
    });
    return links;
}
