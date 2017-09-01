'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _failure = require('../../../controllers/failure');

var _failure2 = _interopRequireDefault(_failure);

var _auth = require('../../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/failures', function (router) {
    router.get('/', _auth.user_credentials, function (req, res) {

        _failure2.default.listAll().then(function (failureList) {
            res.status(200).json(failureList);
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).post('/', _auth.user_credentials, function (req, res) {
        _failure2.default.addOne(req.body).then(function (failure) {

            if (failure.hasOwnProperty('error')) res.status(201).json({
                message: failure.message,
                error: failure.error
            });else {
                res.status(201).json({
                    message: 'Falla agregada satisfactoriamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _failure2.default.getOne(req.params.id).then(function (failure) {
            res.status(200).json(failure);
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _failure2.default.updateOne(req.params.id, req.body).then(function (failure) {
            if (failure.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: failure.message,
                    error: failure.error
                });
            } else {
                if (failure.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).delete('/:id', _auth.admin_credentials, function (req, res) {
        _failure2.default.deleteOne(req.params.id).then(function (failure) {

            if (failure === undefined) return res.status(200).json({ message: "Falla eliminada correctamente" });else return res.status(200).json({ message: failure.message, error: failure.error });
        }).catch(function (err) {
            res.sendStatus(404);
        });
    });
});

module.exports = app;