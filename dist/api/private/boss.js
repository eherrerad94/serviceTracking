'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _boss = require('../../controllers/boss');

var _boss2 = _interopRequireDefault(_boss);

var _auth = require('../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/boss', function (router) {
    router.get('/', _auth.user_credentials, function (req, res) {

        _boss2.default.listAll().then(function (bossList) {
            res.status(200).json(bossList);
        }).catch(function (err) {
            res.status(200).json({ error: err });
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _boss2.default.getOne(req.params.id).then(function (boss) {
            if (boss == 'Something went wrong' || boss === null) res.status(200).json({ message: 'Jefe con id ' + req.params.id + ' no existe' });else res.status(200).json({ message: 'Jefe recuperado satisfactoriamente', boss: boss });
        }).catch(function (err) {
            res.status(200).json({ error: err });
        });
    }).post('/', _auth.user_credentials, function (req, res) {
        _boss2.default.addOne(req.body).then(function (boss) {
            if (boss.hasOwnProperty('error')) res.status(200).json({
                message: boss.message,
                error: boss.error
            });else {
                res.status(201).json({
                    message: 'Jefe agregado satisfactoriamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _boss2.default.updateOne(req.params.id, req.body).then(function (boss) {
            if (boss.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: boss.message,
                    error: boss.error
                });
            } else {
                if (boss.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).delete('/:id', _auth.user_credentials, function (req, res) {
        _boss2.default.deleteOne(req.params.id).then(function (boss) {

            if (boss === undefined) return res.status(200).json({ message: "Jefe eliminado correctamente" });else return res.status(200).json({ message: boss.message, error: boss.error });
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    });
});

module.exports = app;