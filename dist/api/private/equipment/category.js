'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _category = require('../../../controllers/category');

var _category2 = _interopRequireDefault(_category);

var _auth = require('../../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/categories', function (router) {
    router.get('/', _auth.user_credentials, function (req, res) {

        _category2.default.listAll().then(function (categoryList) {
            res.status(200).json(categoryList);
        }).catch(function (err) {
            res.status(200).json({ error: err });
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _category2.default.getOne(req.params.id).then(function (category) {
            if (category == 'Something went wrong' || category === null) res.status(200).json({ message: 'Categoria con id ' + req.params.id + ' no existe' });else res.status(200).json({ message: 'Categoria recuperado satisfactoriamente', categoria: category });
        }).catch(function (err) {
            res.status(200).json({ error: err });
        });
    }).post('/', _auth.user_credentials, function (req, res) {
        _category2.default.addOne(req.body).then(function (category) {
            if (category.hasOwnProperty('error')) res.status(200).json({
                message: category.message,
                error: category.error
            });else {
                res.status(201).json({
                    message: 'Categoria agregado satisfactoriamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _category2.default.updateOne(req.params.id, req.body).then(function (category) {
            if (category.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: category.message,
                    error: category.error
                });
            } else {
                if (category.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).delete('/:id', _auth.user_credentials, function (req, res) {
        _category2.default.deleteOne(req.params.id).then(function (category) {

            if (category === undefined) return res.status(200).json({ message: "Categoria eliminado correctamente" });else return res.status(200).json({ message: category.message, error: category.error });
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _category2.default.getOne(req.params.id).then(function (category) {
            if (category == 'Something went wrong' || category === null) res.status(200).json({ message: 'Categoria con id ' + req.params.id + ' no existe' });else res.status(200).json({ message: 'Categoria recuperado satisfactoriamente', categoria: category });
        }).catch(function (err) {
            res.status(200).json({ error: err });
        });
    });
});

module.exports = app;