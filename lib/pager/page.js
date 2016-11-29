'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BUTTON_TYPE = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('react-toolbox/lib/button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_TYPE = exports.BUTTON_TYPE = {
    PAGE: 0,
    RANGE: 1,
    ARROW: 2
};

var Page = function (_Component) {
    _inherits(Page, _Component);

    function Page(props) {
        _classCallCheck(this, Page);

        var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this));

        _this.state = {
            disabled: false,
            active: false,
            data: 0,
            buttonType: 0,
            label: null
        };


        _this.state.data = props.data;
        _this.state.buttonType = props.buttonType;
        _this.state.label = props.children;
        return _this;
    }

    _createClass(Page, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.children && !isNaN(nextProps.children) && this.state.label !== nextProps.children) {
                this.setState({
                    label: nextProps.children
                });
            }
            if (nextProps.buttonType && !isNaN(nextProps.buttonType) && this.state.buttonType !== nextProps.buttonType) {
                this.setState({
                    buttonType: nextProps.buttonType
                });
            }
        }

        //events handlers

    }, {
        key: 'handlerClick',
        value: function handlerClick() {
            if (this.props.onPageClick) {
                this.props.onPageClick(this.state.data, this.state.buttonType);
            }
        }

        //rendering

    }, {
        key: 'render',
        value: function render() {
            var styles = this.props.buttonStyles[this.state.buttonType];
            var className = this.props.buttonClassNames[this.state.buttonType];

            if (styles['disabled'] === undefined) {
                styles = _extends({}, styles, { disabled: this.state.disabled });
            } else {
                styles['disabled'] = this.state.disabled;
            }

            return _react2.default.createElement(
                _button2.default,
                _extends({
                    className: (0, _classnames2.default)(className, this.state.active ? this.props.activeClassName : null),
                    onClick: this.handlerClick.bind(this)
                }, styles),
                this.state.label
            );
        }

        //public methods

    }, {
        key: 'update',
        value: function update(active, data, label, type) {
            this.setState({
                active: active,
                data: data,
                buttonType: type,
                label: label
            });
        }
    }, {
        key: 'disable',
        value: function disable(v) {
            this.setState({
                disabled: v
            });
        }
    }]);

    return Page;
}(_react.Component);

Page.propTypes = {
    activeClassName: _react.PropTypes.string,
    buttonClassNames: _react.PropTypes.object,
    buttonStyles: _react.PropTypes.object,
    buttonType: _react.PropTypes.oneOf([BUTTON_TYPE.PAGE, BUTTON_TYPE.RANGE, BUTTON_TYPE.ARROW]),
    onPageClick: _react.PropTypes.func
};
Page.defaultProps = {
    buttonType: 0,
    buttonStyles: { 0: { flat: true } },
    buttonClassNames: { 0: null }
};
exports.default = Page;