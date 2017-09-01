'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _quotation = require('../../controllers/quotation');

var _quotation2 = _interopRequireDefault(_quotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/quotations', function (router) {
    router.get('/', function (req, res) {

        _quotation2.default.listAll().then(function (quotarionList) {
            res.status(200).json({
                quotarionList: quotarionList,
                length: quotarionList.length
            });
        }).catch(function (err) {
            console.log('ERROR');
            res.status(200).json({ error: err });
        });
    }).get('/:id', function (req, res) {
        //console.log(req.body);
        _quotation2.default.getOne(req.params.id).then(function (quotarion) {
            console.log("Route ", quotarion);
            if (quotarion == 'Something went wrong' || quotarion === null) res.status(200).json({ message: 'Cotizacion con id ' + req.params.id + ' no existe' });else res.status(200).json({ message: 'Cotizacion encontrado satisfactoriamente', quotarion: quotarion });
        }).catch(function (err) {
            console.log('ERROR');
            res.status(200).json({ error: err });
        });
    }).post('/', function (req, res) {
        //  console.log(req.body);
        _quotation2.default.addOne(req.body).then(function (quotarion) {
            console.log(quotarion);
            if (quotarion.hasOwnProperty('error')) res.status(200).json({
                message: quotarion.message,
                error: quotarion.error
            });else {
                res.status(201).json({
                    message: 'Cotizacion agregada satisfactoriamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).put('/:id', function (req, res) {
        _quotation2.default.updateOne(req.params.id, req.body).then(function (quotarion) {
            if (quotarion.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: quotarion.message,
                    error: quotarion.error
                });
            } else {
                if (boss.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente',
                    cambios: quotarion.nModified
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).delete('/:id', function (req, res) {
        _quotation2.default.deleteOne(req.params.id).then(function (quotarion) {

            if (quotarion === undefined) return res.status(200).json({ message: "Entrada en la agenda eliminada correctamente" });else return res.status(200).json({ message: quotarion.message, error: quotarion.error });
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    });
});
module.exports = app;