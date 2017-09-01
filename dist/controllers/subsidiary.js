'use strict';

var _subsidiary = require('../models/subsidiary');

var _subsidiary2 = _interopRequireDefault(_subsidiary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {

    return _subsidiary2.default.find().then(function (subsidiaryList) {
        return subsidiaryList;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var getOne = function getOne(id) {
    return _subsidiary2.default.findById(id).then(function (subsidiary) {
        return subsidiary;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(subsidiary) {
    var newSubsidiary = new _subsidiary2.default(subsidiary);

    return newSubsidiary.save().then(function (subsidiary) {
        console.log("subsidiaryCtrl then", subsidiary);
        return subsidiary;
    }).catch(function (err) {
        console.log("SubsidiaryCtrl ", err);
        var response = {
            message: 'No se pudo agregar la sucursal',
            error: err.message
        };

        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _subsidiary2.default.update(byId, query).then(function (subsidiary) {
        return subsidiary;
    }).catch(function (err) {
        var response = {
            message: "No se pudieron actualizar los datos de la sucursal",
            error: err.message
        };
        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _subsidiary2.default.findById(id).then(function (subsidiary) {
        console.log("Delete ", subsidiary);
        if (subsidiary === null) {
            var response = {
                message: 'No se pudo eliminar la sucursal',
                error: 'Sucursal con id ' + id + ' no existe'
            };
            return response;
        } else subsidiary.remove().then(function (subsidiary) {
            return subsidiary;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar la sucursal',
            error: 'Sucursal con id ' + id + ' no existe'
        };
        return response;
    });
};

module.exports = {
    listAll: listAll,
    getOne: getOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne
};