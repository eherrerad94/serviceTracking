'use strict';

var _equipment = require('../models/equipment');

var _equipment2 = _interopRequireDefault(_equipment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {
    return _equipment2.default.find().populate({
        path: 'tipoEquipo',
        populate: { path: 'categoria' }
    }).then(function (EquipmentList) {
        return EquipmentList;
    }).catch(function (err) {
        return 'Algo salio mal';
    });
};

var getOne = function getOne(id) {
    return _equipment2.default.findById(id).populate('tipoEquipo').populate('categoria').then(function (equipment) {
        return equipment;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(equipment) {
    var newEquipment = new _equipment2.default(equipment);

    return newEquipment.save().then(function (equipment) {
        return equipment;
    }).catch(function (err) {
        var response = {
            message: 'No se pudo agregar el equipo',
            error: err.message
        };

        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _equipment2.default.findById(id).then(function (equipment) {
        if (equipment === null) {
            var response = {
                message: 'No se pudo eliminar el equipo',
                error: 'Equipo con id ' + id + ' no existe'
            };
            return response;
        } else equipment.remove().then(function (equipment) {
            return equipment;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar el equipo',
            error: 'Equipo con id ' + id + ' no existe'
        };
        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _equipment2.default.update(byId, query).then(function (equipment) {
        return equipment;
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