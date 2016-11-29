import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

import InjectPage, {BUTTON_TYPE} from './page.js';
import { PAGER } from '../identifiers.js';

const isOnePage = (first, last) => {
    return first === last || !last;
};

const isBorderPage = (curr, border) => {
    return curr === border;
};

const clone = (src) => {
    return JSON.parse(JSON.stringify(src));
}

const prevPageId = 'prev';
const nextPageId = 'next';

const initialVisiblePagesBlockSize = 3;
const initialCurrentPage = 1;
const first = 1;
/*
* adjustment of start and end elements at range to have equal elements during navigation
* 2 - because we already have the rendered first and last button
*/
const adjustment = 2;

const factory = (Page) => {
  class Pager extends Component {

    constructor(props) {
        super();

        if (props) {
            this.state.currentPage = props.currentPage;
            this.state.totalPages = props.totalPages;
        }
    }

    static propTypes = {
        currentPage: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        firstLastPagesButtonStyles: PropTypes.object,
        leftRightArrowButtonStyles: PropTypes.object,
        leftRightRangeButtonStyles: PropTypes.object,
        nextButtonLabel: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
        onPageChange: PropTypes.func,
        pagerClassName: PropTypes.string,
        pagesButtonStyles: PropTypes.object,
        prevButtonLabel: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
        rangeLeftButtonLabel: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
        rangeRightButtonLabel: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
        theme: PropTypes.shape({
            pager: PropTypes.string,
            active: PropTypes.string,
            firstLastPagesButton: PropTypes.string,
            leftRightArrowButton: PropTypes.string,
            leftRightRangeButton: PropTypes.string,
            pagesButton: PropTypes.string
        }),
        totalPages: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        visiblePagesBlockSize: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    }

    static defaultProps = {
        currentPage: initialCurrentPage,
        totalPages: initialCurrentPage,
        firstLastPagesButtonStyles: {flat: true},
        leftRightArrowButtonStyles: {raised: true},
        leftRightRangeButtonStyles: {flat: true},
        nextButtonLabel: '\u003E',
        pagesButtonStyles: {flat: true},
        prevButtonLabel: '\u003C',
        rangeLeftButtonLabel: '...',
        rangeRightButtonLabel: '...',
        visiblePagesBlockSize: initialVisiblePagesBlockSize
    }

    //fields
    _ranges = {
        leftEnd: null,
        rightStart: null
    }

    _pages = [];

    state = {
        currentPage: initialCurrentPage,
        totalPages: initialCurrentPage
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.currentPage && !isNaN(Number(nextProps.currentPage))
        && this.state.currentPage !== nextProps.currentPage) {
        this._pages.splice(0);
        this.setState({
            currentPage: Number(nextProps.currentPage < first ? first : nextProps.currentPage)
        });
      }
      if (nextProps.totalPages && !isNaN(Number(nextProps.totalPages))
        && this.state.totalPages !== nextProps.totalPages) {
        this._pages.splice(0);
        this.setState({
            totalPages: Number(nextProps.totalPages < first ? first : nextProps.totalPages)
        });
      }
      if (nextProps.visiblePagesBlockSize && !isNaN(Number(nextProps.visiblePagesBlockSize))
        && this.state.visiblePagesBlockSize !== nextProps.visiblePagesBlockSize) {
        this._pages.splice(0);
        this.setState({
            visiblePagesBlockSize: Number( nextProps.visiblePagesBlockSize < nextProps.totalPages ? nextProps.visiblePagesBlockSize : nextProps.totalPages)
        });
      }
    }

    componentWillUnmount() {
        this._pages.splice(0);
    }

    componentDidMount() {
        this.updateState(this.state.currentPage, this.state.totalPages);
    }

    componentDidUpdate() {
        this.updatePages(this.state.currentPage, this.state.totalPages);
    }

    //events handlers
    handlerPageClick (page, type) {
        if (type === BUTTON_TYPE.RANGE) {
            this.handlerRangeClick(page);
            return;
        }

        const oldValue = this.state.currentPage;
        const newValue = page;

        this.updateState(newValue);

        if (this.props.onPageChange) {
            this.props.onPageChange(newValue, oldValue);
        }
    }

    handlerRangeClick (key) {
        const curr = this.state.currentPage;
        const last = this.state.totalPages;

        const right = !this._ranges.rightStart ? last : this._ranges.rightStart;
        const left = !this._ranges.leftEnd ? first : this._ranges.leftEnd;

        let newValue = curr;
        let sum = first + left;
        if (key === prevPageId) {
            newValue = (sum >> 1); //rounding to left
        } else {
            sum = last + right;
            newValue = (sum >> 1) + (sum % 2); //rounding to right
        }

        this.updateState(newValue);

        if (this.props.onPageChange) {
            this.props.onPageChange(newValue, curr);
        }
    }

    handlerPrevNextClick (key, type) {
        const oldValue = this.state.currentPage;
        const newValue = key === prevPageId ? oldValue - 1 : oldValue + 1;

        this.updateState(newValue);

        if (this.props.onPageChange) {
            this.props.onPageChange(newValue, oldValue);
        }
    }

    //private methods
    updateState(newValue) {
        this.state.currentPage = newValue;

        if (this._pages.length > 0) {
            this.updatePages(newValue, this.state.totalPages);
        } else {
            this.forceUpdate();
        }
    }

    updatePages (currPage, totalPages) {
        let curr = currPage;
        let last = totalPages;

        const blockSize = this.props.visiblePagesBlockSize === 1 ? adjustment : this.props.visiblePagesBlockSize;

        const padding = blockSize >> 1;
        const left = curr - padding * (blockSize % 2); //in case of even visiblePagesBlockSize
        const right = curr + padding;

        const blocksNumber = Math.ceil(last / blockSize);
        let currentBlock = Math.ceil(curr / blockSize);

        let start = ((currentBlock - 1) * blockSize) + first;
        let end = start + blockSize - first;

        if (currentBlock === 1) { //adjust set of buttons if current is on the left boundary
            end += adjustment;
            end = (last - first) === end ? last : end;
        } else if (currentBlock < blocksNumber) { //adjustment set of buttons if current is between boundaries
            start = left;
            end = right;

            currentBlock = Math.ceil((totalPages - end === 1 ? totalPages : end ) / blockSize);
        }

        if (currentBlock === blocksNumber) { //adjustment set of buttons if current is on the right boundary
            start = last - (blockSize + adjustment - first);
            start = start - 1 <= first ? first : start;
            end = last;
        }

        this.refs[prevPageId].disable(curr === first);

        let buttonIdx = 0;

        if (currentBlock > 1 && (start - 1) > first) {
            this.refs[buttonIdx].update(curr === first, first, String(first), BUTTON_TYPE.FLPAGE);
            ++buttonIdx;

            this.refs[buttonIdx].update(false, prevPageId, this.props.rangeLeftButtonLabel, BUTTON_TYPE.RANGE);
            ++buttonIdx;
        }

        for (let i = start; i <= last && i <= end; ++i) {
            let bType = BUTTON_TYPE.PAGE;
            if (i === first || i === last) {
                bType = BUTTON_TYPE.FLPAGE;
            }
            this.refs[buttonIdx].update(curr === i, i, String(i), bType);
            ++buttonIdx;
        }

        if (currentBlock < blocksNumber && end < last) {
            this.refs[buttonIdx].update(false, nextPageId, this.props.rangeRightButtonLabel, BUTTON_TYPE.RANGE);
            ++buttonIdx;

            this.refs[buttonIdx].update(curr === last, last, String(last), BUTTON_TYPE.FLPAGE);
            ++buttonIdx;
        }

        this.refs[nextPageId].disable(curr === last);

        // keep range boundaries to calculate correct navigation through the range
        this._ranges.leftEnd = start;
        this._ranges.rightStart = end - 1;
    }

    //rendering
    renderPages (currPage, totalPages) {
        this._pages.splice(0);

        let curr = currPage;
        let last = totalPages < first ? first : totalPages;
        if (curr < first || curr > last) {
            curr = curr < first ? first : curr > last ? last : curr;
            this.setState({
                currentPage: curr
            });
        }

        const content = [];

        let buttonsCount = this.props.visiblePagesBlockSize + adjustment + 2;
        buttonsCount = buttonsCount > last ? last : buttonsCount;

        let possibleButtonClassNames = {};
        possibleButtonClassNames[BUTTON_TYPE.FLPAGE] = classnames(this.props.theme.firstLastPagesButton);
        possibleButtonClassNames[BUTTON_TYPE.PAGE] = classnames(this.props.theme.pagesButton);
        possibleButtonClassNames[BUTTON_TYPE.RANGE] = classnames(this.props.theme.leftRightRangeButton);
        possibleButtonClassNames[BUTTON_TYPE.ARROW] = classnames(this.props.theme.leftRightArrowButton);
      
        let possibleLeftButtoStyles = {};
        possibleLeftButtoStyles[BUTTON_TYPE.ARROW] = clone(this.props.leftRightArrowButtonStyles);
        possibleLeftButtoStyles[BUTTON_TYPE.ARROW].disabled = isOnePage(first, this.state.totalPages) || isBorderPage(this.state.currentPage, first);
        content.push(
        <Page
            key={prevPageId}
            ref={prevPageId}
            data={prevPageId}
            buttonType={ BUTTON_TYPE.ARROW }
            buttonStyles={possibleLeftButtoStyles}
            buttonClassNames={possibleButtonClassNames}
            onPageClick={this.handlerPrevNextClick.bind(this)}>
            { this.props.prevButtonLabel }
        </Page>
        );

        let possibleButtoStyles = {};
        possibleButtoStyles[BUTTON_TYPE.FLPAGE] = this.props.firstLastPagesButtonStyles;
        possibleButtoStyles[BUTTON_TYPE.PAGE] = this.props.pagesButtonStyles;
        possibleButtoStyles[BUTTON_TYPE.RANGE] = this.props.leftRightRangeButtonStyles;
        for (let i = 0; i < buttonsCount; ++i) {
            content.push(
                <Page
                    key={i}
                    ref={i}
                    data={i}
                    buttonType={ BUTTON_TYPE.PAGE }
                    activeClassName={ classnames(this.props.theme.active) }
                    buttonClassNames={ possibleButtonClassNames }
                    onPageClick={ this.handlerPageClick.bind(this) }
                    buttonStyles={ possibleButtoStyles }
                    >
                    { String(i) }
                </Page>
            );
            this._pages.push(i);
        }

        let possibleRightButtoStyles = {};
        possibleRightButtoStyles[BUTTON_TYPE.ARROW] = clone(this.props.leftRightArrowButtonStyles);
        possibleRightButtoStyles[BUTTON_TYPE.ARROW].disabled = isOnePage(first, this.state.totalPages) || isBorderPage(this.state.currentPage, this.state.totalPages);
        content.push(
        <Page
            key={nextPageId}
            ref={nextPageId}
            data={nextPageId}
            buttonType={ BUTTON_TYPE.ARROW }
            buttonStyles={possibleLeftButtoStyles}
            buttonClassNames={possibleButtonClassNames}
            onPageClick={this.handlerPrevNextClick.bind(this)}>
            { this.props.nextButtonLabel }
        </Page>
        );

        return content;
    }

    render () {
        return (
            <div data-ext-react-toolbox='pager' className={classnames(this.props.theme.pager, this.props.pagerClassName)} >
                {
                    this.renderPages(this.state.currentPage, this.state.totalPages)
                }
            </div>);
        }
    }

    return Pager;
};

const Pager = factory(InjectPage);

export default themr(PAGER)(Pager);
export {
  factory as pagerFactory
};
export { Pager };
