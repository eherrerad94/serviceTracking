"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _db = require("./config/db");

var _db2 = _interopRequireDefault(_db);

var _ssl = require("./config/ssl");

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _https = require("https");

var _https2 = _interopRequireDefault(_https);

require("express-group-routes");

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _private = require("./api/private");

var _private2 = _interopRequireDefault(_private);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Able app.group('path', ) in routes
var PORT = process.env.PORT || 3000;
var SECUREPORT = process.env.SECUREPORT || 3001;
var app = (0, _express2.default)();
app.use(_bodyParser2.default.json()); // Parse the request body into a more usabel object
app.use(_bodyParser2.default.urlencoded({ extended: true })); //Parse the request body into a www-url-encoded
app.disable("x-powered-by"); //Disable x-powered-by in rest

//Database Connection
_mongoose2.default.Promise = global.Promise;
//here comes the db url //mongoose.connect(config.localhost)
//mongo ds115124.mlab.com:15124/heroku_v0qrdd7j -u <dbuser> -p <dbpassword>
_mongoose2.default.connection.openUri("mongodb://eduardo:eduardo@@ds061355.mlab.com:61355/heroku_s6jxfrqh").then(function () {
    console.log("Connected to db successfully ");
}).catch(function (err) {
    console.log("An error ocurred ", err);
    process.exit(1);
});

app.use('/', _routes2.default);
app.use('/', _private2.default);
app.enable('trust proxy');

var httpServer = _http2.default.createServer(app);
var httpsServer = _https2.default.createServer(_ssl.options, app);

httpServer.listen(PORT, function (err) {
    if (!err) console.log("App running on http://localhost:" + PORT);else console.log("Error running app ", err);
});

httpsServer.listen(SECUREPORT, function (err) {
    if (!err) console.log("App running on https://localhost:" + SECUREPORT);else console.log("Error running app ", err);
});

//  openssl req -newkey rsa:2048 -nodes -keyout private.key -x509 -days 365 -out public.crt