import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { ACCORDION } from '../identifiers.js';
import InjectChord from './chord.js';

const factory = (Chord) => {
  class Accordion extends Component {

    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      disableAnimation: PropTypes.bool,
      index: PropTypes.number,
      onChange: PropTypes.func,
      theme: PropTypes.shape({
        accordion: PropTypes.string
      })
    };

    static defaultProps = {
      index: 0,
      disableAnimation: false
    };

    //events handler
    handleHeaderClick (event, idx, item) {
      idx = parseInt(idx);
      if (this.props.onChange) {
        this.props.onChange(idx);
      }
      if (item.props.onClick) {
        item.props.onClick(event);
      }
    };

    //private methods
    renderChords () {
      const chords = [];
      let idx = 0;

      React.Children.forEach(this.props.children, (item) => {
        if (item.type === Chord) {
          if (item.props.children) {
            chords.push(React.cloneElement(item, {
              id: idx,
              key: idx,
              theme: this.props.theme,
              active: this.props.index === idx,
              onClick: this.handleHeaderClick.bind(this, event, idx, item)
            }));
            ++idx;
          }
        }
      });

      return chords;
    }

    render () {
      const { className, disableAnimation, theme} = this.props;
      const classNames = classnames(theme.accordion, className, {
        [theme.disableAnimation]: disableAnimation
      });

      return (
        <div data-react-toolbox='accordion' className={classNames}>
          <div className={theme.accordion}>
            {this.renderChords()}
          </div>
        </div>
      );
    }
  }

  return Accordion;
};

const Accordion = factory(InjectChord);
export default themr(ACCORDION)(Accordion);
export { factory as accordionFactory };
export { Accordion };
