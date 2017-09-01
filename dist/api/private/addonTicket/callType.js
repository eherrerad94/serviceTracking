'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _callType = require('../../../controllers/callType');

var _callType2 = _interopRequireDefault(_callType);

var _auth = require('../../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/callTypes', function (router) {
    router.get('/', _auth.user_credentials, function (req, res) {

        _callType2.default.listAll().then(function (callTypeList) {
            res.status(200).json(callTypeList);
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).post('/', _auth.user_credentials, function (req, res) {
        _callType2.default.addOne(req.body).then(function (callType) {

            if (callType.hasOwnProperty('error')) res.status(201).json({
                message: callType.message,
                error: callType.error
            });else {
                res.status(201).json({
                    message: 'tipo de llamada agregada satisfactoriamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _callType2.default.getOne(req.params.id).then(function (callType) {
            res.status(200).json(callType);
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _callType2.default.updateOne(req.params.id, req.body).then(function (callType) {
            if (callType.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: callType.message,
                    error: callType.error
                });
            } else {
                if (callType.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).delete('/:id', _auth.admin_credentials, function (req, res) {
        _callType2.default.deleteOne(req.params.id).then(function (callType) {

            if (callType === undefined) return res.status(200).json({ message: "Tipo de area eliminado correctamente" });else return res.status(200).json({ message: callType.message, error: callType.error });
        }).catch(function (err) {
            res.sendStatus(404);
        });
    });
});

module.exports = app;