'use strict';

var _category = require('../models/category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var listAll = function listAll() {
    return _category2.default.find().then(function (CategoryList) {
        return CategoryList;
    }).catch(function (err) {
        return 'Algo salio mal';
    });
};

var getOne = function getOne(id) {
    return _category2.default.findById(id).then(function (category) {
        return category;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(category) {
    var newCategory = new _category2.default(category);

    return newCategory.save().then(function (category) {
        return category;
    }).catch(function (err) {
        var response = {
            message: 'No se pudo agregar la categoria',
            error: err.message
        };

        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _category2.default.findById(id).then(function (category) {
        if (category === null) {
            var response = {
                message: 'No se pudo eliminar la categoria',
                error: 'Categoria con id ' + id + ' no existe'
            };
            return response;
        } else category.remove().then(function (category) {
            return category;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar la categoria',
            error: 'Categoria con id ' + id + ' no existe'
        };
        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _category2.default.update(byId, query).then(function (category) {
        return category;
    }).catch(function (err) {
        var response = {
            message: "No se pudieron actualizar los datos",
            error: err.message
        };
        return response;
    });
};

var addTypeEquipment = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, info) {
        var newTypeEquipment, Category;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        newTypeEquipment = new TypeEquipment(info);
                        _context.next = 3;
                        return Category.findById(id);

                    case 3:
                        Category = _context.sent;

                        //al nuevo subsidaria se le agrega la compania
                        Category.newTypeEquipment = newTypeEquipment;

                        //se guarda nueva subsidiarioa
                        _context.next = 7;
                        return newTypeEquipment.save();

                    case 7:

                        //al ticket ya creado se agrega la nueva subsidiaria
                        Category.typeEquipments.push(newTypeEquipment);

                        _context.next = 10;
                        return Category.save();

                    case 10:
                        return _context.abrupt('return', newTypeEquipment);

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function addTypeEquipment(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

module.exports = {
    listAll: listAll,
    getOne: getOne,
    addOne: addOne,
    deleteOne: deleteOne,
    updateOne: updateOne
};