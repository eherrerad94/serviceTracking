'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _equipment = require('../../../controllers/equipment');

var _equipment2 = _interopRequireDefault(_equipment);

var _auth = require('../../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/equipments', function (router) {
    router.get('/', _auth.user_credentials, function (req, res) {

        _equipment2.default.listAll().then(function (equipmentList) {
            res.status(200).json(equipmentList);
        }).catch(function (err) {
            res.status(200).json({ error: err });
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _equipment2.default.getOne(req.params.id).then(function (equipment) {
            if (equipment == 'Something went wrong' || equipment === null) res.status(200).json({ message: 'Equipo con id ' + req.params.id + ' no existe' });else res.status(200).json({ message: 'Equipo recuperado satisfactoriamente', equipo: equipment });
        }).catch(function (err) {
            res.status(200).json({ error: err });
        });
    }).post('/', _auth.user_credentials, function (req, res) {
        _equipment2.default.addOne(req.body).then(function (equipment) {
            if (equipment.hasOwnProperty('error')) res.status(200).json({
                message: equipment.message,
                error: equipment.error
            });else {
                res.status(201).json({
                    message: 'Equipo agregado satisfactoriamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _equipment2.default.updateOne(req.params.id, req.body).then(function (equipment) {
            if (equipment.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: equipment.message,
                    error: equipment.error
                });
            } else {
                if (equipment.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).delete('/:id', _auth.user_credentials, function (req, res) {
        _equipment2.default.deleteOne(req.params.id).then(function (equipment) {

            if (equipment === undefined) return res.status(200).json({ message: "Equipo eliminado correctamente" });else return res.status(200).json({ message: equipment.message, error: equipment.error });
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    });
});

module.exports = app;