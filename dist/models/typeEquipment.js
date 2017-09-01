'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var typeEquipmentSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {
    versionKey: false
});

module.exports = _mongoose2.default.model('TypeEquipment', typeEquipmentSchema);