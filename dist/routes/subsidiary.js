'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _subsidiary = require('../controllers/subsidiary');

var _subsidiary2 = _interopRequireDefault(_subsidiary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/subsidiaries', function (router) {
    router.get('/', function (req, res) {

        _subsidiary2.default.listAll().then(function (subsidiaryList) {
            res.status(200).json({
                subsidiaryList: subsidiaryList,
                length: subsidiaryList.length
            });
        }).catch(function (err) {
            console.log('ERROR');
            res.status(200).json({ error: err });
        });
    }).get('/:id', function (req, res) {
        //console.log(req.body);
        _subsidiary2.default.getOne(req.params.id).then(function (subsidiary) {
            console.log("Route ", subsidiary);
            if (subsidiary == 'Something went wrong' || subsidiary === null) res.status(200).json({ message: 'Sucursal con id ' + req.params.id + ' no existe' });else res.status(200).json({ message: 'Sucursal recuperada satisfactoriamente', subsidiary: subsidiary });
        }).catch(function (err) {
            console.log('ERROR');
            return res.sendStatus(404); //.json({ err: err });
        });
    }).post('/', function (req, res) {
        //  console.log(req.body);
        _subsidiary2.default.addOne(req.body).then(function (subsidiary) {
            console.log(subsidiary);
            if (subsidiary.hasOwnProperty('error')) res.status(200).json({
                message: subsidiary.message,
                error: subsidiary.error
            });else {
                res.status(201).json({
                    message: 'Sucursal agregada satisfactoriamente'
                });
            }
        }).catch(function (err) {
            return res.sendStatus(404); //.json({ err: err });
        });
    }).put('/:id', function (req, res) {
        _subsidiary2.default.updateOne(req.params.id, req.body).then(function (subsidiary) {
            if (subsidiary.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: subsidiary.message,
                    error: subsidiary.error
                });
            } else {
                if (subsidiary.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente',
                    cambios: subsidiary.nModified
                });
            }
        }).catch(function (err) {
            return res.sendStatus(404); //.json({ err: err });
        });
    }).delete('/:id', function (req, res) {
        _subsidiary2.default.deleteOne(req.params.id).then(function (subsidiary) {

            if (subsidiary === undefined) return res.status(200).json({ message: "Sucursal eliminada correctamente" });else return res.status(200).json({ message: subsidiary.message, error: subsidiary.error });
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    });
});

module.exports = app;