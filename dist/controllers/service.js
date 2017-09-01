'use strict';

var _service = require('../models/service');

var _service2 = _interopRequireDefault(_service);

var _part = require('../models/part');

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var listAll = function listAll() {

    return _service2.default.find().then(function (serviceList) {
        return serviceList;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var getOne = function getOne(id) {
    return _service2.default.findById(id).then(function (service) {
        return service;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(service) {
    var newService = new _service2.default(service);

    return newService.save().then(function (service) {
        return service;
    }).catch(function (err) {
        console.log("ClientCtrl ", err);
        var response = {
            message: 'No se pudo agregar el servicio ',
            error: err.message
        };

        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _service2.default.findById(id).then(function (service) {
        if (service === null) {
            var response = {
                message: 'No se pudo eliminar el servico',
                error: 'Servicio con id ' + id + ' no existe'
            };
            return response;
        } else service.remove().then(function (service) {
            return service;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar el service',
            error: 'Servicio con id ' + id + ' no existe'
        };
        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _service2.default.update(byId, query).then(function (service) {
        return service;
    }).catch(function (err) {
        var response = {
            message: "No se pudieron actualizar los datos",
            error: err.message
        };
        return response;
    });
};

var listAllParts = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
        var service;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _service2.default.findById(id).populate('part');

                    case 2:
                        service = _context.sent;
                        return _context.abrupt('return', service.part);

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function listAllParts(_x) {
        return _ref.apply(this, arguments);
    };
}();

var addOnePart = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, info) {
        var newPart, service;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        newPart = new _part2.default(info);
                        _context2.next = 3;
                        return _service2.default.findById(id);

                    case 3:
                        service = _context2.sent;

                        newPart.service = service;

                        _context2.next = 7;
                        return newPart.save();

                    case 7:

                        service.part.push(newPart);

                        _context2.next = 10;
                        return service.save();

                    case 10:
                        return _context2.abrupt('return', newPart);

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function addOnePart(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var getOnePart = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, partId) {
        var service, part;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return _service2.default.findById(id).populate('part');

                    case 2:
                        service = _context3.sent;
                        part = service.part.find(function (part) {

                            if (part._id == partId) return part;else return null;
                        });

                        part.service = undefined;

                        return _context3.abrupt('return', part);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function getOnePart(_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();

var updateOnePart = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, partId) {
        var service, part;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _service2.default.findById(id).populate('part');

                    case 2:
                        service = _context4.sent;
                        part = service.part.find(function (part) {

                            if (part._id == partId) return part;else return null;
                        });
                        return _context4.abrupt('return', part);

                    case 5:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function updateOnePart(_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();

module.exports = {
    addOne: addOne,
    deleteOne: deleteOne,
    getOne: getOne,
    listAll: listAll,
    updateOne: updateOne,
    addOnePart: addOnePart,
    getOnePart: getOnePart,
    listAllParts: listAllParts,
    updateOnePart: updateOnePart

};