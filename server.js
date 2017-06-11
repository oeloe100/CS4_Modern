var stylus = require('stylus');
var nib = require('nib');
var pug = require('pug');

var path = require('path');
var join = path.join;
var fs = require('fs');

var express = require('express');
var router = express.Router();
var app = express();

var http = require('http');
//var hostname = 'localhost';
//var port = 3000;
var port = process.env.PORT || 8080;

var base_html_dir = '/public/static/html/';
var dirHTML = '/public/static/html/dir-html/';

//===================================================================================================\\

const compileMain = pug.compileFile(__dirname + base_html_dir + 'index.pug');

app.get('/', function(req, res, next){  
    res.send(compileMain({
        home  : 'Home',
        about  : 'About',
        blog  : 'Blog',
    }, function(err){
        HandleERR(err, next);
    }));
});

//===================================================================================================\\

app.get('/dir-banner', function(req, res, next){
    var url = dirHTML;
    var fileName = 'banner.pug';
    SendFile(res, url, next, fileName);
});

function SendFile(res, url, next, fileName){
    var options = {
        root : __dirname + url,
        dotfiles : 'ignore'
    };
    
    res.sendFile(fileName, options, function(err){
        HandleERR(err, next);
    });
}

function HandleERR(err, next){
    if (err){
        next(err);
    }else{
        return;
    }
}

//===================================================================================================\\

app.use(stylus.middleware({
    src  : __dirname + '/recources/',
    dest : __dirname + '/public/',
    debug : true,
    force : true,
    use : [nib()],
    import : ['nib']
}));

app.use('/static', express.static(__dirname + '/public/static'));

//===================================================================================================\\

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end();
});

app.listen(port);

/*app.listen(port, hostname, () =>{
    console.log(`Server running at http://${hostname}:${port}/`);
});*/

//===================================================================================================\\