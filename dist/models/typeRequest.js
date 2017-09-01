'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var typeRequestSchema = new Schema({
    tipo: { type: String },
    idSolicitud: { type: String },
    idParte: { type: String },
    idParteYServicio: { type: String }
}, {
    versionKey: false
});

module.exports = _mongoose2.default.model('TypeRequest', typeRequestSchema);