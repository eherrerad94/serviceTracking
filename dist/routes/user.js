'use strict';

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/auth', function (router) {
    router.post('/register', _auth.admin_credentials, function (req, res) {
        req.body.cargo = "Programador";
        _user2.default.registro(req.body).then(function (user) {

            res.send(user);
            if (user.hasOwnProperty('error')) res.status(201).json({
                message: user.message,
                error: user.error
            });else {
                res.status(201).json({
                    message: 'Usuario agregado satisfactoriamente'
                });
            }
        }).catch(function (err) {
            res.status(200).json({ error: err });
        });
    }).post('/admin_register', function (req, res) {
        req.body.cargo = "Admin";

        _user2.default.registro(req.body).then(function (user) {
            if (user.hasOwnProperty('error')) res.status(201).json({
                message: user.message,
                error: user.error
            });else {
                res.status(201).json({
                    message: 'Usuario agregado satisfactoriamente'
                });
            }
        }).catch(function (err) {
            res.status(200).json({ error: err });
        });
    }).post('/sign_in', function (req, res) {
        _user2.default.iniciar_sesion(req.body.usuario, req.body.contrasena).then(function (response) {

            if (!response.hasOwnProperty("token")) {
                res.status(201).json({ message: response });
            } else {
                res.status(201).json(response);
            }
        }).catch(function (err) {
            res.status(200).send(err);
        });
    });
});

module.exports = app;