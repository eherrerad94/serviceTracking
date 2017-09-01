'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  key: _fs2.default.readFileSync(_path2.default.resolve('src/private.key')),
  cert: _fs2.default.readFileSync(_path2.default.resolve('src/public.crt'))
};

module.exports = { options: options };

//openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
//openssl rsa -in key.pem -out newkey.pem && mv newkey.pem key.pem