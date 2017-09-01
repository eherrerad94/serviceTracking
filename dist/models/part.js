'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var PartSchema = new Schema({
    clave: {
        type: String,
        required: true
    },
    descripcipon: {
        type: String
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    folio: {
        type: Number,
        required: true
    },
    instalada: {
        type: Boolean
    },
    masPartes: {
        type: Boolean
    },
    request: {
        type: Schema.Types.ObjectId,
        ref: 'Request'
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    archivoAdjunto: [{ url: { type: String } }]
}, {
    versionKey: false

});

module.exports = _mongoose2.default.model('Part', PartSchema);