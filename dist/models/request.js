'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var RequestSchema = new Schema({
    folio: {
        type: String,
        unique: true
    },
    fechaPrometida: {
        type: Date,
        default: Date.now()
    },
    fechaRealizacion: {
        type: Date,
        default: Date.now()
    },
    otraSolicitud: {
        type: Boolean
    },
    estatus: [{
        estatus: { type: String },
        fecha: { type: Date, default: Date.now() }
    }],
    part: [{
        type: Schema.Types.ObjectId,
        ref: 'Part'
    }],
    service: [{
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }],
    ticket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    cantidad: {
        type: Number
    },
    precio: {
        type: Number
    },
    archivoAdjunto: [{
        cotizacion: { type: String }
    }]

});

module.exports = _mongoose2.default.model('Request', RequestSchema);