'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../../config/auth');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _technical = require('./technical');

var _technical2 = _interopRequireDefault(_technical);

var _boss = require('./boss');

var _boss2 = _interopRequireDefault(_boss);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _programmer = require('./programmer');

var _programmer2 = _interopRequireDefault(_programmer);

var _company = require('./company');

var _company2 = _interopRequireDefault(_company);

var _ticket = require('./ticket');

var _ticket2 = _interopRequireDefault(_ticket);

var _quotation = require('./quotation');

var _quotation2 = _interopRequireDefault(_quotation);

var _equipment = require('./equipment');

var _equipment2 = _interopRequireDefault(_equipment);

var _addonTicket = require('./addonTicket');

var _addonTicket2 = _interopRequireDefault(_addonTicket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Includes all the addons for ticket

var API_ADMIN = '/api/v1/private'; //Includes Category, typeEquipment & Equipment


var router = _express2.default.Router();

router.use(_auth.authorization);
router.use(API_ADMIN, _user2.default); //YA
router.use(API_ADMIN, _technical2.default); //YA
router.use(API_ADMIN, _boss2.default); //YA
router.use(API_ADMIN, _client2.default);
router.use(API_ADMIN, _programmer2.default);
router.use(API_ADMIN, _company2.default);
router.use(API_ADMIN, _ticket2.default);
router.use(API_ADMIN, _quotation2.default);
router.use(API_ADMIN, _equipment2.default);
router.use(API_ADMIN, _addonTicket2.default);

router.get(API_ADMIN, function (req, res) {
    res.send('API for admin user');
});

module.exports = router;