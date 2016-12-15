'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilePicker = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _filepicker = require('./filepicker.js');

var _button = require('react-toolbox/lib/button');

var _input = require('react-toolbox/lib/input');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilePicker = (0, _filepicker.filePickerFactory)(_input.Input, _button.BrowseButton);

var ThemedFilePicker = (0, _reactCssThemr.themr)(_identifiers.FILEPICKER, _theme2.default)(FilePicker);
exports.default = ThemedFilePicker;
exports.FilePicker = ThemedFilePicker;