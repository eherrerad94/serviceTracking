'use strict';

var _vehicle = require('../models/vehicle');

var _vehicle2 = _interopRequireDefault(_vehicle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {
    return _vehicle2.default.find().then(function (vehicleList) {
        return vehicleList;
    }).catch(function (err) {
        return 'Algo salio mal';
    });
};

var getOne = function getOne(id) {
    return _vehicle2.default.findById(id).then(function (vehicle) {
        return vehicle;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(vehicle) {
    var newVehicle = new _vehicle2.default(vehicle);

    return newVehicle.save().then(function (vehicle) {
        console.log(vehicle);
        return vehicle;
    }).catch(function (err) {
        var response = {
            message: 'No se pudo agregar el vehiculo',
            error: err.message
        };

        return response;
        // return 'Something went wrong';
    });
};

var deleteOne = function deleteOne(id) {
    return _vehicle2.default.findById(id).then(function (vehicle) {
        console.log("Delete ", vehicle);
        if (vehicle === null) {
            var response = {
                message: 'No se pudo eliminar el vechiculo',
                error: 'Vehiculo con id ' + id + ' no existe'
            };
            return response;
        } else vehicle.remove().then(function (vehicle) {
            return vehicle;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar el vehiculo',
            error: 'Vehiculo con id ' + id + ' no existe'
        };
        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _vehicle2.default.update(byId, query).then(function (vehicle) {
        return vehicle;
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