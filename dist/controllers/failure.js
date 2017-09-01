'use strict';

var _failure = require('../models/failure');

var _failure2 = _interopRequireDefault(_failure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {

    return _failure2.default.find().then(function (failureList) {
        return failureList;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var getOne = function getOne(id) {
    return _failure2.default.findById(id).then(function (failure) {
        return failure;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(failure) {
    var newFailure = new _failure2.default(failure);

    return newFailure.save().then(function (failure) {
        return failure;
    }).catch(function (err) {
        var response = {
            message: 'No se pudo agregar la falla ',
            error: err.message
        };
        return failure;
    });
};

var updateOne = function updateOne(id, newInfo) {
    var byId = { _id: id };
    var query = { $set: newInfo };

    return _failure2.default.update(byId, query).then(function (failure) {
        return failure;
    }).catch(function (err) {
        var response = {
            message: "No se pudieron actualizar los datos",
            error: err.message
        };
        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _failure2.default.fin(id).then(function (failure) {
        if (failure === null) {
            var response = {
                message: 'No se pudo eliminar la falla',
                error: 'Falla  con id ' + id + ' no existe'
            };
            return failure;
        } else failure.remove().then(function (failure) {
            return failure;
        }).catch(function (err) {
            return "Error";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar la falla',
            error: 'Falla con id ' + id + ' no existe'
        };
        return failure;
    });
};

module.exports = {
    listAll: listAll,
    getOne: getOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne
};