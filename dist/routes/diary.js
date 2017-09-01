'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _diary = require('../controllers/diary');

var _diary2 = _interopRequireDefault(_diary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/diaries', function (router) {
    router.get('/', function (req, res) {

        _diary2.default.listAll().then(function (diaryList) {
            res.status(200).json({
                diaryList: diaryList,
                length: diaryList.length
            });
        }).catch(function (err) {
            console.log('ERROR');
            res.status(200).json({ error: err });
        });
    }).get('/:id', function (req, res) {
        //console.log(req.body);
        _diary2.default.getOne(req.params.id).then(function (diary) {
            console.log("Route ", diary);
            if (diary == 'Something went wrong' || diary === null) res.status(200).json({ message: 'Entrada en la agenda con id ' + req.params.id + ' no existe' });else res.status(200).json({ message: 'Entrada en la agenda encontrado satisfactoriamente', diary: diary });
        }).catch(function (err) {
            console.log('ERROR');
            res.status(200).json({ error: err });
        });
    }).post('/', function (req, res) {
        //  console.log(req.body);
        _diary2.default.addOne(req.body).then(function (diary) {
            console.log(diary);
            if (diary.hasOwnProperty('error')) res.status(200).json({
                message: diary.message,
                error: diary.error
            });else {
                res.status(201).json({
                    message: 'Entrada en la agenda agregada satisfactoriamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).put('/:id', function (req, res) {
        _diary2.default.updateOne(req.params.id, req.body).then(function (diary) {
            if (diary.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: diary.message,
                    error: diary.error
                });
            } else {
                if (boss.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente',
                    cambios: diary.nModified
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).delete('/:id', function (req, res) {
        _diary2.default.deleteOne(req.params.id).then(function (diary) {

            if (diary === undefined) return res.status(200).json({ message: "Entrada en la agenda eliminada correctamente" });else return res.status(200).json({ message: diary.message, error: diary.error });
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    });
});
module.exports = app;