'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var technicalSchema = new Schema({
    clave: { type: String, unique: true },
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
    fotografia: { type: String },
    numeroSeguroSocial: { type: String, unique: true },
    vehiculo: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    jefe: {
        type: Schema.Types.ObjectId,
        ref: 'Boss'
    },
    estatus: { type: String },
    created: { type: Date, default: Date.now() }
}, {
    versionKey: false
});

module.exports = _mongoose2.default.model('Technical', technicalSchema);