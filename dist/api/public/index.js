'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../../config/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API_ADMIN = '/api/v1/public';

var router = _express2.default.Router();

router.use(_auth2.default.authorization);

//Crear tecnico
//Crear cliente
//Crear programador
//Crear tablas listas


router.get(API_ADMIN, function (req, res) {
    res.send('API for Client user');
});

module.exports = router;