'use strict';

var _user = require('../../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/programmers', function (router) {
    router.get('/', _auth.admin_credentials, function (req, res) {

        _user2.default.listAll('Programador').then(function (lista) {
            lista.map(function (item) {
                item.contrasena = undefined;
            });
            res.status(200).json(lista);
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).get('/:id', _auth.admin_credentials, function (req, res) {

        _user2.default.getOne(req.params.id).then(function (programmer) {
            programmer.cargo = undefined;
            programmer.contrasena = undefined;
            res.status(200).json(programmer);
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).post('/', _auth.admin_credentials, function (req, res) {
        req.body.cargo = "Programador";
        console.log(req.body.cargo);
        _user2.default.registro(req.body).then(function (user) {
            console.log("UserRoute ", user);

            if (user.hasOwnProperty('error')) res.status(201).json({
                message: user.message,
                error: user.error
            });else {
                res.status(201).json({
                    message: 'Usuario agregado satisfactoriamente'
                });
            }
        }).catch(function (err) {
            res.status(200).json({ error: err });
        });
    });
    // .post('/admin', admin_credentials, (req, res) => {
    //     req.body.cargo = "Admin";

    //     userCtrl
    //         .registro(req.body)
    //         .then(user => {
    //             console.log("UserRoute ", user);

    //             if (user.hasOwnProperty('error'))
    //                 res.status(201).json({
    //                     message: user.message,
    //                     error: user.error
    //                 });
    //             else {
    //                 res.status(201).json({
    //                     message: 'Usuario agregado satisfactoriamente',
    //                 });
    //             }
    //         })
    //         .catch(err => {
    //             res.status(200).json({ error: err })
    //         })
    // })
});

module.exports = app;