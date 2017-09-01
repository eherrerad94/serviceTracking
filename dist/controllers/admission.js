'use strict';

var _admission = require('../models/admission');

var _admission2 = _interopRequireDefault(_admission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {
    return _admission2.default.find().then(function (admissionList) {
        return admissionList;
    }).catch(function (err) {
        return 'Algo salio mal';
    });
};

var getOne = function getOne(id) {
    return _admission2.default.findById(id).then(function (admission) {
        return admission;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(admission) {
    var newAdmission = new _admission2.default(admission);

    return newAdmission.save().then(function (admission) {
        return admission;
    }).catch(function (err) {
        var response = {
            message: 'No se pudo agregar',
            error: err.message
        };

        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _admission2.default.findById(id).then(function (admission) {
        console.log("Delete ", admission);
        if (admission === null) {
            var response = {
                message: 'No se pudo eliminar ',
                error: 'id ' + id + ' no existe'
            };
            return response;
        } else admission.remove().then(function (admission) {
            return admission;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar ',
            error: 'id ' + id + ' no existe'
        };
        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _admission2.default.update(byId, query).then(function (admission) {
        return admission;
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