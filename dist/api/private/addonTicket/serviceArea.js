'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serviceArea = require('../../../controllers/serviceArea');

var _serviceArea2 = _interopRequireDefault(_serviceArea);

var _auth = require('../../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/serviceAreas', function (router) {
    router.get('/', _auth.user_credentials, function (req, res) {

        _serviceArea2.default.listAll().then(function (serviceAreaList) {
            res.status(200).json(serviceAreaList);
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).post('/', _auth.user_credentials, function (req, res) {
        _serviceArea2.default.addOne(req.body).then(function (serviceArea) {

            if (serviceArea.hasOwnProperty('error')) res.status(201).json({
                message: serviceArea.message,
                error: serviceArea.error
            });else {
                res.status(201).json({
                    message: 'Area de servicio agregada satisfactoriamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _serviceArea2.default.getOne(req.params.id).then(function (serviceArea) {
            res.status(200).json(serviceArea);
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _serviceArea2.default.updateOne(req.params.id, req.body).then(function (serviceArea) {
            if (serviceArea.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: serviceArea.message,
                    error: serviceArea.error
                });
            } else {
                if (serviceArea.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).delete('/:id', _auth.admin_credentials, function (req, res) {
        _serviceArea2.default.deleteOne(req.params.id).then(function (serviceArea) {

            if (serviceArea === undefined) return res.status(200).json({ message: "Area de servicio eliminada correctamente" });else return res.status(200).json({ message: serviceArea.message, error: serviceArea.error });
        }).catch(function (err) {
            res.sendStatus(404);
        });
    });
});

module.exports = app;