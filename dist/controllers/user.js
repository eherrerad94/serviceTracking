'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _db = require('../config/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registro = function registro(usuarioInfo) {
    var nuevoUsuario = new _user2.default(usuarioInfo);
    nuevoUsuario.contrasena = _bcrypt2.default.hashSync(usuarioInfo.contrasena, 10);
    nuevoUsuario.estatus = "Activo";
    return nuevoUsuario.save().then(function (usuarioAgregado) {
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
var iniciar_sesion = function iniciar_sesion(usuario, contrasena) {
    var message = void 0;
    var query = { usuario: usuario };
    return _user2.default.findOne(query).then(function (user) {
        if (user == null) {
            message = 'Autenticación falló, Usuario no encontrado';
            return message;
        } else if (user) {

            if (!_bcrypt2.default.compareSync(contrasena, user.contrasena)) {
                message = 'Autenticación falló. Contraseña incorrecta.';
                return message;
            } else {
                var userInfo = {
                    _id: user.id,
                    cargo: user.cargo
                };
                // userInfo.contrasena = undefined;
                // userInfo.created = undefined;
                // userInfo.estatus = undefined;
                var token = _jsonwebtoken2.default.sign({ user: userInfo }, _db2.default.secretKey, { expiresIn: 60 * 60 * 8 });
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

var obtener_usuario = function obtener_usuario(id) {
    return _user2.default.findById(id).then(function (user) {
        return user;
    }).catch(function (err) {
        return err;
    });
};

var listAll = function listAll(valor) {

    return _user2.default.find({ cargo: valor }).then(function (programmerList) {
        return programmerList;
    }).catch(function (err) {
        return err;
    });
};

var getOne = function getOne(id) {

    _user2.default.findById(id).then(function (programmer) {
        return programmer;
    }).catch(function (err) {
        return err;
    });
};
module.exports = {
    registro: registro,
    iniciar_sesion: iniciar_sesion,
    obtener_usuario: obtener_usuario,
    listAll: listAll,
    getOne: getOne

};