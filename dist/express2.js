'use strict';

var fs = require('fs');
var path = require('path');
var https = require('https');
var app = require('express')();
var options = {
   key: fs.readFileSync(path.resolve('src/private.key')),
   cert: fs.readFileSync(path.resolve('src/public.crt'))
};

console.log(options.key);
// app.get('/', function (req, res) {
//    res.send('Hello World!');
// });

https.createServer(options, app).listen(3000, function () {
   console.log('Started!');
});