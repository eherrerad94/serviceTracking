'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _priority = require('../../../controllers/priority');

var _priority2 = _interopRequireDefault(_priority);

var _auth = require('../../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/priorities', function (router) {
    router.get('/', _auth.user_credentials, function (req, res) {

        _priority2.default.listAll().then(function (priorityList) {
            res.status(200).json(priorityList);
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).post('/', _auth.user_credentials, function (req, res) {
        _priority2.default.addOne(req.body).then(function (priority) {

            if (priority.hasOwnProperty('error')) res.status(201).json({
                message: priority.message,
                error: priority.error
            });else {
                res.status(201).json({
                    message: 'Prioridad agregada satisfactoriamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _priority2.default.getOne(req.params.id).then(function (priority) {
            res.status(200).json(priority);
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _priority2.default.updateOne(req.params.id, req.body).then(function (priority) {
            if (priority.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: priority.message,
                    error: priority.error
                });
            } else {
                if (priority.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).delete('/:id', _auth.admin_credentials, function (req, res) {
        _priority2.default.deleteOne(req.params.id).then(function (priority) {

            if (priority === undefined) return res.status(200).json({ message: "Prioridad eliminada correctamente" });else return res.status(200).json({ message: priority.message, error: priority.error });
        }).catch(function (err) {
            res.sendStatus(404);
        });
    });
});

module.exports = app;