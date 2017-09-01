'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ticket = require('../controllers/ticket');

var _ticket2 = _interopRequireDefault(_ticket);

var _auth = require('../config/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = _express2.default.Router();
// Middlewaring autentication

app.group('/requests', function (router) {
    router.get('/', _auth.client_credentials, function (req, res) {
        console.log('Public:  ', req.user);
        _ticket2.default.listAll(req.user).then(function (requestList) {
            res.status(200).json(requestList);
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).get('/:id', _auth.client_credentials, function (req, res) {
        _ticket2.default.getOne(req.params.id).then(function (request) {
            if (request) {
                res.status(200).json(request);
            } else {
                res.sendStatus(404);
            }
        }).catch(function (err) {
            res.sendStatus(err);
        });
    }).post('/', _auth.client_credentials, function (req, res) {
        _ticket2.default.addOne(req.body, 'Pendiente de revision', req.user, undefined).then(function (request) {
            console.log(request);

            res.status(201).json({
                message: 'Solicitud creada satisfactoriamente'
            });
        }).catch(function (err) {
            res.sendStatus(404);
        });
    }).put('/:id', _auth.client_credentials, function (req, res) {

        _ticket2.default.updateOne(req.params.id, req.body).then(function (request) {
            if (request.hasOwnProperty('error')) {
                return res.status(200).json({
                    message: request.message,
                    error: request.error
                });
            } else {
                if (request.nModified == 0) return res.status(200).json({ message: 'No se realizó ningún cambio' });else return res.status(200).json({
                    message: 'Se realizaron cambios correctamente',
                    cambios: request.nModified
                });
            }
        }).catch(function (err) {
            return res.sendStatus(404); //.json({ err: err });
        });
    }).get('/:id/services/', _auth.client_credentials, function (req, res) {
        _ticket2.default.listAllServices(req.params.id).then(function (services) {

            if (services.length == 0) res.status(200).json({
                "services": 'Este ticket no cuenta con servicios aún',
                "length": services.length
            });else {
                services.map(function (services) {
                    services.company = undefined;
                });

                res.status(200).json({
                    "services": services,
                    "length": services.length
                });
            }
        }).catch(function (err) {
            res.sendStatus(404); //.json({ err: err });
        });
    }).post('/:id/services/', _auth.client_credentials, function (req, res) {
        _ticket2.default.addOneService(req.params.id, req.body).then(function (service) {
            service.company = undefined;
            res.status(200).json(service);
        }).catch(function (err) {
            res.status(200).json({ err: err });
        });
    }).get('/:id/services/:servid', _auth.client_credentials, function (req, res) {
        _ticket2.default.getOnePart(req.params.id, req.params.servid).then(function (part) {
            if (part == undefined) res.status(200).json({ message: "No se encontro ninguna parte con el id proporcionado" });else res.status(200).json({ sucursal: suc });
        }).catch(function (err) {
            res.sendStatus(404); //.json({ err: err });
        });
    }).put('/:id/services/:servid', _auth.client_credentials, function (req, res) {

        _ticket2.default.updateOne(req.params.servid, req.body).then(function (service) {
            if (service.hasOwnProperty('error')) {
                res.status(200).json({
                    message: service.message,
                    error: service.error
                });
            } else {
                if (service.nModified == 0) res.status(200).json({ message: 'No se realizó ningún cambio' });else res.status(200).json({
                    message: 'Se realizaron cambios correctamente',
                    cambios: service.nModified
                });
            }
        }).catch(function (err) {
            res.status(200).json({ err: err });
        });
    }).get('/:id/services/:servid/parts', function (req, res) {
        _ticket2.default.getOneServices(req.params.id, req.params.servid).then(function (service) {
            Service.findById(service).populate('parts').exec(function (err, client) {
                if (part.part.length == 0) res.status(200).json({ message: "No tiene partes" });else {
                    // client.map( client => {client.contrasena = undefined})
                    var arrayPart = part.parts;

                    arrayPart.map(function (part) {
                        part.service = undefined;
                    });
                    res.status(200).json(arrayPart);
                }
            });
        }).catch(function (err) {
            res.sendStatus(404); //.json({ err: err });
        });
    }).post('/:id/services/:servid/parts', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _ticket2.default.getOneServices(req.params.id, req.params.servid).then(function (service) {

                                _ticket2.default.addPartToService(req.body, subsidiary).then(function (newPart) {
                                    newPart.service = undefined;
                                    res.status(200).json(newPart);
                                }).catch(function (err) {
                                    console.log("Error ", err);
                                });
                            }).catch(function (err) {
                                res.sendStatus(404); //.json({ err: err });
                            });

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }()).get('/:id/services/:servid/parts/:partId', function (req, res) {
        _ticket2.default.getOneServices(req.params.id, req.params.servid).then(function (service) {
            var id = service._id;
            _ticket2.default.getOnePart(id, req.params.partId).then(function (part) {
                console.log('La parte ', part);
                res.status(200).json(part);
            }).catch(function (err) {
                console.log("Error ", err);
            });
        }).catch(function (err) {
            res.sendStatus(404); //.json({ err: err });
        });
    }).get('/:id/parts/', function (req, res) {
        _ticket2.default.listAllParts(req.params.id).then(function (partes) {

            if (partes.length == 0) res.status(200).json({
                "partes": 'Este ticket no cuenta con partes aún',
                "length": partes.length
            });else {
                partes.map(function (partes) {
                    request.partes = undefined;
                });

                res.status(200).json({
                    "partes": partes,
                    "length": partes.length
                });
            }
        }).catch(function (err) {
            res.sendStatus(404); //.json({ err: err });
        });
    }).post('/:id/parts/', function (req, res) {
        _ticket2.default.addOnePart(req.params.id, req.body).then(function (partes) {
            partes.request = undefined;
            res.status(200).json(partes);
        }).catch(function (err) {
            res.status(200).json({ err: err });
        });
    });
});

module.exports = app;