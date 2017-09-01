"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var UserSchema = new Schema({
    clave: { type: String, required: true },
    usuario: { type: String, unique: true, required: true },
    contrasena: { type: String, required: true },
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    telefono: {
        type: String,
        validate: {
            validator: function validator(telephone) {
                return (/\d{3}-\d{3}-\d{4}/.test(telephone)
                );
            },
            message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']

    },
    correo_electronico: {
        type: String,
        unique: true,
        validate: {
            validator: function validator(email) {
                return (/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)
                );
            },
            message: '{VALUE} is not a valid email address!'

        },
        required: [true, 'Email address required']
    },
    zona: {
        type: String,
        // enum: ["Norte", "Bajío", "Centro-Sur"], 
        required: true
    },
    cargo: {
        type: String
    },
    estatus: {
        type: String
        // required: true,
        // enum: ["Activo", "Inactivo"]
    },
    created: { type: Date, default: Date.now() }
}, {
    versionKey: false
});

UserSchema.methods.comparePassword = function (password) {
    return _bcrypt2.default.compareSync(password, undefined.contrasena);
};

module.exports = _mongoose2.default.model('Usuario', UserSchema);