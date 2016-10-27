import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

import InjectButton from 'react-toolbox/lib/button';
import { PAGER } from '../identifiers.js';

const isOnePage = (first, last) => {
    return first === last || !last;
};

const isBorderPage = (curr, border) => {
    return curr === border;
};

const initialVisiblePagesBlockSize = 3;
const initialCurrentPage = 1;
const first = 1;

const factory = (Button) => {
  class Pager extends Component {

    static propTypes = {
        currentPage: React.PropTypes.number.isRequired,
        leftRightArrowButtonStyles: React.PropTypes.object,
        leftRightRangeButtonStyles: React.PropTypes.object,
        nextButtonLabel: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        onPageChange: React.PropTypes.func,
        pagerClassName: PropTypes.string,
        pagesButtonStyles: React.PropTypes.object,
        prevButtonLabel: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        rangeLeftButtonLabel: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        rangeRightButtonLabel: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        theme: PropTypes.shape({
            pager: PropTypes.string,
            active: PropTypes.string,
            leftRightArrowButton: PropTypes.string,
            leftRightRangeButton: PropTypes.string,
            pagesButton: PropTypes.string
        }),
        totalPages: React.PropTypes.number.isRequired,
        visiblePagesBlockSize: React.PropTypes.number.isRequired
    }

    static defaultProps = {
        currentPage: initialCurrentPage,
        totalPages: initialCurrentPage,
        leftRightArrowButtonStyles: {raised: true},
        leftRightRangeButtonStyles: {flat: true},
        nextButtonLabel: '\u003E',
        pagesButtonStyles: {flat: true},
        prevButtonLabel: '\u003C',
        rangeLeftButtonLabel: '...',
        rangeRightButtonLabel: '...',
        visiblePagesBlockSize: initialVisiblePagesBlockSize
    }

    state = {
        currentPage: this.props.currentPage,
        totalPages: this.props.totalPages
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.currentPage && !isNaN(Number(nextProps.currentPage))
        && this.state.currentPage !== nextProps.currentPage) {
        this.setState({
            currentPage: Number(nextProps.currentPage < first ? first : nextProps.currentPage)
        });
      }
      if (nextProps.totalPages && !isNaN(Number(nextProps.totalPages))
        && this.state.totalPages !== nextProps.totalPages) {
        this.setState({
            totalPages: Number(nextProps.totalPages < first ? first : nextProps.totalPages)
        });
      }
    }

    handlerPageClick (page) {
        const oldValue = this.state.currentPage;
        const newValue = page;

        if (this.props.onPageChange) {
            this.props.onPageChange(newValue, oldValue);
        }

        this.setState({
            currentPage: newValue
        });
    }

    handlerRangeClick (key) {
        const curr = this.state.currentPage;
        const last = this.state.totalPages;

        const right = !this._ranges.rightStart ? last : this._ranges.rightStart;
        const left = !this._ranges.leftEnd ? first : this._ranges.leftEnd;

        let newValue = curr;
        let sum = first + left;
        if (key === 'prev') {
            newValue = (sum >> 1); //rounding to left
        } else {
            sum = last + right;
            newValue = (sum >> 1) + (sum % 2); //rounding to right
        }

        if (this.props.onPageChange) {
            this.props.onPageChange(newValue, curr);
        }

        this.setState({
            currentPage: newValue
        });
    }

    handlerPrevNextClick (key) {
        const oldValue = this.state.currentPage;
        const newValue = key === 'prev' ? oldValue - 1 : oldValue + 1;

        if (this.props.onPageChange) {
            this.props.onPageChange(newValue, oldValue);
        }

        this.setState({
            currentPage: newValue
        });
    }

    //fields
    _ranges = {
        leftEnd: null,
        rightStart: null
    }

    //rendering
    //private methods
    renderPages (currPage, totalPages) {
        let curr = currPage;
        let last = totalPages < first ? first : totalPages;
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
        const adjustment = 2;
        const content = [];

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

            currentBlock = Math.ceil(end / blockSize);
        }

        if (currentBlock === blocksNumber) { //adjustment set of buttons if current is on the right boundary
            start = last - (blockSize + adjustment - first);
            start = start - 1 <= first ? first : start;
            end = last;
        }

        if (currentBlock > 1 && (start - 1) > first) {
            content.push(
                <Button
                    key={first}
                    {...this.props.pagesButtonStyles}
                    className={classnames(this.props.theme.pagesButton, (curr === first ? this.props.theme.active : null))}
                    onClick={this.handlerPageClick.bind(this, first)}>
                    { String(first) }
                </Button>
            );

            content.push(
                <Button
                    key={'prev'}
                    {...this.props.leftRightRangeButtonStyles}
                    className={classnames(this.props.theme.leftRightRangeButton)}
                    onClick={this.handlerRangeClick.bind(this, 'prev')}>
                    { this.props.rangeLeftButtonLabel }
                </Button>
            );
        }

        for (let i = start; i <= last && i <= end; ++i) {
            content.push(
                    <Button
                        key={i}
                        {...this.props.pagesButtonStyles}
                        className={classnames(this.props.theme.pagesButton, (curr === i ? this.props.theme.active : null))}
                        onClick={this.handlerPageClick.bind(this, i)}>
                        { String(i) }
                    </Button>
                );
        }

        if (currentBlock < blocksNumber && end < last) {
            content.push(
                <Button
                    key={'next'}
                    {...this.props.leftRightRangeButtonStyles}
                    className={classnames(this.props.theme.leftRightRangeButton)}
                    onClick={this.handlerRangeClick.bind(this, 'next')}>
                    { this.props.rangeRightButtonLabel }
                </Button>
            );

            content.push(
                <Button
                    key={last}
                    {...this.props.pagesButtonStyles}
                    className={classnames(this.props.theme.pagesButton, (curr === last ? this.props.theme.active : null))}
                    onClick={this.handlerPageClick.bind(this, last)}>
                    { String(last) }
                </Button>
            );
        }

        // keep range boundaries to calculate correct navigation through the range
        this._ranges.leftEnd = start;
        this._ranges.rightStart = end - 1;

        return content;
    }

    render () {
        const {leftRightArrowButtonStyles, prevButtonLabel, nextButtonLabel,
                pagerClassName, totalPages, theme} = this.props;

        if (totalPages < first) {
            console.error('ArgumentOutOfRangeException: last Page must be bigger or equal first = 1.');
        }

        return (
            <div data-ext-react-toolbox='pager' className={classnames(theme.pager, pagerClassName)} >

                <Button
                    {...leftRightArrowButtonStyles}
                    disabled={isOnePage(first, this.state.totalPages) || isBorderPage(this.state.currentPage, first)}
                    className={theme.leftRightArrowButton}
                    onClick={this.handlerPrevNextClick.bind(this, 'prev')}>
                    { prevButtonLabel }
                </Button>
                {
                    this.renderPages(this.state.currentPage, this.state.totalPages)
                }
                <Button
                    {...leftRightArrowButtonStyles}
                    disabled={isOnePage(first, this.state.totalPages) || isBorderPage(this.state.currentPage, this.state.totalPages)}
                    className={theme.leftRightArrowButton}
                    onClick={this.handlerPrevNextClick.bind(this, 'next')}>
                    { nextButtonLabel }
                </Button>

            </div>);
        }
    }

    return Pager;
};

const Pager = factory(InjectButton);

export default themr(PAGER)(Pager);
export {
  factory as pagerFactory
};
export { Pager };
