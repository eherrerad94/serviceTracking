'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _client = require('../../controllers/client');

var _client2 = _interopRequireDefault(_client);

var _auth = require('../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/clients', function (router) {
    router.get('/', _auth.user_credentials, function (req, res) {
        _client2.default.listAll().then(function (clientList) {
            res.status(200).json(clientList);
        }).catch(function (err) {
            console.log('ERROR');
            res.status(200).json({ error: err });
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _client2.default.getOne(req.params.id).then(function (client) {
            res.status(200).json(client);
        }).catch(function (err) {
            console.log('ERROR');
            res.status(200).json({ error: err });
        });
    }).post('/', _auth.user_credentials, function (req, res) {
        _client2.default.addOne(req.body).then(function (client) {

            if (client.hasOwnProperty('error')) res.status(201).json({
                message: client.message,
                error: client.error
            });else {
                res.status(201).json({
                    message: 'Cliente agregado satisfactoriamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _client2.default.updateOne(req.params.id, req.body).then(function (client) {
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
    }).delete('/:id', _auth.admin_credentials, function (req, res) {
        _client2.default.deleteOne(req.params.id).then(function (client) {

            if (client === undefined) return res.status(200).json({ message: "Jefe eliminado correctamente" });else return res.status(200).json({ message: client.message, error: client.error });
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    });
});

module.exports = app;