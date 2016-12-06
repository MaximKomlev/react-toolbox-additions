'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Accordion = exports.Chord = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _accordion = require('./accordion.js');

var _chord = require('./chord.js');

var _theme = require('./theme.scss');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyTheme = function applyTheme(Component) {
  return (0, _reactCssThemr.themr)(_identifiers.ACCORDION, _theme2.default)(Component);
};
var ThemedChord = applyTheme(_chord.Chord);
var ThemedAccordion = applyTheme((0, _accordion.accordionFactory)(ThemedChord));

exports.Chord = ThemedChord;
exports.Accordion = ThemedAccordion;