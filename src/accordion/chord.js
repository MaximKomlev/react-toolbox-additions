import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { FontIcon } from 'react-toolbox/lib/font_icon';
import { themr } from 'react-css-themr';
import { CHORD } from '../identifiers.js';

const contentId = 'contentId';

class Chord extends Component {

  constructor(props) {
      super();

      this.state.active = props.active;
  }

  static propTypes = {
    active: PropTypes.bool,
    activeClassName: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    label: PropTypes.node,
    labelIcon: PropTypes.node,
    labelPostIcon: PropTypes.node,
    onActive: PropTypes.func,
    onClick: PropTypes.func,
    theme: PropTypes.shape({
      active: PropTypes.string,
      disabled: PropTypes.string,
      hidden: PropTypes.string,
      label: PropTypes.string,
      content: PropTypes.string
    })
  };

  static defaultProps = {
    active: false,
    className: '',
    disabled: false,
    hidden: false
  };

  state = {
    active: false
  };

  //private methods
  transitionEndEventName () {
      var i,
          undefined,
          el = document.createElement('div'),
          transitions = {
              'transition':'transitionend',
              'OTransition':'otransitionend',
              'MozTransition':'transitionend',
              'WebkitTransition':'webkitTransitionEnd'
          };

      for (i in transitions) {
          if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
              return transitions[i];
          }
      }
  }

  collapse() {
    let contentEl = ReactDOM.findDOMNode(this.refs[contentId]);
    if (contentEl) {
      contentEl.style.height = 0;
    }
  }

  expand() {
    let contentEl = ReactDOM.findDOMNode(this.refs[contentId]);
    if (contentEl) {
      let initialHeight = getComputedStyle(contentEl).height;
      contentEl.style.height = 'auto';
      let newHeight = getComputedStyle(contentEl).height;
      contentEl.style.height = initialHeight;
      contentEl.offsetHeight; // to force update
      contentEl.style.height = newHeight;
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    if (this.props.active) {
      this.expand();
    }
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.active) {
      this.expand();
    } else if (!nextProps.active) {
      this.collapse();
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  //events handler
  handleClick = (event) => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleResize = () => {
    if (this.state.active) {
      this.expand();
    }
  };

  render () {
    const {
      children, id, key,
      active, activeClassName, className, disabled, hidden, 
      label, labelIcon, labelPostIcon, theme
    } = this.props;
    const _className = classnames(theme.label, {
      [theme.withText]: label,
      [theme.withIcon]: labelIcon,
      [theme.withPostIcon]: labelPostIcon
    });

    return (
      <div id={id} key={key} data-react-toolbox='chord' className={classnames(className, theme.chord, {[theme.active]: active}, {[theme.hidden]: hidden}, {[theme.disabled]: disabled})}>
        <label className={_className} onClick={this.handleClick}>
          {labelIcon && <FontIcon className={theme.icon} value={labelIcon}/>}
          <span className={theme.text}>{label}</span>
          {labelPostIcon && <FontIcon className={theme.postIcon} value={labelPostIcon}/> }
        </label>
        <div ref={contentId} className={classnames(theme.content, (!active ? theme.hidden : null))}>
          {children}
        </div>
      </div>
    );
  }
}

export default themr(CHORD)(Chord);
export { Chord };
