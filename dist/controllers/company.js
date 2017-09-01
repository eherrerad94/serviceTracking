'use strict';

var _company = require('../models/company');

var _company2 = _interopRequireDefault(_company);

var _subsidiary = require('../models/subsidiary');

var _subsidiary2 = _interopRequireDefault(_subsidiary);

var _client = require('../models/client');

var _client2 = _interopRequireDefault(_client);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var listAll = function listAll() {

    return _company2.default.find().then(function (companyList) {
        return companyList;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var getOne = function getOne(id) {
    return _company2.default.findById(id).then(function (company) {
        return company;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(company) {
    var newCompany = new _company2.default(company);

    return newCompany.save().then(function (company) {
        return company;
    }).catch(function (err) {
        console.log("ClientCtrl ", err);
        var response = {
            message: 'No se pudo agregar la empresa ',
            error: err.message
        };

        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _company2.default.findById(id).then(function (company) {
        if (company === null) {
            var response = {
                message: 'No se pudo eliminar la compañia',
                error: 'Empresa con id ' + id + ' no existe'
            };
            return response;
        } else company.remove().then(function (company) {
            return company;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar el compañia',
            error: 'Empresa con id ' + id + ' no existe'
        };
        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _company2.default.update(byId, query).then(function (company) {
        return company;
    }).catch(function (err) {
        var response = {
            message: "No se pudieron actualizar los datos",
            error: err.message
        };
        return response;
    });
};

var listAllSubsidiaries = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
        var company;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _company2.default.findById(id).populate('subsidiaries');

                    case 2:
                        company = _context.sent;

                        // company.subsidiaries.company = undefined;
                        console.log("Populate: ", company);
                        return _context.abrupt('return', company.subsidiaries);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function listAllSubsidiaries(_x) {
        return _ref.apply(this, arguments);
    };
}();

var addOneSubsidiary = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, info) {
        var newSubsidiary, company;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        newSubsidiary = new _subsidiary2.default(info);
                        _context2.next = 3;
                        return _company2.default.findById(id);

                    case 3:
                        company = _context2.sent;

                        //al nuevo subsidaria se le agrega la compania
                        newSubsidiary.company = company;

                        //se guarda nueva subsidiarioa
                        _context2.next = 7;
                        return newSubsidiary.save();

                    case 7:

                        //al ticket ya creado se agrega la nueva subsidiaria
                        company.subsidiaries.push(newSubsidiary);

                        console.log("Company ", company);
                        _context2.next = 11;
                        return company.save();

                    case 11:
                        return _context2.abrupt('return', newSubsidiary);

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function addOneSubsidiary(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var addClientToSubsidiary = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(info, subsidiary) {
        var newClient;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:

                        info.contrasena = _bcrypt2.default.hashSync(info.contrasena, 10);
                        //se crea el cliuente
                        newClient = new _client2.default(info);
                        //al nuevo cliente se le vincula la sucursal

                        newClient.subsidiary = subsidiary;

                        console.log(newClient);
                        _context3.next = 6;
                        return newClient.save();

                    case 6:
                        subsidiary.clients.push(newClient);

                        _context3.next = 9;
                        return subsidiary.save();

                    case 9:
                        return _context3.abrupt('return', newClient);

                    case 10:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function addClientToSubsidiary(_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();

var getOneSubsidiary = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, subid) {
        var company, subsidiary;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _company2.default.findById(id).populate('subsidiaries');

                    case 2:
                        company = _context4.sent;
                        subsidiary = company.subsidiaries.find(function (sub) {

                            if (sub._id == subid) return sub;else return null;
                        });

                        subsidiary.company = undefined;

                        return _context4.abrupt('return', subsidiary);

                    case 6:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function getOneSubsidiary(_x6, _x7) {
        return _ref4.apply(this, arguments);
    };
}();

var updateOneSubsidiary = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id, subid) {
        var company, subsidiary;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return _company2.default.findById(id).populate('subsidiaries');

                    case 2:
                        company = _context5.sent;
                        subsidiary = company.subsidiaries.find(function (sub) {

                            if (sub._id == subid) return sub;else return null;
                        });
                        return _context5.abrupt('return', subsidiary);

                    case 5:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function updateOneSubsidiary(_x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}();

var getOneClient = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(subId, idClient) {
        var subsidiary, client;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:

                        console.log('IDClient ', idClient);
                        _context6.next = 3;
                        return _subsidiary2.default.findById(subId).populate('clients');

                    case 3:
                        subsidiary = _context6.sent;
                        client = subsidiary.clients.find(function (client) {
                            if (client._id == idClient) {
                                client.contrasena = undefined;
                                client.subsidiary = undefined;
                                return idClient;
                            } else return null;
                        });

                        // client.clients = undefined;

                        return _context6.abrupt('return', client);

                    case 6:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined);
    }));

    return function getOneClient(_x10, _x11) {
        return _ref6.apply(this, arguments);
    };
}();

module.exports = {
    //company
    listAll: listAll,
    getOne: getOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    //company/sucursal
    addOneSubsidiary: addOneSubsidiary,
    listAllSubsidiaries: listAllSubsidiaries,
    getOneSubsidiary: getOneSubsidiary,
    //companu/sucursal/cliente
    addClientToSubsidiary: addClientToSubsidiary,
    getOneClient: getOneClient

};