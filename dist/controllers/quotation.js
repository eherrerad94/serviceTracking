'use strict';

var _quotation = require('../models/quotation');

var _quotation2 = _interopRequireDefault(_quotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {
    return _quotation2.default.find().then(function (quotationList) {
        return quotationList;
    }).catch(function (err) {
        return 'Algo salio mal';
    });
};

var getOne = function getOne(id) {
    return _quotation2.default.findById(id).then(function (quotation) {
        return quotation;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(quotation) {
    var newQuotation = new _quotation2.default(quotation);

    return newQuotation.save().then(function (quotation) {
        console.log(quotation);
        return quotation;
    }).catch(function (err) {
        var response = {
            message: 'No se pudo agregar la cotizacion',
            error: err.message
        };

        return response;
        // return 'Something went wrong';
    });
};

var deleteOne = function deleteOne(id) {
    return _quotation2.default.findById(id).then(function (quotation) {
        console.log("Delete ", quotation);
        if (quotation === null) {
            var response = {
                message: 'No se pudo eliminar la cotizacio ',
                error: 'Cotizacion con id ' + id + ' no existe'
            };
            return response;
        } else quotation.remove().then(function (quotation) {
            return quotation;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar la cotizacion',
            error: 'Cotizacion con id ' + id + ' no existe'
        };
        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _quotation2.default.update(byId, query).then(function (quotation) {
        return quotation;
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