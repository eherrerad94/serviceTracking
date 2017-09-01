'use strict';

var _typeEquipment = require('../models/typeEquipment');

var _typeEquipment2 = _interopRequireDefault(_typeEquipment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {
    return _typeEquipment2.default.find().populate('categoria').then(function (TypeEquipmentList) {

        return TypeEquipmentList;
    }).catch(function (err) {
        return 'Algo salio mal';
    });
};

var getOne = function getOne(id) {
    return _typeEquipment2.default.findById(id).populate('categoria').then(function (typeEquipment) {
        return typeEquipment;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(typeEquipment) {
    var newTypeEquipment = new _typeEquipment2.default(typeEquipment);

    return newTypeEquipment.save().then(function (typeEquipment) {
        return typeEquipment;
    }).catch(function (err) {
        var response = {
            message: 'No se pudo agregar el tipo de equipo',
            error: err.message
        };

        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _typeEquipment2.default.findById(id).then(function (typeEquipment) {
        if (typeEquipment === null) {
            var response = {
                message: 'No se pudo eliminar el tipo de equipo',
                error: 'Tipo de equipo con id ' + id + ' no existe'
            };
            return response;
        } else typeEquipment.remove().then(function (typeEquipment) {
            return typeEquipment;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar el tipo de equipo',
            error: 'Tipo de equipo con id ' + id + ' no existe'
        };
        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _typeEquipment2.default.update(byId, query).then(function (typeEquipment) {
        return typeEquipment;
    }).catch(function (err) {
        var response = {
            message: "No se pudieron actualizar los datos",
            error: err.message
        };
        return response;
    });
};

module.exports = {
    listAll: listAll,
    getOne: getOne,
    addOne: addOne,
    deleteOne: deleteOne,
    updateOne: updateOne
};