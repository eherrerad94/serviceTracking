'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CompanySchema = new Schema({
    razon_social: { type: String, unique: true, required: true },
    rfc: { type: String, required: true },
    pais: { type: String },
    estado: { type: String },
    codigo_postal: { type: Number },
    colonia: { type: String },
    calle: { type: String },
    precio_especial_partes: { type: Number },
    subsidiaries: [{
        type: Schema.Types.ObjectId,
        ref: 'Subsidiary'
    }],
    creado: { type: Date, default: Date.now() }
}, {
    versionKey: false

});

module.exports = _mongoose2.default.model('Company', CompanySchema);