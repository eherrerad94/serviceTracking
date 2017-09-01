'use strict';

var _request = require('../models/request');

var _request2 = _interopRequireDefault(_request);

var _service = require('../models/service');

var _service2 = _interopRequireDefault(_service);

var _part = require('../models/part');

var _part2 = _interopRequireDefault(_part);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var listAll = function listAll() {
    return _request2.default.then(function (requestList) {
        return requestList;
    }).cath(function (err) {
        return 'Something went wrong';
    });
};

var getOne = function getOne(id) {
    return _request2.default.findById(id).then(function (request) {
        return request;
    }).cath(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(request) {
    var newRequest = new _request2.default(request);

    return newRequest.save().then(function (request) {
        return request;
    }).cath(function (err) {
        var response = {
            message: 'No se pudo agregar el request',
            error: err.message
        };

        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {
    var byId = { _id: id };
    var query = { $set: newInfo };
    return _request2.default.update(byId, query).then(function (request) {
        return request;
    }).catch(function (err) {
        var response = {
            message: "No se pudieron actualizar los datos del request",
            error: err.message
        };
        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _request2.default.findById(id).then(function (request) {
        console.log("Delete", request);
        if (request === null) {
            var response = {
                message: 'No se pudo eliminar el request',
                error: 'Request con id ' + id + ' no existe'
            };
            return response;
        } else request.remove().then(function (request) {
            return request;
        }).catch(function (err) {
            var response = {
                message: 'No se pudo eliminar el request',
                error: 'Request con id ' + id + ' no existe'
            };
            return response;
        });
    });
};

var updateStatus = function updateStatus(id, newStatus, usuario) {

    return _request2.default.findById(id).then(function (request) {

        if (!request.usuario && usuario) request.usuario = usuario;

        var addStatus = { estatus: newStatus, fecha: Date.now() };

        request.estatus.push(addStatus);

        return request.save().then(function (request) {
            return request;
        }).catch(function (err) {
            return err;
        });
    });
};

var addOneService = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, info) {
        var newService, request;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        newService = new _service2.default(info);
                        _context.next = 3;
                        return _request2.default.findById(id);

                    case 3:
                        request = _context.sent;

                        //al nuevo subsidaria se le agrega la compania
                        newService.request = request;

                        //se guarda nueva subsidiarioa
                        _context.next = 7;
                        return newService.save();

                    case 7:

                        //al ticket ya creado se agrega la nueva subsidiaria
                        request.service.push(newService);

                        console.log("Company ", request);
                        _context.next = 11;
                        return request.save();

                    case 11:
                        return _context.abrupt('return', newService);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function addOneService(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var listAllServices = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var request;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _request2.default.findById(id).populate('service');

                    case 2:
                        request = _context2.sent;

                        // company.subsidiaries.company = undefined;
                        console.log("Populate: ", request);
                        return _context2.abrupt('return', request.service);

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function listAllServices(_x3) {
        return _ref2.apply(this, arguments);
    };
}();

var getOneService = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, serid) {
        var request, service;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _request2.default.findById(id).populate('service');

                    case 2:
                        request = _context3.sent;
                        service = request.service.find(function (ser) {

                            if (ser._id == serid) return ser;else return null;
                        });

                        service.request = undefined;

                        return _context3.abrupt('return', service);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function getOneService(_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();

var addPartToService = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(info, service) {
        var newPart;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:

                        info.contrasena = _bcrypt2.default.hashSync(info.contrasena, 10);
                        //se crea el cliuente
                        newPart = new _part2.default(info);
                        //al nuevo cliente se le vincula la sucursal

                        newPart.service = service;

                        console.log(newPart);
                        _context4.next = 6;
                        return newPart.save();

                    case 6:
                        service.Part.push(newPart);

                        _context4.next = 9;
                        return service.save();

                    case 9:
                        return _context4.abrupt('return', newPart);

                    case 10:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function addPartToService(_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();

var getOnePart = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(serId, idPart) {
        var service, part;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:

                        console.log('IDPart ', idPart);
                        _context5.next = 3;
                        return _service2.default.findById(serId).populate('part');

                    case 3:
                        service = _context5.sent;
                        part = service.part.find(function (part) {
                            if (part._id == idPart) {
                                part.service = undefined;
                                return idPart;
                            } else return null;
                        });

                        // client.clients = undefined;

                        return _context5.abrupt('return', client);

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function getOnePart(_x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}();

module.exports = {
    listAll: listAll,
    getOne: getOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    updateStatus: updateStatus,
    //service
    addOneService: addOneService,
    listAllServices: listAllServices,
    getOneService: getOneService,
    //parts
    addPartToService: addPartToService,
    getOnePart: getOnePart

};