'use strict';

var CRUD = function CRUD(Model) {
    var listAll = function listAll() {
        return Model.find().then(function (ModelList) {
            return ModelList;
        }).catch(function (err) {
            return 'Algo salio mal';
        });
    };

    var getOne = function getOne(id) {
        return Model.findById(id).then(function (model) {
            return model;
        }).catch(function (err) {
            return 'Something went wrong';
        });
    };

    var addOne = function addOne(model) {
        var newModel = new Model(model);

        return newModel.save().then(function (model) {
            console.log(model);
            return model;
        }).catch(function (err) {
            var response = {
                message: 'No se pudo agregar',
                error: err.message
            };
            return response;
        });
    };

    var deleteOne = function deleteOne(id) {
        return Model.findById(id).then(function (model) {
            if (model === null) {
                var response = {
                    message: 'No se pudo eliminar',
                    error: 'No existe'
                };
                return response;
            } else model.remove().then(function (model) {
                return model;
            }).catch(function (err) {
                return "no se pudo";
            });
        }).catch(function (err) {
            var response = {
                message: 'No se pudo eliminar',
                error: 'No existe'
            };
            return response;
        });
    };

    var updateOne = function updateOne(id, newInfo) {

        var byId = { _id: id };
        var query = { $set: newInfo };
        return Model.update(byId, query).then(function (model) {
            return model;
        }).catch(function (err) {
            var response = {
                message: "No se pudieron actualizar los datos",
                error: err.message
            };
            return response;
        });
    };
};
module.exports = CRUD;