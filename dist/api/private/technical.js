'use strict';

var _technical = require('../../controllers/technical');

var _technical2 = _interopRequireDefault(_technical);

var _upload = require('../../config/upload');

var _upload2 = _interopRequireDefault(_upload);

var _auth = require('../../config/auth');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/technicals', function (router) {
    router.post('/', function (req, res) {

        _upload2.default.upload(req, res, function (err) {
            if (err) {
                res.status(404).json({ message: 'error al subir foto' });
            } else {
                var url = req.body.miUrl;
                delete req.body.submit;
                req.body.fotografia = url;
                delete req.body.miUrl;
                console.log(req.body);
                if (!url) res.status(404).json({ message: 'error subida', miurl: url });else {
                    _technical2.default.addOne(req.body).then(function (user) {
                        if (user.hasOwnProperty('error')) res.status(200).json({
                            message: user.message,
                            error: user.error
                        });else {
                            res.status(201).json({
                                message: 'Técnico agregado satisfactoriamente'
                            });
                        }
                    }).catch(function (err) {
                        res.status(200).json({ error: err });
                    });
                }
            }
        });
    }).get('/', _auth.user_credentials, function (req, res) {

        _technical2.default.listAll().then(function (technicalList) {
            res.status(200).json(technicalList);
        }).catch(function (err) {
            res.sendStatus(400);

            // res.status(200).json({ error: err })
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _technical2.default.getOne(req.params.id).then(function (technical) {
            technical.contrasena = undefined;
            if (technical == 'Something went wrong' || technical === null) res.status(200).json({ message: 'Técnico con id ' + req.params.id + ' no existe' });else res.status(200).json(technical);
        }).catch(function (err) {
            res.sendStatus(400);
            //.json({ error: err })
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _technical2.default.updateOne(req.params.id, req.body).then(function (technical) {
            if (technical.hasOwnProperty('error')) {
                technical.status(200).json({
                    message: technical.message,
                    error: technical.error
                });
            } else {
                if (technical.nModified == 0) res.status(200).json({ message: 'No se realizó ningún cambio' });else res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            res.status(200).json({ err: err });
        });
    }).delete('/:id', _auth.user_credentials, function (req, res) {
        _technical2.default.deleteOne(req.params.id).then(function (technical) {

            if (technical === undefined) res.status(200).json({ message: "Técnico eliminado correctamente" });else res.status(200).json({ message: technical.message, error: technical.error });
        }).catch(function (err) {
            res.status(200).json({ err: err });
        });
    }).post('/sign_in', function (req, res) {
        _technical2.default.iniciar_sesion(req.body.usuario, req.body.contrasena).then(function (response) {

            if (!response.hasOwnProperty("token")) {
                res.status(201).json({ message: response });
            } else {
                res.status(201).json(response);
            }
        }).catch(function (err) {
            res.status(200).send(err);
        });
    });
});

module.exports = app;