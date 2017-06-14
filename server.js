
const express = require('express');
const router = express.Router();
const app = express();

//const mongoose = require('mongoose'), Admin = mongoose.mongo.Admin;

const stylus = require('stylus');
const nib = require('nib');
const pug = require('pug');

const path = require('path');
const join = path.join;

const fs = require('fs');
const http = require('http');
const nconf = require('nconf');

var lodash = require('lodash');
var array = require('lodash/array');

var port = process.env.PORT || nconf.get('conn:port');

var base_html_dir = '/public/static/html/';
var dirHTML = '/public/static/html/dir-html/';

//===================================================================================================\\

var pc = {
    pc_a : 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula egetdolor. Aenean massa.',
    
    pc_b : ' Cum sociis natoque penatibus et magnis dis parturient montes,nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,sem. Nulla consequat massa quis enim.'
};

/*
var atlas_connect = 'localhost/CS4MODERN';
var connection = mongoose.createConnection(atlas_connect);

connection.once('open', function(){
    console.log('Succesfully Connected'); 
});

connection.on('error', function(error){
    throw error;
});

connection.on('open', function(){
    new Admin(connection.db).listDatabases(function (err, result){
        var allDatabases = result.databases;
        console.log(allDatabases);
        connection.db.close();
    });
    
    connection.db.collection('pc').insertOne(pc, function(err, res){
        if (err)
            throw err;
        
        connection.db.close();
    });
});*/

//===================================================================================================\\

nconf.argv().env();
nconf.file({
    file : 'config.json',
    dir : '/config',
    search : true
});

nconf.overrides({
    'conn' : {
        'port_local' : '3000' 
    }
});

nconf.defaults({
    'conn' : {
        'host' : 'localhost',
        'port_local' : '3100',
        'port' : '8080'
    },
    'social' : {
        'linkedin_url' : 'https://nl.linkedin.com/in/anton-raschenko-b268a07a'
    }
});

//===================================================================================================\\

const compileMain = pug.compileFile(__dirname + base_html_dir + 'index.pug');

app.get('/', function(req, res, next){    
    res.send(compileMain({
        home  : 'Home',
        about  : 'About',
        blog  : 'Blog',
        linkedin : nconf.get('social:linkedin_url')
    }, function(err){
        HandleERR(err, res, next);
    }));
});

//===================================================================================================\\

var year = new Date();

app.get('/date', function(req, res, next){
    res.send((year).toString());
});

//===================================================================================================\\

var singlePC = lodash.partition([pc.pc_a, pc.pc_b], 1);

app.get('/pc', function(req, res, next){
     res.send((singlePC).toString());
});

//===================================================================================================\\

app.get('/dir-banner', function(req, res, next){
    var url = dirHTML;
    var fileName = 'banner.pug';
    SendFile(res, url, next, fileName);
});

//===================================================================================================\\

function SendFile(res, url, next, fileName){
    var options = {
        root : __dirname + url,
        dotfiles : 'ignore'
    };
    
    res.sendFile(fileName, options, function(err){
        HandleERR(err, res, next);
    });
}

function HandleERR(err, res, next){
    if (err){
        throw err;
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
app.use('/config', express.static(__dirname + '/recources/config'));

//===================================================================================================\\

app.listen(port);

/*app.listen(nconf.get('conn:port_local'), nconf.get('conn:conn:host'), () =>{
    console.log(`Server running at http://${nconf.get('conn:host')}:${nconf.get('conn:port_local')}/`);
});*/

//===================================================================================================\\