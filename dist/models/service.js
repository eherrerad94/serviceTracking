'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ServiceSchema = new Schema({
    folio: {
        type: String,
        required: true
    },
    precio: {
        type: Number
    },
    divisa: {
        type: String
    },
    horaInicial: {
        type: Date,
        required: true,
        default: Date.now()
    },
    horaFinal: {
        type: Date,
        required: true,
        default: Date.now()
    },
    tiempoServicio: {
        type: Number,
        required: true
    },
    tiempoTraslado: {
        type: Number
    },
    equipoTrabajando: {
        type: Boolean,
        required: true,
        default: false
    },
    otroServicio: {
        type: Boolean,
        required: true,
        default: false
    },
    request: { //pertenece a
        type: Schema.Types.ObjectId,
        ref: 'Request'
    },
    part: [{ // tiene 
        type: Schema.Types.ObjectId,
        ref: 'Part'
    }],
    tecnico: { //quien lo realiza
        type: Schema.Types.ObjectId,
        ref: 'Technical'
    },
    created: { type: Date, default: Date.now() }
}, {
    versionKey: false
});

module.exports = _mongoose2.default.model('Service', ServiceSchema);