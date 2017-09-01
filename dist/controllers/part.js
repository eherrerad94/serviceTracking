'use strict';

var _part = require('../models/part');

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {

    return _part2.default.find().then(function (partList) {
        return partList;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var getOne = function getOne(id) {
    return _part2.default.findById(id).then(function (part) {
        return part;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(part) {
    var newPart = new _part2.default(part);

    return newPart.save().then(function (part) {
        console.log("partCtrl then", part);
        return part;
    }).catch(function (err) {
        console.log("PartCtrl ", err);
        var response = {
            message: 'No se pudo agregar la parte',
            error: err.message
        };

        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _part2.default.update(byId, query).then(function (part) {
        return part;
    }).catch(function (err) {
        var response = {
            message: "No se pudieron actualizar los datos de la parte",
            error: err.message
        };
        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _part2.default.findById(id).then(function (part) {
        console.log("Delete ", part);
        if (part === null) {
            var response = {
                message: 'No se pudo eliminar la parte',
                error: 'Parte con id ' + id + ' no existe'
            };
            return response;
        } else part.remove().then(function (part) {
            return part;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar la parte',
            error: 'Parte con id ' + id + ' no existe'
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