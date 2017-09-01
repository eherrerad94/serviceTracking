'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _equipment = require('./equipment');

var _equipment2 = _interopRequireDefault(_equipment);

var _typeEquipment = require('./typeEquipment');

var _typeEquipment2 = _interopRequireDefault(_typeEquipment);

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use(_equipment2.default);
router.use(_typeEquipment2.default);
router.use(_category2.default);

module.exports = router;