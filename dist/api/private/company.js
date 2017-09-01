'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _company = require('../../controllers/company');

var _company2 = _interopRequireDefault(_company);

var _subsidiary = require('../../controllers/subsidiary');

var _subsidiary2 = _interopRequireDefault(_subsidiary);

var _subsidiary3 = require('../../models/subsidiary');

var _subsidiary4 = _interopRequireDefault(_subsidiary3);

var _auth = require('../../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();

app.group('/companies', function (router) {
    router.get('/', _auth.user_credentials, function (req, res) {

        _company2.default.listAll().then(function (companyList) {
            res.status(200).json(companyList);
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).post('/', _auth.user_credentials, function (req, res) {
        _company2.default.addOne(req.body).then(function (company) {

            if (company.hasOwnProperty('error')) res.status(201).json({
                message: company.message,
                error: company.error
            });else {
                res.status(201).json({
                    message: 'Empresa agregada satisfactoriamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).get('/:id', _auth.user_credentials, function (req, res) {
        _company2.default.getOne(req.params.id).then(function (company) {
            res.status(200).json(company);
        });
    }).put('/:id', _auth.user_credentials, function (req, res) {
        _company2.default.updateOne(req.params.id, req.body).then(function (company) {
            if (company.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: company.message,
                    error: company.error
                });
            } else {
                if (company.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).delete('/:id', _auth.admin_credentials, function (req, res) {
        _company2.default.deleteOne(req.params.id).then(function (company) {

            if (company === undefined) return res.status(200).json({ message: "Empresa eliminado correctamente" });else return res.status(200).json({ message: company.message, error: company.error });
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).get('/:id/subsidiaries/', _auth.user_credentials, function (req, res) {
        _company2.default.listAllSubsidiaries(req.params.id).then(function (sucursales) {

            if (sucursales.length == 0) res.status(200).json({
                "sucursales": 'Esta empresa no cuenta con sucursales aún'
            });else {
                sucursales.map(function (sucursal) {
                    sucursal.company = undefined;
                });
                res.status(200).json(sucursales);
            }
        }).catch(function (err) {
            res.sendStatus(404); //.json({ err: err });
        });
    }).post('/:id/subsidiaries/', _auth.user_credentials, function (req, res) {
        _company2.default.addOneSubsidiary(req.params.id, req.body).then(function (subsidiary) {
            res.status(200).json(subsidiary);
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).get('/:id/subsidiaries/:subid', _auth.user_credentials, function (req, res) {
        _company2.default.getOneSubsidiary(req.params.id, req.params.subid).then(function (sucursal) {
            if (sucursal == undefined) res.status(200).json({ message: "No se encontro ninguna sucursal con el id proporcionado" });else res.status(200).json(sucursal);
        }).catch(function (err) {
            return res.sendStatus(404); //.json({ err: err });
        });
    }).put('/:id/subsidiaries/:subid', _auth.user_credentials, function (req, res) {

        _subsidiary2.default.updateOne(req.params.subid, req.body).then(function (subsidiary) {
            if (subsidiary.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: subsidiary.message,
                    error: subsidiary.error
                });
            } else {
                if (subsidiary.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente'
                });
            }
        }).catch(function (err) {
            return res.status(200).json({ err: err });
        });
    }).get('/:id/subsidiaries/:subid/clients', _auth.user_credentials, function (req, res) {
        _company2.default.getOneSubsidiary(req.params.id, req.params.subid).then(function (subsidiary) {
            _subsidiary4.default.findById(subsidiary).populate('clients').exec(function (err, client) {
                if (client.clients.length == 0) res.status(200).json({ message: "No tiene usuarios" });else {
                    var arrayClient = client.clients;

                    arrayClient.map(function (client) {
                        client.contrasena = undefined;
                        client.subsidiary = undefined;
                    });
                    res.status(200).json(arrayClient);
                }
            });
        }).catch(function (err) {
            return res.sendStatus(404); //.json({ err: err });
        });
    }).post('/:id/subsidiaries/:subid/clients', _auth.user_credentials, function (req, res) {
        _company2.default.getOneSubsidiary(req.params.id, req.params.subid).then(function (subsidiary) {

            _company2.default.addClientToSubsidiary(req.body, subsidiary).then(function (newClient) {
                newClient.subsidiary = undefined;
                res.status(200).json(newClient);
            }).catch(function (err) {
                return res.sendStatus(404); //.json({ err: err });
            });
        }).catch(function (err) {
            return res.sendStatus(404); //.json({ err: err });
        });
    }).get('/:id/subsidiaries/:subid/clients/:clientId', _auth.user_credentials, function (req, res) {
        _company2.default.getOneSubsidiary(req.params.id, req.params.subid).then(function (subsidiary) {
            var id = subsidiary._id;
            _company2.default.getOneClient(id, req.params.clientId).then(function (client) {
                res.status(200).json(client);
            }).catch(function (err) {
                return res.sendStatus(404); //.json({ err: err });
            });
        }).catch(function (err) {
            return res.sendStatus(404); //.json({ err: err });
        });
    });
});

module.exports = app;