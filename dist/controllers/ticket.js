'use strict';

var _ticket = require('../models/ticket');

var _ticket2 = _interopRequireDefault(_ticket);

var _request = require('../models/request');

var _request2 = _interopRequireDefault(_request);

var _service = require('../models/service');

var _service2 = _interopRequireDefault(_service);

var _part = require('../models/part');

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var listAll = function listAll() {
    return _ticket2.default.find().then(function (ticketList) {
        return ticketList;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var getOne = function getOne(id) {
    return _ticket2.default.findById(id).then(function (ticket) {
        return ticket;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(ticket, status, client, user) {
    var newTicket = new _ticket2.default(ticket);

    console.log("Tikcet :", ticket);
    if (client) {
        //Agregar cliente al usuario
        newTicket.cliente = client;
    }
    if (user) {
        //Agregar usuario al ticket
        newTicket.user = user;
    }
    if (status) {
        //Agregar status al ticket
        newTicket.estatus = status;
    }

    return newTicket.save().then(function (ticket) {
        return ticket;
    }).catch(function (err) {
        var response = {
            message: 'No se pudo agregar el ticket',
            error: err.message
        };

        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {
    var byId = { _id: id };
    var query = { $set: newInfo };
    return _ticket2.default.update(byId, query).then(function (ticket) {
        return ticket;
    }).catch(function (err) {
        var response = {
            message: "No se pudieron actualizar los datos del ticket",
            error: err.message
        };
        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _ticket2.default.findById(id).then(function (ticket) {
        console.log("Delete", ticket);
        if (ticket === null) {
            var response = {
                message: 'No se pudo eliminar el ticket',
                error: 'Ticket con id ' + id + ' no existe'
            };
            return response;
        } else ticket.remove().then(function (ticket) {
            return ticket;
        }).catch(function (err) {
            var response = {
                message: 'No se pudo eliminar el ticket',
                error: 'Ticket con id ' + id + ' no existe'
            };
            return response;
        });
    });
};

var updateStatus = function updateStatus(id, newStatus, usuario) {

    return _ticket2.default.findById(id).then(function (ticket) {

        if (!ticket.usuario && usuario) ticket.usuario = usuario;

        var addStatus = { estatus: newStatus, fecha: Date.now() };

        ticket.estatus.push(addStatus);

        return ticket.save().then(function (ticket) {
            return ticket;
        }).catch(function (err) {
            return err;
        });
    });
};

var addOneRequest = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, info) {
        var newRequest, ticket;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        newRequest = new _request2.default(info);
                        _context.next = 3;
                        return _ticket2.default.findById(id);

                    case 3:
                        ticket = _context.sent;

                        //al nuevo subsidaria se le agrega la compania
                        newRequest.ticket = ticket;

                        //se guarda nueva subsidiarioa
                        _context.next = 7;
                        return newRequest.save();

                    case 7:

                        //al ticket ya creado se agrega la nueva subsidiaria
                        ticket.request.push(newRequest);

                        console.log("Company ", ticket);
                        _context.next = 11;
                        return ticket.save();

                    case 11:
                        return _context.abrupt('return', newRequest);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function addOneRequest(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var listAllRequest = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
        var ticket;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return _ticket2.default.findById(id).populate('request');

                    case 2:
                        ticket = _context2.sent;

                        // company.subsidiaries.company = undefined;
                        console.log("Populate: ", ticket);
                        return _context2.abrupt('return', ticket.request);

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function listAllRequest(_x3) {
        return _ref2.apply(this, arguments);
    };
}();

var getOneRequest = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, reqid) {
        var ticket, request;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _ticket2.default.findById(id).populate('request');

                    case 2:
                        ticket = _context3.sent;
                        request = ticket.request.find(function (req) {

                            if (req._id == reqid) return req;else return null;
                        });

                        request.ticket = undefined;
                        return _context3.abrupt('return', request);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function getOneRequest(_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();

var addServiceToRequest = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(info, request) {
        var newService;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:

                        info.contrasena = bcrypt.hashSync(info.contrasena, 10);
                        //se crea el cliuente
                        newService = new _service2.default(info);
                        //al nuevo cliente se le vincula la sucursal

                        newService.request = request;

                        console.log(newService);
                        _context4.next = 6;
                        return newService.save();

                    case 6:
                        request.service.push(newService);

                        _context4.next = 9;
                        return request.save();

                    case 9:
                        return _context4.abrupt('return', newService);

                    case 10:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function addServiceToRequest(_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();

var getOneService = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(reqId, idRequest) {
        var request, service;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:

                        console.log('IDRequest ', idRequest);
                        _context5.next = 3;
                        return _request2.default.findById(reqId).populate('service');

                    case 3:
                        request = _context5.sent;
                        service = request.service.find(function (service) {
                            if (service._id == idRequest) {
                                service.request = undefined;
                                return idRequest;
                            } else return null;
                        });

                        // client.clients = undefined;

                        return _context5.abrupt('return', service);

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function getOneService(_x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}();

var addPartToRequest = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(info, request) {
        var newPart;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:

                        info.contrasena = bcrypt.hashSync(info.contrasena, 10);
                        newPart = new _part2.default(info);

                        newPart.request = request;

                        console.log(newPart);
                        _context6.next = 6;
                        return newPart.save();

                    case 6:
                        request.part.push(newPart);

                        _context6.next = 9;
                        return request.save();

                    case 9:
                        return _context6.abrupt('return', newPart);

                    case 10:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function addPartToRequest(_x10, _x11) {
        return _ref6.apply(this, arguments);
    };
}();

var getOnePart = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(reqId, idPart) {
        var request, part;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:

                        console.log('IDClient ', idPart);
                        _context7.next = 3;
                        return Subsidiary.findById(reqId).populate('part');

                    case 3:
                        request = _context7.sent;
                        part = request.part.find(function (part) {
                            if (part._id == idPart) {
                                part.request = undefined;
                                return idPart;
                            } else return null;
                        });
                        return _context7.abrupt('return', part);

                    case 6:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined);
    }));

    return function getOnePart(_x12, _x13) {
        return _ref7.apply(this, arguments);
    };
}();

module.exports = {
    listAll: listAll,
    getOne: getOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    updateStatus: updateStatus,
    //ticket->request
    addOneRequest: addOneRequest,
    listAllRequest: listAllRequest,
    getOneRequest: getOneRequest,
    //ticket->request->service
    addServiceToRequest: addServiceToRequest,
    getOneService: getOneService,
    //ticket->request->part
    addPartToRequest: addPartToRequest,
    getOnePart: getOnePart

    //ticket->request->service->part

};