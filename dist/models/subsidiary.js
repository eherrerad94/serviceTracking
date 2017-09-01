'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var SubsidiarySchema = new Schema({
    nombre: { type: String, required: true },
    pais: { type: String, required: true },
    estado: { type: String, required: true },
    codigoPostal: { type: Number, required: true },
    colonia: { type: String, required: true },
    calle: { type: String, required: true },
    numero: { type: Number, required: true },
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
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    clients: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }],
    estatus: {
        type: String, default: 'Activo'
    },
    creado: { type: Date, default: Date.now() }
}, {
    versionKey: false
});

module.exports = _mongoose2.default.model('Subsidiary', SubsidiarySchema);