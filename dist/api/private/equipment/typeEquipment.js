'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _typeEquipment = require('../../../controllers/typeEquipment');

var _typeEquipment2 = _interopRequireDefault(_typeEquipment);

var _auth = require('../../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/typesEquipment', function (router) {
    router.get('/', _auth.user_credentials, function (req, res) {

        _typeEquipment2.default.listAll().then(function (typeEquipmentList) {
            res.status(200).json(typeEquipmentList);
        }).catch(function (err) {
            res.status(200).json({ error: err });
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _typeEquipment2.default.getOne(req.params.id).then(function (typeEquipment) {
            if (typeEquipment == 'Something went wrong' || typeEquipment === null) res.status(200).json({ message: 'Tipo de equipo con id ' + req.params.id + ' no existe' });else res.status(200).json({ message: 'Tipo de equipo recuperado satisfactoriamente', tipoEquipo: typeEquipment });
        }).catch(function (err) {
            res.status(200).json({ error: err });
        });
    }).post('/', _auth.user_credentials, function (req, res) {
        _typeEquipment2.default.addOne(req.body).then(function (typeEquipment) {
            if (typeEquipment.hasOwnProperty('error')) res.status(200).json({
                message: typeEquipment.message,
                error: typeEquipment.error
            });else {
                res.status(201).json({
                    message: 'Tipo de equipo agregado satisfactoriamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _typeEquipment2.default.updateOne(req.params.id, req.body).then(function (typeEquipment) {
            if (typeEquipment.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: typeEquipment.message,
                    error: typeEquipment.error
                });
            } else {
                if (typeEquipment.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).delete('/:id', _auth.user_credentials, function (req, res) {
        _typeEquipment2.default.deleteOne(req.params.id).then(function (typeEquipment) {

            if (typeEquipment === undefined) return res.status(200).json({ message: "Tipo de equipo eliminado correctamente" });else return res.status(200).json({ message: typeEquipment.message, error: typeEquipment.error });
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    });
});

module.exports = app;