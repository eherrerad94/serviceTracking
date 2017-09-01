'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _technical = require('../models/technical');

var _technical2 = _interopRequireDefault(_technical);

var _db = require('../config/db');

var _db2 = _interopRequireDefault(_db);

var _upload = require('../config/upload');

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {
    var query = { contrasena: false, __v: false };
    return _technical2.default.find({}, query).then(function (technicalList) {
        return technicalList;
    }).catch(function (err) {
        return 'Algo salio mal';
    });
};
var getOne = function getOne(id) {
    return _technical2.default.findById(id).then(function (technical) {
        console.log(technical);
        return technical;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};
var addOne = function addOne(technicalInfo) {
    var newTechnical = new _technical2.default(technicalInfo);
    newTechnical.contrasena = _bcrypt2.default.hashSync(technicalInfo.contrasena, 10);
    return newTechnical.save().then(function (technicalAgregado) {
        return technicalAgregado;
    }).catch(function (err) {
        var response = {
            message: 'No se pudo agregar el técnico',
            error: err.message
        };

        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _technical2.default.update(byId, query).then(function (technical) {
        return technical;
    }).catch(function (err) {
        var response = {
            message: "No se pudieron actualizar los datos",
            error: err.message
        };
        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _technical2.default.findById(id).then(function (technical) {
        if (technical === null) {
            var response = {
                message: 'No se pudo eliminar el técnico',
                error: 'Técnico con id ' + id + ' no existe'
            };
            return response;
        } else technical.remove().then(function (technical) {
            return technical;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar el técnico',
            error: 'Técnico con id ' + id + ' no existe'
        };
        return response;
    });
};

var iniciar_sesion = function iniciar_sesion(usuario, contrasena) {
    var message = void 0;
    var query = { usuario: usuario };
    return _technical2.default.findOne(query).then(function (technical) {
        if (technical == null) {
            message = 'Autenticación falló, Usuario no encontrado';
            return message;
        } else if (technical) {

            if (!_bcrypt2.default.compareSync(contrasena, technical.contrasena)) {
                message = 'Autenticación falló. Contraseña incorrecta.';
                return message;
            } else {
                technical.cargo = 'Tecnico';
                var technicalInfo = {
                    _id: technical.id,
                    cargo: technical.cargo
                };
                var token = _jsonwebtoken2.default.sign({ user: technicalInfo }, _db2.default.secretKey, { expiresIn: 60 * 60 });
                var response = {
                    message: "Credentiales correctas, toma tu token",
                    token: token
                };
                console.log(_jsonwebtoken2.default.decode(token));

                return response; //response
            } // else
        } //else if
    }) //then
    .catch(function (err) {
        console.log("Error: ", err);
        return message = 'Algo salió mal';
    });
};

module.exports = {
    listAll: listAll,
    getOne: getOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne,
    iniciar_sesion: iniciar_sesion
};