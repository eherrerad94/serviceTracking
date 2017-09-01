'use strict';

var _client = require('../models/client');

var _client2 = _interopRequireDefault(_client);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _db = require('../config/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {

    return _client2.default.find().then(function (clientList) {
        return clientList;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var registro = function registro(usuarioInfo) {
    var nuevoCliente = new _client2.default(usuarioInfo);
    nuevoCliente.contrasena = _bcrypt2.default.hashSync(usuarioInfo.contrasena, 10);
    return nuevoCliente.save().then(function (usuarioAgregado) {
        console.log(usuarioAgregado);
        return usuarioAgregado;
    }).catch(function (err) {
        var response = {
            message: 'No se pudo agregar el usuario',
            error: err.message
        };
        console.log("UserCtrl err: ", err);

        return response;
    });
};
var getOne = function getOne(id) {
    return _client2.default.findById(id).populate({ path: 'subsidiary', select: '-clients' }).then(function (client) {
        return client;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(client) {
    var newClient = new _client2.default(client);

    return newClient.save().then(function (client) {
        console.log("clientCtrl then", client);
        return client;
    }).catch(function (err) {
        console.log("ClientCtrl ", err);
        var response = {
            message: 'No se pudo agregar el cliente',
            error: err.message
        };

        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return Client.update(byId, query).then(function (client) {
        return client;
    }).catch(function (err) {
        var response = {
            message: "No se pudieron actualizar los datos",
            error: err.message
        };
        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return Client.findById(id).then(function (client) {
        console.log("Delete ", client);
        if (client === null) {
            var response = {
                message: 'No se pudo eliminar al cliente',
                error: 'Cliente con id ' + id + ' no existe'
            };
            return response;
        } else client.remove().then(function (client) {
            return client;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar al cliente',
            error: 'Cliente con id ' + id + ' no existe'
        };
        return response;
    });
};

var iniciar_sesion = function iniciar_sesion(usuario, contrasena) {
    var message = void 0;
    var query = { usuario: usuario };
    return _client2.default.findOne(query).then(function (client) {
        if (client == null) {
            message = 'Autenticación falló, Cliente no encontrado';
            return message;
        } else if (client) {

            if (!_bcrypt2.default.compareSync(contrasena, client.contrasena)) {
                message = 'Autenticación falló. Contraseña incorrecta.';
                return message;
            } else {
                var clientInfo = {
                    _id: client.id,
                    cargo: client.cargo
                };
                var token = _jsonwebtoken2.default.sign({ user: clientInfo }, _db2.default.secretKey, { expiresIn: 60 * 60 * 8 });
                var response = {
                    message: "Credentiales correctas, toma tu token",
                    token: token
                };
                console.log("Token ", _jsonwebtoken2.default.decode(token));

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
    iniciar_sesion: iniciar_sesion,
    registro: registro
};