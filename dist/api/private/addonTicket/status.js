'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _status = require('../../../controllers/status');

var _status2 = _interopRequireDefault(_status);

var _auth = require('../../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/statuss', function (router) {
    router.get('/', _auth.user_credentials, function (req, res) {

        _status2.default.listAll().then(function (statusList) {
            res.status(200).json(statusList);
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).post('/', _auth.user_credentials, function (req, res) {
        _status2.default.addOne(req.body).then(function (status) {

            if (status.hasOwnProperty('error')) res.status(201).json({
                message: status.message,
                error: status.error
            });else {
                res.status(201).json({
                    message: 'Area de servicio agregada satisfactoriamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _status2.default.getOne(req.params.id).then(function (status) {
            res.status(200).json(status);
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _status2.default.updateOne(req.params.id, req.body).then(function (status) {
            if (status.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: status.message,
                    error: status.error
                });
            } else {
                if (status.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).delete('/:id', _auth.admin_credentials, function (req, res) {
        _status2.default.deleteOne(req.params.id).then(function (status) {

            if (status === undefined) return res.status(200).json({ message: "Area de servicio eliminado correctamente" });else return res.status(200).json({ message: status.message, error: status.error });
        }).catch(function (err) {
            res.sendStatus(404);
        });
    });
});

module.exports = app;