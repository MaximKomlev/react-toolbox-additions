'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pager = exports.pagerFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _button = require('react-toolbox/lib/button');

var _button2 = _interopRequireDefault(_button);

var _identifiers = require('../identifiers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isOnePage = function isOnePage(first, last) {
    return first === last || !last;
};

var isBorderPage = function isBorderPage(curr, border) {
    return curr === border;
};

var initialVisiblePagesBlockSize = 3;
var initialCurrentPage = 1;
var first = 1;

var factory = function factory(Button) {
    var Pager = function (_Component) {
        _inherits(Pager, _Component);

        function Pager() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, Pager);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pager.__proto__ || Object.getPrototypeOf(Pager)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
                currentPage: _this.props.currentPage,
                totalPages: _this.props.totalPages
            }, _this._ranges = {
                leftEnd: null,
                rightStart: null
            }, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(Pager, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (nextProps.currentPage && !isNaN(Number(nextProps.currentPage)) && this.state.currentPage !== nextProps.currentPage) {
                    this.setState({
                        currentPage: Number(nextProps.currentPage < first ? first : nextProps.currentPage)
                    });
                }
                if (nextProps.totalPages && !isNaN(Number(nextProps.totalPages)) && this.state.totalPages !== nextProps.totalPages) {
                    this.setState({
                        totalPages: Number(nextProps.totalPages < first ? first : nextProps.totalPages)
                    });
                }
            }
        }, {
            key: 'handlerPageClick',
            value: function handlerPageClick(page) {
                var oldValue = this.state.currentPage;
                var newValue = page;

                if (this.props.onPageChange) {
                    this.props.onPageChange(newValue, oldValue);
                }

                this.setState({
                    currentPage: newValue
                });
            }
        }, {
            key: 'handlerRangeClick',
            value: function handlerRangeClick(key) {
                var curr = this.state.currentPage;
                var last = this.state.totalPages;

                var right = !this._ranges.rightStart ? last : this._ranges.rightStart;
                var left = !this._ranges.leftEnd ? first : this._ranges.leftEnd;

                var newValue = curr;
                var sum = first + left;
                if (key === 'prev') {
                    newValue = sum >> 1; //rounding to left
                } else {
                    sum = last + right;
                    newValue = (sum >> 1) + sum % 2; //rounding to right
                }

                if (this.props.onPageChange) {
                    this.props.onPageChange(newValue, curr);
                }

                this.setState({
                    currentPage: newValue
                });
            }
        }, {
            key: 'handlerPrevNextClick',
            value: function handlerPrevNextClick(key) {
                var oldValue = this.state.currentPage;
                var newValue = key === 'prev' ? oldValue - 1 : oldValue + 1;

                if (this.props.onPageChange) {
                    this.props.onPageChange(newValue, oldValue);
                }

                this.setState({
                    currentPage: newValue
                });
            }

            //fields

        }, {
            key: 'renderPages',


            //rendering
            //private methods
            value: function renderPages(currPage, totalPages) {
                var curr = currPage;
                var last = totalPages < first ? first : totalPages;
                if (curr < first || curr > last) {
                    curr = curr < first ? first : curr > last ? last : curr;
                    this.setState({
                        currentPage: curr
                    });
                }

                /*
                * adjustment of start and end elements at range to have equal elements during navigation
                * 2 - because we already have the rendered first and last button
                */
                var adjustment = 2;
                var content = [];

                var blockSize = this.props.visiblePagesBlockSize === 1 ? adjustment : this.props.visiblePagesBlockSize;

                var padding = blockSize >> 1;
                var left = curr - padding * (blockSize % 2); //in case of even visiblePagesBlockSize
                var right = curr + padding;

                var blocksNumber = Math.ceil(last / blockSize);
                var currentBlock = Math.ceil(curr / blockSize);

                var start = (currentBlock - 1) * blockSize + first;
                var end = start + blockSize - first;

                if (currentBlock === 1) {
                    //adjust set of buttons if current is on the left boundary
                    end += adjustment;
                    end = last - first === end ? last : end;
                } else if (currentBlock < blocksNumber) {
                    //adjustment set of buttons if current is between boundaries
                    start = left;
                    end = right;

                    currentBlock = Math.ceil(end / blockSize);
                }

                if (currentBlock === blocksNumber) {
                    //adjustment set of buttons if current is on the right boundary
                    start = last - (blockSize + adjustment - first);
                    start = start - 1 <= first ? first : start;
                    end = last;
                }

                if (currentBlock > 1 && start - 1 > first) {
                    content.push(_react2.default.createElement(
                        Button,
                        _extends({
                            key: first
                        }, this.props.pagesButtonStyles, {
                            className: (0, _classnames2.default)(this.props.theme.pagesButton, curr === first ? this.props.theme.active : null),
                            onClick: this.handlerPageClick.bind(this, first) }),
                        String(first)
                    ));

                    content.push(_react2.default.createElement(
                        Button,
                        _extends({
                            key: 'prev'
                        }, this.props.leftRightRangeButtonStyles, {
                            className: (0, _classnames2.default)(this.props.theme.leftRightRangeButton),
                            onClick: this.handlerRangeClick.bind(this, 'prev') }),
                        this.props.rangeLeftButtonLabel
                    ));
                }

                for (var i = start; i <= last && i <= end; ++i) {
                    content.push(_react2.default.createElement(
                        Button,
                        _extends({
                            key: i
                        }, this.props.pagesButtonStyles, {
                            className: (0, _classnames2.default)(this.props.theme.pagesButton, curr === i ? this.props.theme.active : null),
                            onClick: this.handlerPageClick.bind(this, i) }),
                        String(i)
                    ));
                }

                if (currentBlock < blocksNumber && end < last) {
                    content.push(_react2.default.createElement(
                        Button,
                        _extends({
                            key: 'next'
                        }, this.props.leftRightRangeButtonStyles, {
                            className: (0, _classnames2.default)(this.props.theme.leftRightRangeButton),
                            onClick: this.handlerRangeClick.bind(this, 'next') }),
                        this.props.rangeRightButtonLabel
                    ));

                    content.push(_react2.default.createElement(
                        Button,
                        _extends({
                            key: last
                        }, this.props.pagesButtonStyles, {
                            className: (0, _classnames2.default)(this.props.theme.pagesButton, curr === last ? this.props.theme.active : null),
                            onClick: this.handlerPageClick.bind(this, last) }),
                        String(last)
                    ));
                }

                // keep range boundaries to calculate correct navigation through the range
                this._ranges.leftEnd = start;
                this._ranges.rightStart = end - 1;

                return content;
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    leftRightArrowButtonStyles = _props.leftRightArrowButtonStyles,
                    prevButtonLabel = _props.prevButtonLabel,
                    nextButtonLabel = _props.nextButtonLabel,
                    pagerClassName = _props.pagerClassName,
                    totalPages = _props.totalPages,
                    theme = _props.theme;


                if (totalPages < first) {
                    console.error('ArgumentOutOfRangeException: last Page must be bigger or equal first = 1.');
                }

                return _react2.default.createElement(
                    'div',
                    { 'data-ext-react-toolbox': 'pager', className: (0, _classnames2.default)(theme.pager, pagerClassName) },
                    _react2.default.createElement(
                        Button,
                        _extends({}, leftRightArrowButtonStyles, {
                            disabled: isOnePage(first, this.state.totalPages) || isBorderPage(this.state.currentPage, first),
                            className: theme.leftRightArrowButton,
                            onClick: this.handlerPrevNextClick.bind(this, 'prev') }),
                        prevButtonLabel
                    ),
                    this.renderPages(this.state.currentPage, this.state.totalPages),
                    _react2.default.createElement(
                        Button,
                        _extends({}, leftRightArrowButtonStyles, {
                            disabled: isOnePage(first, this.state.totalPages) || isBorderPage(this.state.currentPage, this.state.totalPages),
                            className: theme.leftRightArrowButton,
                            onClick: this.handlerPrevNextClick.bind(this, 'next') }),
                        nextButtonLabel
                    )
                );
            }
        }]);

        return Pager;
    }(_react.Component);

    Pager.propTypes = {
        currentPage: _react2.default.PropTypes.number.isRequired,
        leftRightArrowButtonStyles: _react2.default.PropTypes.object,
        leftRightRangeButtonStyles: _react2.default.PropTypes.object,
        nextButtonLabel: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
        onPageChange: _react2.default.PropTypes.func,
        pagerClassName: _react.PropTypes.string,
        pagesButtonStyles: _react2.default.PropTypes.object,
        prevButtonLabel: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
        rangeLeftButtonLabel: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
        rangeRightButtonLabel: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
        theme: _react.PropTypes.shape({
            pager: _react.PropTypes.string,
            active: _react.PropTypes.string,
            leftRightArrowButton: _react.PropTypes.string,
            leftRightRangeButton: _react.PropTypes.string,
            pagesButton: _react.PropTypes.string
        }),
        totalPages: _react2.default.PropTypes.number.isRequired,
        visiblePagesBlockSize: _react2.default.PropTypes.number.isRequired
    };
    Pager.defaultProps = {
        currentPage: initialCurrentPage,
        totalPages: initialCurrentPage,
        leftRightArrowButtonStyles: { raised: true },
        leftRightRangeButtonStyles: { flat: true },
        nextButtonLabel: '>',
        pagesButtonStyles: { flat: true },
        prevButtonLabel: '<',
        rangeLeftButtonLabel: '...',
        rangeRightButtonLabel: '...',
        visiblePagesBlockSize: initialVisiblePagesBlockSize
    };


    return Pager;
};

var Pager = factory(_button2.default);

exports.default = (0, _reactCssThemr.themr)(_identifiers.PAGER)(Pager);
exports.pagerFactory = factory;
exports.Pager = Pager;