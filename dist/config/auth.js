'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authorization = function authorization(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        _jsonwebtoken2.default.verify(req.headers.authorization.split(' ')[1], _db2.default.secretKey, function (err, decode) {
            console.log(decode);
            if (err) req.user = undefined;else req.user = decode.user;
            next(); //middleware
        });
    } else {
        req.user = undefined;
        next();
    }
};

var user_credentials = function user_credentials(req, res, next) {
    console.log("Credentials: ", req.user);

    var user = req.user;
    if (user) {
        if (user.cargo === 'Programador' || user.cargo === 'Admin') next();else res.status(400).json({ message: 'Invalid credentials' });
    } else res.status(400).json({ message: 'Uanuthorized user' });
};

var admin_credentials = function admin_credentials(req, res, next) {
    console.log("Credentials: ", req.user);

    var user = req.user;
    if (user) {
        if (user.cargo === 'Admin') {
            next();
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } else res.status(400).json({ message: 'Unauthorized user' });
};

var programador_tecnico_credentials = function programador_tecnico_credentials(req, res, next) {
    console.log("Credentials: ", req.user);

    var user = req.user;
    if (user) {
        if (user.cargo === 'Programador' || user.cargo === 'Tecnico') next();else res.status(400).json({ message: 'Invalid credentials' });
    } else res.status(400).json({ message: 'Unauthorized user' });
};

var programador_credentials = function programador_credentials(req, res, next) {
    console.log("Credentials: ", req.user);
    var user = req.user;
    if (user) {
        if (user.cargo === 'Programador') next();else res.status(400).json({ message: 'Invalid credentials' });
    } else res.status(400).json({ message: 'Unauthorized user' });
};

var tecnico_credentials = function tecnico_credentials(req, res, next) {
    console.log("Credentials: ", req.user);

    var user = req.user;
    if (user) {
        if (user.cargo === 'Tecnico') next();else res.status(400).json({ message: 'Invalid credentials' });
    } else res.status(400).json({ message: 'Unauthorized user' });
};

var client_credentials = function client_credentials(req, res, next) {

    var client = req.user;
    if (req.user) next();else res.status(400).json({ message: 'Unauthorized user' });
};

module.exports = {
    authorization: authorization,
    user_credentials: user_credentials,
    admin_credentials: admin_credentials,
    programador_credentials: programador_credentials,
    tecnico_credentials: tecnico_credentials,
    client_credentials: client_credentials,
    programador_tecnico_credentials: programador_tecnico_credentials
};