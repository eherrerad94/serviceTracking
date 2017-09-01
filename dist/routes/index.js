'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../config/auth');

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _subsidiary = require('./subsidiary');

var _subsidiary2 = _interopRequireDefault(_subsidiary);

var _diary = require('./diary');

var _diary2 = _interopRequireDefault(_diary);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PATH_API = '/api/v1/public';
//here comes the url routes 


var router = _express2.default.Router();

//Authorization
router.use(_auth.authorization);
//Path Routes
router.use(PATH_API, _client2.default);
router.use(PATH_API, _subsidiary2.default);
router.use(PATH_API, _diary2.default);
router.use(PATH_API, _service2.default);
router.use(PATH_API, _request2.default);

router.get(PATH_API, function (req, res) {
    res.send('Welcome to the public API ');
});

module.exports = router;