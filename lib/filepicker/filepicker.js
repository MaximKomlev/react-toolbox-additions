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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Input, Button) {
    var FilePicker = function (_Component) {
        _inherits(FilePicker, _Component);

        function FilePicker(props) {
            _classCallCheck(this, FilePicker);

            var _this = _possibleConstructorReturn(this, (FilePicker.__proto__ || Object.getPrototypeOf(FilePicker)).call(this, props));

            _this.state = {
                value: _this.props.value
            };

            _this.handlerBrowse = function (e) {
                var files = e.target.files;

                if (files && files.length) {
                    if (_this.state.value !== files[0].name) {
                        if (_this.props.onChange) {
                            _this.props.onChange(files[0], files[0].name);
                        }
                    }

                    _this.setState({
                        value: files[0].name
                    });
                }
            };

            _this.state = { value: props.value };
            return _this;
        }

        _createClass(FilePicker, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (this.state.value !== nextProps.value) {
                    this.setState({
                        value: nextProps.value
                    });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    className = _props.className,
                    buttonProperties = _props.buttonProperties,
                    inputProperties = _props.inputProperties,
                    value = _props.value,
                    inline = _props.inline,
                    theme = _props.theme;

                var css = inline ? 'inline' : null;

                return _react2.default.createElement(
                    'div',
                    { 'data-ext-react-toolbox': 'filepicker', className: (0, _classnames2.default)(theme.filepicker, className, [theme[css]]) },
                    _react2.default.createElement(Input, _extends({
                        className: (0, _classnames2.default)(theme.input),
                        value: this.state.value
                    }, inputProperties)),
                    _react2.default.createElement(Button, _extends({
                        className: (0, _classnames2.default)(theme.button, theme.iefix),
                        onChange: this.handlerBrowse
                    }, buttonProperties))
                );
            }
        }]);

        return FilePicker;
    }(_react.Component);

    FilePicker.propTypes = {
        buttonProperties: _react2.default.PropTypes.object,
        className: _react.PropTypes.string,
        inline: _react.PropTypes.bool,
        inputProperties: _react2.default.PropTypes.object,
        onChange: _react.PropTypes.func,
        theme: _react.PropTypes.shape({
            button: _react.PropTypes.string,
            filepicker: _react.PropTypes.string,
            inline: _react.PropTypes.string,
            input: _react.PropTypes.string
        }),
        value: _react.PropTypes.string
    };
    FilePicker.defaultProps = {
        buttonProperties: { label: 'BROWSE' },
        className: '',
        inline: false,
        inputProperties: { label: 'SELECT FILE' },
        value: undefined
    };

    return FilePicker;
};

var FilePicker = factory(_input2.default, _button.BrowseButton);

exports.default = (0, _reactCssThemr.themr)(_identifiers.FILEPICKER)(FilePicker);
exports.filePickerFactory = factory;
exports.FilePicker = FilePicker;