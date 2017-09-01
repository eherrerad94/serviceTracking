'use strict';

var _serviceArea = require('../models/serviceArea');

var _serviceArea2 = _interopRequireDefault(_serviceArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {
    return _serviceArea2.default.find().then(function (serviceAreaList) {
        return serviceAreaList;
    }).catch(function (err) {
        return 'Algo salio mal';
    });
};

var getOne = function getOne(id) {
    return _serviceArea2.default.findById(id).then(function (serviceArea) {
        return serviceArea;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(serviceArea) {
    var newServiceArea = new _serviceArea2.default(serviceArea);

    return newServiceArea.save().then(function (serviceArea) {
        console.log(serviceArea);
        return serviceArea;
    }).catch(function (err) {
        var response = {
            message: 'No se pudo agregar el jefe',
            error: err.message
        };

        return response;
        // return 'Something went wrong';
    });
};

var deleteOne = function deleteOne(id) {
    return _serviceArea2.default.findById(id).then(function (serviceArea) {
        console.log("Delete ", serviceArea);
        if (serviceArea === null) {
            var response = {
                message: 'No se pudo eliminar el jefe',
                error: 'Jefe con id ' + id + ' no existe'
            };
            return response;
        } else serviceArea.remove().then(function (serviceArea) {
            return serviceArea;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar el jefe',
            error: 'Jefe con id ' + id + ' no existe'
        };
        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _serviceArea2.default.update(byId, query).then(function (serviceArea) {
        return serviceArea;
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