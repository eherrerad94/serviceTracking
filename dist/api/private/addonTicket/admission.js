'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _admission = require('../../../controllers/admission');

var _admission2 = _interopRequireDefault(_admission);

var _auth = require('../../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/admissions', function (router) {
    router.get('/', _auth.user_credentials, function (req, res) {

        _admission2.default.listAll().then(function (admissionList) {
            res.status(200).json(admissionList);
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).post('/', _auth.user_credentials, function (req, res) {
        _admission2.default.addOne(req.body).then(function (admission) {

            if (admission.hasOwnProperty('error')) res.status(201).json({
                message: admission.message,
                error: admission.error
            });else {
                res.status(201).json({
                    message: 'Alta agregada satisfactoriamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _admission2.default.getOne(req.params.id).then(function (admission) {
            res.status(200).json(admission);
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _admission2.default.updateOne(req.params.id, req.body).then(function (admission) {
            if (admission.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: admission.message,
                    error: admission.error
                });
            } else {
                if (admission.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).delete('/:id', _auth.admin_credentials, function (req, res) {
        _admission2.default.deleteOne(req.params.id).then(function (admission) {

            if (admission === undefined) return res.status(200).json({ message: "Alta eliminado correctamente" });else return res.status(200).json({ message: admission.message, error: admission.error });
        }).catch(function (err) {
            res.sendStatus(404);
        });
    });
});

module.exports = app;