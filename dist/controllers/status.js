'use strict';

var _status = require('../models/status');

var _status2 = _interopRequireDefault(_status);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {
    return _status2.default.find().then(function (statusList) {
        return statusList;
    }).catch(function (err) {
        return 'Algo salio mal';
    });
};

var getOne = function getOne(id) {
    return _status2.default.findById(id).then(function (status) {
        return status;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(status) {
    var newStatus = new _status2.default(status);

    return newStatus.save().then(function (status) {
        console.log(status);
        return status;
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
    return _status2.default.findById(id).then(function (status) {
        console.log("Delete ", status);
        if (status === null) {
            var response = {
                message: 'No se pudo eliminar el jefe',
                error: 'Jefe con id ' + id + ' no existe'
            };
            return response;
        } else status.remove().then(function (status) {
            return status;
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
    return _status2.default.update(byId, query).then(function (status) {
        return status;
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