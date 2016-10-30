'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FilePicker = exports.filePickerFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _button = require('react-toolbox/lib/button');

var _input = require('react-toolbox/lib/input');

var _input2 = _interopRequireDefault(_input);

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Input, Button) {
    var FilePicker = function (_Component) {
        _inherits(FilePicker, _Component);

        function FilePicker() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, FilePicker);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FilePicker.__proto__ || Object.getPrototypeOf(FilePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
                filename: _this.props.filename
            }, _this.handlerBrowse = function (e) {
                var files = e.target.files;

                if (files && files.length) {
                    if (_this.state.filename !== files[0].name) {
                        if (_this.props.onFileChange) {
                            _this.props.onFileChange(files[0], files[0].name);
                        }
                    }

                    _this.setState({
                        filename: files[0].name
                    });
                }
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(FilePicker, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (this.state.filename !== nextProps.filename) {
                    this.setState({
                        filename: nextProps.filename
                    });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    className = _props.className,
                    buttonText = _props.buttonText,
                    inputText = _props.inputText,
                    inline = _props.inline,
                    disabled = _props.disabled,
                    theme = _props.theme,
                    label = _props.label,
                    filename = _props.filename,
                    onFileChange = _props.onFileChange,
                    onChange = _props.onChange,
                    onClick = _props.onClick,
                    readOnly = _props.readOnly,
                    type = _props.type,
                    other = _objectWithoutProperties(_props, ['className', 'buttonText', 'inputText', 'inline', 'disabled', 'theme', 'label', 'filename', 'onFileChange', 'onChange', 'onClick', 'readOnly', 'type']);

                var css = inline ? 'inline' : null;

                return _react2.default.createElement(
                    'div',
                    { 'data-ext-react-toolbox': 'filepicker', className: (0, _classnames2.default)(theme.filepicker, className, [theme[css]]) },
                    _react2.default.createElement(Input, {
                        readOnly: true,
                        className: (0, _classnames2.default)(theme.input, this.state.filename && this.state.filename.length && inline ? [theme[css]] : null),
                        disabled: disabled,
                        label: inputText,
                        value: this.state.filename
                    }),
                    _react2.default.createElement(Button, _extends({
                        className: (0, _classnames2.default)(theme.button, theme.iefix),
                        onChange: this.handlerBrowse,
                        disabled: disabled,
                        label: buttonText
                    }, other))
                );
            }
        }]);

        return FilePicker;
    }(_react.Component);

    FilePicker.propTypes = {
        buttonText: _react2.default.PropTypes.string,
        className: _react2.default.PropTypes.string,
        filename: _react2.default.PropTypes.string,
        inline: _react2.default.PropTypes.bool,
        inputText: _react2.default.PropTypes.string,
        onFileChange: _react2.default.PropTypes.func,
        theme: _react.PropTypes.shape({
            button: _react.PropTypes.string,
            filepicker: _react.PropTypes.string,
            inline: _react2.default.PropTypes.string,
            input: _react.PropTypes.string
        })
    };
    FilePicker.defaultProps = {
        buttonText: 'BROWSE',
        inputText: 'SELECT FILE',
        className: '',
        filename: '',
        inline: false
    };

    return FilePicker;
};

var FilePicker = factory(_input2.default, _button.BrowseButton);

exports.default = (0, _reactCssThemr.themr)(_identifiers.FILEPICKER)(FilePicker);
exports.filePickerFactory = factory;
exports.FilePicker = FilePicker;