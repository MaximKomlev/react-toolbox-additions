'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chord = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames5 = require('classnames');

var _classnames6 = _interopRequireDefault(_classnames5);

var _font_icon = require('react-toolbox/lib/font_icon');

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentId = 'contentId';

var Chord = function (_Component) {
  _inherits(Chord, _Component);

  function Chord(props) {
    _classCallCheck(this, Chord);

    var _this = _possibleConstructorReturn(this, (Chord.__proto__ || Object.getPrototypeOf(Chord)).call(this));

    _this.state = {
      active: false
    };

    _this.handleClick = function (event) {
      if (!_this.props.disabled && _this.props.onClick) {
        _this.props.onClick(event);
      }
    };

    _this.handleResize = function () {
      if (_this.state.active) {
        _this.expand();
      } else {
        _this.collapse();
      }
    };

    _this.state.active = props.active;
    return _this;
  }

  _createClass(Chord, [{
    key: 'transitionEndEventName',


    //private methods
    value: function transitionEndEventName() {
      var i = void 0,
          undefined = void 0,
          el = document.createElement('div'),
          transitions = {
        'transition': 'transitionend',
        'OTransition': 'otransitionend',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };

      for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
          return transitions[i];
        }
      }
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      var contentEl = _reactDom2.default.findDOMNode(this.refs[contentId]);
      if (contentEl) {
        contentEl.style.height = getComputedStyle(contentEl).height;
        contentEl.offsetHeight;
        contentEl.style.height = 0;
      }
    }
  }, {
    key: 'expand',
    value: function expand() {
      var _this2 = this;

      var contentEl = _reactDom2.default.findDOMNode(this.refs[contentId]);
      if (contentEl) {
        (function () {
          var initialHeight = getComputedStyle(contentEl).height;
          contentEl.style.height = 'auto';
          var newHeight = getComputedStyle(contentEl).height;
          contentEl.style.height = initialHeight;
          contentEl.offsetHeight;
          contentEl.style.height = newHeight;

          var self = _this2;
          contentEl.addEventListener(_this2.transitionEndEventName(), function transitionEnd(event) {
            if (self.state.active) {
              contentEl.style.height = 'auto';
            }
            contentEl.removeEventListener(self.transitionEndEventName(), transitionEnd, false);
          }, false);
        })();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      if (this.props.active) {
        this.expand();
      } else {
        this.collapse();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!prevProps.active && this.props.active && this.props.onActive) {
        this.props.onActive();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.state.active = nextProps.active;
      if (this.state.active) {
        this.expand();
      } else {
        this.collapse();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    //events handler

  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          children = _props.children,
          id = _props.id,
          key = _props.key,
          active = _props.active,
          activeClassName = _props.activeClassName,
          className = _props.className,
          disabled = _props.disabled,
          hidden = _props.hidden,
          label = _props.label,
          labelIcon = _props.labelIcon,
          labelPostIcon = _props.labelPostIcon,
          theme = _props.theme;

      var _className = (0, _classnames6.default)(theme.label, (_classnames = {}, _defineProperty(_classnames, theme.withText, label), _defineProperty(_classnames, theme.withIcon, labelIcon), _defineProperty(_classnames, theme.withPostIcon, labelPostIcon), _classnames));

      var lIcon = labelIcon;
      if (lIcon && Object.prototype.toString.call(lIcon) !== '[object String]') {
        lIcon = _react2.default.cloneElement(labelIcon, {
          className: theme.icon
        });
      } else if (labelIcon) {
        lIcon = _react2.default.createElement(_font_icon.FontIcon, { className: theme.icon, value: labelIcon });
      }

      var lpIcon = labelPostIcon;
      if (lpIcon && Object.prototype.toString.call(lpIcon) !== '[object String]') {
        lpIcon = _react2.default.cloneElement(labelPostIcon, {
          className: theme.postIcon
        });
      } else if (labelPostIcon) {
        lpIcon = _react2.default.createElement(_font_icon.FontIcon, { className: theme.postIcon, value: labelPostIcon });
      }

      return _react2.default.createElement(
        'div',
        { id: id, key: key, 'data-react-toolbox': 'chord', className: (0, _classnames6.default)(className, theme.chord, _defineProperty({}, theme.active, active), _defineProperty({}, theme.hidden, hidden), _defineProperty({}, theme.disabled, disabled)) },
        _react2.default.createElement(
          'label',
          { className: _className, onClick: this.handleClick },
          lIcon,
          _react2.default.createElement(
            'div',
            { className: theme.text },
            label
          ),
          lpIcon
        ),
        _react2.default.createElement(
          'div',
          { ref: contentId, className: (0, _classnames6.default)(theme.content, !active ? theme.hidden : null) },
          children
        )
      );
    }
  }]);

  return Chord;
}(_react.Component);

Chord.propTypes = {
  active: _react.PropTypes.bool,
  activeClassName: _react.PropTypes.string,
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  hidden: _react.PropTypes.bool,
  label: _react.PropTypes.node,
  labelIcon: _react.PropTypes.node,
  labelPostIcon: _react.PropTypes.node,
  onActive: _react.PropTypes.func,
  onClick: _react.PropTypes.func,
  theme: _react.PropTypes.shape({
    active: _react.PropTypes.string,
    disabled: _react.PropTypes.string,
    hidden: _react.PropTypes.string,
    label: _react.PropTypes.string,
    content: _react.PropTypes.string
  })
};
Chord.defaultProps = {
  active: false,
  className: '',
  disabled: false,
  hidden: false
};
exports.default = (0, _reactCssThemr.themr)(_identifiers.CHORD)(Chord);
exports.Chord = Chord;