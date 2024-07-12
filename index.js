const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer(function (req, res) {
    const pathName = url.parse(req.url, true).pathname;
    const fileName = pathName === "/" ? "index.html" : `${pathName.slice(1, pathName.length)}.html`;
    const errorFile = "404.html";

    fs.readFile(fileName, (error, data) => {
        res.writeHead(404, {"Content-Type": "text/html"});
        if(error) {
            fs.readFile(errorFile, (error, data) => {
                return res.end(error ? "404 Page Not Found" : data);
            })
        } else {
            return res.end(data);
        }
    });
}).listen(8080);