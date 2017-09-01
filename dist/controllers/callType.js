'use strict';

var _callType = require('../models/callType');

var _callType2 = _interopRequireDefault(_callType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {
    return _callType2.default.find().then(function (callTypeList) {
        return callTypeList;
    }).catch(function (err) {
        return 'Algo salio mal';
    });
};

var getOne = function getOne(id) {
    return _callType2.default.findById(id).then(function (callType) {
        return callType;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(callType) {
    var newCallType = new _callType2.default(callType);

    return newCallType.save().then(function (callType) {
        console.log(callType);
        return callType;
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
    return _callType2.default.findById(id).then(function (callType) {
        console.log("Delete ", callType);
        if (callType === null) {
            var response = {
                message: 'No se pudo eliminar el jefe',
                error: 'Jefe con id ' + id + ' no existe'
            };
            return response;
        } else callType.remove().then(function (callType) {
            return callType;
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
    return _callType2.default.update(byId, query).then(function (callType) {
        return callType;
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