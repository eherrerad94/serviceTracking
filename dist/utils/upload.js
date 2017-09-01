'use strict';

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var destino = function destino(req, file, callback) {
    callback(null, './');
};
var filename = function filename(req, file, callback) {
    var urlpath = file.fieldname + '-' + Date.now();
    req.body.miUrl = urlpath;
    callback(null, urlpath);
};
var storage = _multer2.default.diskStorage({
    destination: destino,
    filename: filename
});

var upload = (0, _multer2.default)({ storage: storage }).single('userPhoto');

module.exports = { upload: upload };