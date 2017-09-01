'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var diarySchema = new Schema({
    hora: { type: Date },
    cantidadMediasHoras: { type: Number },
    idTecnico: { type: String }
}, {
    versionKey: false

});

module.exports = _mongoose2.default.model('Diary', diarySchema);