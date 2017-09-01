'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var vehicleSchema = new Schema({
    placas: { type: String },
    marcaVehiculos: { type: String },
    numSerieVehiculos: { type: String },
    numPolizaSeguro: { type: String },
    polizaSeguro: { type: String },
    kilometraje: { type: Number }
}, {
    versionKey: false
});

module.exports = _mongoose2.default.model('Vehicle', vehicleSchema);