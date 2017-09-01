'use strict';

var _boss = require('../models/boss');

var _boss2 = _interopRequireDefault(_boss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {
    return _boss2.default.find().then(function (bossList) {
        return bossList;
    }).catch(function (err) {
        return 'Algo salio mal';
    });
};

var getOne = function getOne(id) {
    return _boss2.default.findById(id).then(function (boss) {
        return boss;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(boss) {
    var newBoss = new _boss2.default(boss);

    return newBoss.save().then(function (boss) {
        console.log(boss);
        return boss;
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
    return _boss2.default.findById(id).then(function (boss) {
        console.log("Delete ", boss);
        if (boss === null) {
            var response = {
                message: 'No se pudo eliminar el jefe',
                error: 'Jefe con id ' + id + ' no existe'
            };
            return response;
        } else boss.remove().then(function (boss) {
            return boss;
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
    return _boss2.default.update(byId, query).then(function (boss) {
        return boss;
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