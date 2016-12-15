'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Accordion = exports.accordionFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

var _chord = require('./chord.js');

var _chord2 = _interopRequireDefault(_chord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(Chord) {
  var Accordion = function (_Component) {
    _inherits(Accordion, _Component);

    function Accordion() {
      _classCallCheck(this, Accordion);

      return _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).apply(this, arguments));
    }

    _createClass(Accordion, [{
      key: 'handleHeaderClick',


      //events handler
      value: function handleHeaderClick(event, idx, item) {
        idx = parseInt(idx);
        if (this.props.onChange) {
          this.props.onChange(idx);
        }
        if (item.props.onClick) {
          item.props.onClick(event);
        }
      }
    }, {
      key: 'renderChords',


      //private methods
      value: function renderChords() {
        var _this2 = this;

        var chords = [];
        var idx = 0;

        _react2.default.Children.forEach(this.props.children, function (item) {
          if (item.type === Chord) {
            if (item.props.children) {
              chords.push(_react2.default.cloneElement(item, {
                id: idx,
                key: idx,
                theme: _this2.props.theme,
                active: _this2.props.index === idx,
                onClick: _this2.handleHeaderClick.bind(_this2, event, idx, item)
              }));
              ++idx;
            }
          }
        });

        return chords;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            className = _props.className,
            disableAnimation = _props.disableAnimation,
            theme = _props.theme;

        var classNames = (0, _classnames3.default)(theme.accordion, className, _defineProperty({}, theme.disabledAnimation, disableAnimation));

        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'accordion', className: classNames },
          _react2.default.createElement(
            'div',
            { className: theme.accordion },
            this.renderChords()
          )
        );
      }
    }]);

    return Accordion;
  }(_react.Component);

  Accordion.propTypes = {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    disableAnimation: _react.PropTypes.bool,
    index: _react.PropTypes.number,
    onChange: _react.PropTypes.func,
    theme: _react.PropTypes.shape({
      accordion: _react.PropTypes.string
    })
  };
  Accordion.defaultProps = {
    index: 0,
    disableAnimation: false
  };


  return Accordion;
};

var Accordion = factory(_chord2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.ACCORDION)(Accordion);
exports.accordionFactory = factory;
exports.Accordion = Accordion;