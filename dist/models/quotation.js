'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var quotationSchema = new Schema({
    cotizacion: {
        type: String
    },
    precio: {
        type: Number
    },
    cantidad: {
        type: Number
    },
    divisas: {
        type: String
    },
    estatusCotizacion: [{
        estatus: {
            type: String,
            required: true
        },
        fecha: {
            type: Date,
            default: Date.now()
        },
        default: []

    }],
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    part: {
        type: Schema.Types.ObjectId,
        ref: 'Part'
    }
}, {
    versionKey: false
});

module.exports = _mongoose2.default.model('Quotation', quotationSchema);