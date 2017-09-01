'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _service = require('../controllers/service');

var _service2 = _interopRequireDefault(_service);

var _part = require('../controllers/part');

var _part2 = _interopRequireDefault(_part);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _part3 = require('../models/part');

var _part4 = _interopRequireDefault(_part3);

var _auth = require('../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Middlewaring autentication

// Get user
var app = _express2.default.Router(); // Get user


app.group('/services', function (router) {
    router.get('/', _auth.client_credentials, function (req, res) {

        _service2.default.listAll().then(function (serviceList) {
            res.status(200).json({
                serviceList: serviceList,
                length: serviceList.length
            });
        }).catch(function (err) {
            console.log('ERROR');
            res.status(200).json({ error: err });
        });
    }).post('/', _auth.client_credentials, function (req, res) {
        _service2.default.addOne(req.body).then(function (service) {

            if (service.hasOwnProperty('error')) res.status(201).json({
                message: service.message,
                error: service.error
            });else {
                res.status(201).json({
                    message: 'Servicio agregada satisfactoriamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).get('/:id', _auth.client_credentials, function (req, res) {
        _service2.default.getOne(req.params.id).then(function (service) {
            res.status(200).json({ Servicio: service });
        });
    }).put('/:id', function (req, res) {
        _service2.default.updateOne(req.params.id, req.body).then(function (service) {
            if (service.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: service.message,
                    error: service.error
                });
            } else {
                if (service.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente',
                    cambios: service.nModified
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).delete('/:id', function (req, res) {
        _service2.default.deleteOne(req.params.id).then(function (service) {

            if (service === undefined) return res.status(200).json({ message: "Servicio eliminado correctamente" });else return res.status(200).json({ message: service.message, error: service.error });
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).get('/:id/parts/', function (req, res) {
        _service2.default.listAllParts(req.params.id).then(function (partes) {

            if (partes.length == 0) res.status(200).json({
                "partes": 'Esta servicio no cuenta con partes',
                "length": partes.length
            });else {
                partes.map(function (parte) {
                    parte.service = undefined;
                });

                res.status(200).json({
                    "partes": partes,
                    "length": partes.length
                });
            }
        }).catch(function (err) {
            return res.sendStatus(404); //.json({ err: err });
        });
    }).get('/:id/parts/:partID', function (req, res) {
        _service2.default.getOnePart(req.params.id, req.params.partID).then(function (part) {
            if (part == undefined) res.status(200).json({ message: "No se encontro ninguna parte con el id proporcionado" });else res.status(200).json({ message: "Parte encontrada correctamente", part: part });
        }).catch(function (err) {
            return res.sendStatus(404); //.json({ err: err });
        });
    }).put('/:id/parts/:partID', function (req, res) {

        _part2.default.updateOne(req.params.partID, req.body).then(function (part) {
            if (part.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: part.message,
                    error: part.error
                });
            } else {
                if (part.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente',
                    cambios: part.nModified
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).post('/:id/parts/', function (req, res) {
        _service2.default.addOnePart(req.params.id, req.body).then(function (part) {
            part.service = undefined;
            res.status(200).json(part);
        }).catch(function (err) {
            res.status(200).json({ err: err });
        });
    });
});

module.exports = app;