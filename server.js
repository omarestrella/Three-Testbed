var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    express = require('./lib/express');

var app = express.createServer();

http.createServer(function (request, response) {
    var filePath = '.' + request.url;
    
    if(filePath === './') {
        filePath = 'index.html';
    }
    
    var ext = path.extname(filePath);
    var contentType = 'text/html';
    
    switch(ext) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }
    
    path.exists(filePath, function(exists) {
        if(exists) {
            fs.readFile(filePath, function(error, content) {
                if(error) {
                    response.writeHead(500);
                    response.end();
                } else {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(content, 'utf-8');
                }
            });
        } else {
            response.writeHead(404);
            response.end();
        }
    });
}).listen(80, "127.0.0.1");

console.log("Listening on port 80");
