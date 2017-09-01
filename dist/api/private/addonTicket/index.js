'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _admission = require('./admission');

var _admission2 = _interopRequireDefault(_admission);

var _callType = require('./callType');

var _callType2 = _interopRequireDefault(_callType);

var _failure = require('./failure');

var _failure2 = _interopRequireDefault(_failure);

var _priority = require('./priority');

var _priority2 = _interopRequireDefault(_priority);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(_admission2.default);
router.use(_callType2.default);
router.use(_failure2.default);
router.use(_priority2.default);
router.use(_priority2.default);

module.exports = router;