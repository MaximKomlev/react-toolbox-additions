'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pager = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _pager = require('./pager.js');

var _button = require('react-toolbox/lib/button');

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pager = (0, _pager.pagerFactory)(_button.Button);

var ThemedPager = (0, _reactCssThemr.themr)(_identifiers.PAGER, _theme2.default)(Pager);
exports.default = ThemedPager;
exports.Pager = ThemedPager;