'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var PrioritySchema = new Schema({
    // codigo: { type: String, unique: true, required: true },
    nombre: { type: String, required: true }

}, {
    versionKey: false
});

module.exports = _mongoose2.default.model('Priority', PrioritySchema);