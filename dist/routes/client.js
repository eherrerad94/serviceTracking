'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _client = require('../controllers/client');

var _client2 = _interopRequireDefault(_client);

var _auth = require('../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Middlewaring autentication
//import mail from '../config/mail'; // To send emails

var app = _express2.default.Router(); // Get user


app.group('/clients', function (router) {
    router.get('/', _auth.client_credentials, function (req, res) {
        _client2.default.getOne(req.user._id).then(function (client) {
            client.contrasena = undefined;
            // console.log(client.populate('subsidiary'));
            res.status(200).json(client);
        }).catch(function (err) {
            console.log('ERROR');
            res.status(200).json({ error: err });
        });
    }).put('/', _auth.client_credentials, function (req, res) {
        _client2.default.updateOne(req.user._id, req.body).then(function (client) {
            if (client.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: client.message,
                    error: client.error
                });
            } else {
                if (client.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente',
                    cambios: client.nModified
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).post('/sign_in', function (req, res) {
        _client2.default.iniciar_sesion(req.body.usuario, req.body.contrasena).then(function (response) {

            if (!response.hasOwnProperty("token")) {
                res.status(201).json({ message: response });
            } else {
                res.status(201).json(response);
            }
        }).catch(function (err) {
            console.log("Err ", err);
            res.status(200).send(err);
        });
    });
});

module.exports = app;