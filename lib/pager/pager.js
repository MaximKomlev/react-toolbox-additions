'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pager = exports.pagerFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactCssThemr = require('react-css-themr');

var _page = require('./page.js');

var _page2 = _interopRequireDefault(_page);

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

var clone = function clone(src) {
    return JSON.parse(JSON.stringify(src));
};

var prevPageId = 'prev';
var nextPageId = 'next';

var initialVisiblePagesBlockSize = 3;
var initialCurrentPage = 1;
var first = 1;
/*
* adjustment of start and end elements at range to have equal elements during navigation
* 2 - because we already have the rendered first and last button
*/
var adjustment = 2;

var factory = function factory(Page) {
    var Pager = function (_Component) {
        _inherits(Pager, _Component);

        function Pager(props) {
            _classCallCheck(this, Pager);

            var _this = _possibleConstructorReturn(this, (Pager.__proto__ || Object.getPrototypeOf(Pager)).call(this));

            _this._ranges = {
                leftEnd: null,
                rightStart: null
            };
            _this._pages = [];
            _this.state = {
                currentPage: initialCurrentPage,
                totalPages: initialCurrentPage
            };


            if (props) {
                _this.state.currentPage = props.currentPage;
                _this.state.totalPages = props.totalPages;
            }
            return _this;
        }

        //fields


        _createClass(Pager, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (nextProps.currentPage && !isNaN(Number(nextProps.currentPage)) && this.state.currentPage !== nextProps.currentPage) {
                    this._pages.splice(0);
                    this.setState({
                        currentPage: Number(nextProps.currentPage < first ? first : nextProps.currentPage)
                    });
                }
                if (nextProps.totalPages && !isNaN(Number(nextProps.totalPages)) && this.state.totalPages !== nextProps.totalPages) {
                    this._pages.splice(0);
                    this.setState({
                        totalPages: Number(nextProps.totalPages < first ? first : nextProps.totalPages)
                    });
                }
                if (nextProps.visiblePagesBlockSize && !isNaN(Number(nextProps.visiblePagesBlockSize)) && this.state.visiblePagesBlockSize !== nextProps.visiblePagesBlockSize) {
                    this._pages.splice(0);
                    this.setState({
                        visiblePagesBlockSize: Number(nextProps.visiblePagesBlockSize < nextProps.totalPages ? nextProps.visiblePagesBlockSize : nextProps.totalPages)
                    });
                }
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.updateState(this.state.currentPage, this.state.totalPages);
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                this.updatePages(this.state.currentPage, this.state.totalPages);
            }

            //events handlers

        }, {
            key: 'handlerPageClick',
            value: function handlerPageClick(page, type) {
                if (type === _page.BUTTON_TYPE.RANGE) {
                    this.handlerRangeClick(page);
                    return;
                }

                var oldValue = this.state.currentPage;
                var newValue = page;

                if (this.props.onPageChange) {
                    this.props.onPageChange(newValue, oldValue);
                }

                this.updateState(newValue);
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
                if (key === prevPageId) {
                    newValue = sum >> 1; //rounding to left
                } else {
                    sum = last + right;
                    newValue = (sum >> 1) + sum % 2; //rounding to right
                }

                if (this.props.onPageChange) {
                    this.props.onPageChange(newValue, curr);
                }

                this.updateState(newValue);
            }
        }, {
            key: 'handlerPrevNextClick',
            value: function handlerPrevNextClick(key, type) {
                var oldValue = this.state.currentPage;
                var newValue = key === prevPageId ? oldValue - 1 : oldValue + 1;

                if (this.props.onPageChange) {
                    this.props.onPageChange(newValue, oldValue);
                }

                this.updateState(newValue);
            }

            //private methods

        }, {
            key: 'updateState',
            value: function updateState(newValue) {
                this.state.currentPage = newValue;

                if (this._pages.length > 0) {
                    this.updatePages(newValue, this.state.totalPages);
                } else {
                    this.forceUpdate();
                }
            }
        }, {
            key: 'updatePages',
            value: function updatePages(currPage, totalPages) {
                var curr = currPage;
                var last = totalPages;

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

                    currentBlock = Math.ceil((totalPages - end === 1 ? totalPages : end) / blockSize);
                }

                if (currentBlock === blocksNumber) {
                    //adjustment set of buttons if current is on the right boundary
                    start = last - (blockSize + adjustment - first);
                    start = start - 1 <= first ? first : start;
                    end = last;
                }

                this.refs[prevPageId].disable(curr === first);

                var buttonIdx = 0;

                if (currentBlock > 1 && start - 1 > first) {
                    this.refs[buttonIdx].update(curr === first, first, String(first), _page.BUTTON_TYPE.PAGE);
                    ++buttonIdx;

                    this.refs[buttonIdx].update(false, prevPageId, this.props.rangeLeftButtonLabel, _page.BUTTON_TYPE.RANGE);
                    ++buttonIdx;
                }

                for (var i = start; i <= last && i <= end; ++i) {
                    this.refs[buttonIdx].update(curr === i, i, String(i), _page.BUTTON_TYPE.PAGE);
                    ++buttonIdx;
                }

                if (currentBlock < blocksNumber && end < last) {
                    this.refs[buttonIdx].update(false, nextPageId, this.props.rangeRightButtonLabel, _page.BUTTON_TYPE.RANGE);
                    ++buttonIdx;

                    this.refs[buttonIdx].update(curr === last, last, String(last), _page.BUTTON_TYPE.PAGE);
                    ++buttonIdx;
                }

                this.refs[nextPageId].disable(curr === last);

                // keep range boundaries to calculate correct navigation through the range
                this._ranges.leftEnd = start;
                this._ranges.rightStart = end - 1;
            }

            //rendering

        }, {
            key: 'renderPages',
            value: function renderPages(currPage, totalPages) {
                var curr = currPage;
                var last = totalPages < first ? first : totalPages;
                if (curr < first || curr > last) {
                    curr = curr < first ? first : curr > last ? last : curr;
                    this.setState({
                        currentPage: curr
                    });
                }

                var content = [];

                var buttonsCount = this.props.visiblePagesBlockSize + adjustment + 2;
                buttonsCount = buttonsCount > last ? last : buttonsCount;

                var possibleButtonClassNames = {};
                possibleButtonClassNames[_page.BUTTON_TYPE.PAGE] = (0, _classnames2.default)(this.props.theme.pagesButton);
                possibleButtonClassNames[_page.BUTTON_TYPE.RANGE] = (0, _classnames2.default)(this.props.theme.leftRightRangeButton);
                possibleButtonClassNames[_page.BUTTON_TYPE.ARROW] = (0, _classnames2.default)(this.props.theme.leftRightArrowButton);

                var possibleLeftButtoStyles = {};
                possibleLeftButtoStyles[_page.BUTTON_TYPE.ARROW] = clone(this.props.leftRightArrowButtonStyles);
                possibleLeftButtoStyles[_page.BUTTON_TYPE.ARROW].disabled = isOnePage(first, this.state.totalPages) || isBorderPage(this.state.currentPage, first);
                content.push(_react2.default.createElement(
                    Page,
                    {
                        key: prevPageId,
                        ref: prevPageId,
                        data: prevPageId,
                        buttonType: _page.BUTTON_TYPE.ARROW,
                        buttonStyles: possibleLeftButtoStyles,
                        buttonClassNames: possibleButtonClassNames,
                        onPageClick: this.handlerPrevNextClick.bind(this) },
                    this.props.prevButtonLabel
                ));

                var possibleButtoStyles = {};
                possibleButtoStyles[_page.BUTTON_TYPE.PAGE] = this.props.pagesButtonStyles;
                possibleButtoStyles[_page.BUTTON_TYPE.RANGE] = this.props.leftRightRangeButtonStyles;
                for (var i = 0; i < buttonsCount; ++i) {
                    content.push(_react2.default.createElement(
                        Page,
                        {
                            key: i,
                            ref: i,
                            data: i,
                            buttonType: _page.BUTTON_TYPE.PAGE,
                            activeClassName: (0, _classnames2.default)(this.props.theme.active),
                            buttonClassNames: possibleButtonClassNames,
                            onPageClick: this.handlerPageClick.bind(this),
                            buttonStyles: possibleButtoStyles
                        },
                        String(i)
                    ));
                    this._pages.push(i);
                }

                var possibleRightButtoStyles = {};
                possibleRightButtoStyles[_page.BUTTON_TYPE.ARROW] = clone(this.props.leftRightArrowButtonStyles);
                possibleRightButtoStyles[_page.BUTTON_TYPE.ARROW].disabled = isOnePage(first, this.state.totalPages) || isBorderPage(this.state.currentPage, this.state.totalPages);
                content.push(_react2.default.createElement(
                    Page,
                    {
                        key: nextPageId,
                        ref: nextPageId,
                        data: nextPageId,
                        buttonType: _page.BUTTON_TYPE.ARROW,
                        buttonStyles: possibleLeftButtoStyles,
                        buttonClassNames: possibleButtonClassNames,
                        onPageClick: this.handlerPrevNextClick.bind(this) },
                    this.props.nextButtonLabel
                ));

                return content;
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    { 'data-ext-react-toolbox': 'pager', className: (0, _classnames2.default)(this.props.theme.pager, this.props.pagerClassName) },
                    this.renderPages(this.state.currentPage, this.state.totalPages)
                );
            }
        }]);

        return Pager;
    }(_react.Component);

    Pager.propTypes = {
        currentPage: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired,
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
        totalPages: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired,
        visiblePagesBlockSize: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]).isRequired
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

var Pager = factory(_page2.default);

exports.default = (0, _reactCssThemr.themr)(_identifiers.PAGER)(Pager);
exports.pagerFactory = factory;
exports.Pager = Pager;