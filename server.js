var stylus = require('stylus');
var nib = require('nib');
var pug = require('pug');

var path = require('path');
var join = path.join;

var express = require('express');
var router = express.Router();
var app = express();

var http = require('http');
//var hostname = 'localhost';
//var port = 3000;
var port = process.env.PORT || 8080;

//====================================================================\\
const compileMain = pug.compileFile(__dirname + '/public/static/html/index.pug');

app.get('/', function(req, res){  
    res.send(compileMain({
        home  : 'Home',
        about  : 'About',
        blog  : 'Blog',
    }))
});
//===================================================================\\



//===================================================================\\
app.use(stylus.middleware({
    src  : __dirname + '/recources/',
    dest : __dirname + '/public/',
    debug : true,
    force : true,
    use : [nib()],
    import : ['nib']
}));

app.use('/static', express.static(__dirname + '/public/static'));
//====================================================================\\
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('');
});

//app.listen(port, hostname, () =>{
    //console.log(`Server running at http://${hostname}:${port}/`);
//});
//====================================================================\\