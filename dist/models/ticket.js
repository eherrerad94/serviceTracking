'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var TicketSchema = new Schema({
    folio: {
        type: String,
        unique: true
    },
    reporte: {
        type: String
    },
    creacionAutomatica: {
        type: Date,
        default: Date.now()
    },
    creacionManual: {
        type: Date,
        default: Date.now()
    },
    horometro: {
        type: Number
    },
    comentarios: {
        type: String
    },
    codigoFalla: {
        type: Schema.Types.ObjectId,
        ref: 'Failure'
    },
    prioridad: {
        type: Schema.Types.ObjectId,
        ref: 'Priority'
    },
    areaServicio: {
        type: Schema.Types.ObjectId,
        ref: 'ServiceArea'
    },
    tipoLlamado: {
        type: Schema.Types.ObjectId,
        ref: 'CallType'
    },
    tipoAlta: {
        type: Schema.Types.ObjectId,
        ref: 'Admission'
    },
    solicitud: {
        type: Schema.Types.ObjectId,
        ref: 'Request'
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    archivoAdjunto: [{ imagen: { type: String } }],
    estatus: [{
        estatus: { type: String },
        fecha: { type: Date, default: Date.now() }
    }]
}, {
    versionKey: false
});

module.exports = _mongoose2.default.model('Ticket', TicketSchema);