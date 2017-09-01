'use strict';

var _priority = require('../models/priority');

var _priority2 = _interopRequireDefault(_priority);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {
    return _priority2.default.find().then(function (priorityList) {
        return priorityList;
    }).catch(function (err) {
        return 'Algo salio mal';
    });
};

var getOne = function getOne(id) {
    return _priority2.default.findById(id).then(function (priority) {
        return priority;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(priority) {
    var newPriority = new _priority2.default(priority);

    return newPriority.save().then(function (priority) {
        console.log(priority);
        return priority;
    }).catch(function (err) {
        var response = {
            message: 'No se pudo agregar la prioridad',
            error: err.message
        };

        return response;
        // return 'Something went wrong';
    });
};

var deleteOne = function deleteOne(id) {
    return _priority2.default.findById(id).then(function (priority) {
        console.log("Delete ", priority);
        if (priority === null) {
            var response = {
                message: 'No se pudo eliminar la prioridad',
                error: 'Prioridad con id ' + id + ' no existe'
            };
            return response;
        } else priority.remove().then(function (priority) {
            return priority;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar la prioridad',
            error: 'Prioridad con id ' + id + ' no existe'
        };
        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _priority2.default.update(byId, query).then(function (priority) {
        return priority;
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