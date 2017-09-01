'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var equipmentSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    tipoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'TypeEquipment',
        required: true
    }
}, {
    versionKey: false

});

module.exports = _mongoose2.default.model('Equipment', equipmentSchema);