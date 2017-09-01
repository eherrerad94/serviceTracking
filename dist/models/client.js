'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ClientSchema = new Schema({

    usuario: { type: String, unique: true },
    contrasena: { type: String },
    nombre: { type: String },
    apellidos: { type: String },
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
        validate: {
            validator: function validator(email) {
                return (/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)
                );
            },
            message: '{VALUE} is not a valid email address!'

        },
        required: [true, 'Email address required']
    },
    puesto: { type: String },
    departamento: { type: String },
    subsidiary: {
        type: Schema.Types.ObjectId,
        ref: 'Subsidiary'
    }

}, {
    versionKey: false
});

module.exports = _mongoose2.default.model('Client', ClientSchema);