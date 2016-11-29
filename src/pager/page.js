import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Button from 'react-toolbox/lib/button';

export const BUTTON_TYPE = {
    PAGE: 0,
    RANGE: 1,
    ARROW: 2
}

class Page extends Component {

    constructor(props) {
        super();

        this.state.data = props.data;
        this.state.buttonType = props.buttonType;
        this.state.label = props.children;
    }

    static propTypes = {
        activeClassName: PropTypes.string,
        buttonClassNames: PropTypes.object,
        buttonStyles: PropTypes.object,
        buttonType: PropTypes.oneOf([BUTTON_TYPE.PAGE, BUTTON_TYPE.RANGE, BUTTON_TYPE.ARROW]),
        onPageClick: PropTypes.func
    }

    static defaultProps = {
        buttonType: 0,
        buttonStyles: {0: {flat: true}},
        buttonClassNames: {0: null}
    }

    state = {
        disabled: false,
        active: false,
        data: 0,
        buttonType: 0,
        label: null
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.children && !isNaN(nextProps.children)
        && this.state.label !== nextProps.children) {
            this.setState({
                label: nextProps.children
            });
        }
        if (nextProps.buttonType && !isNaN(nextProps.buttonType)
        && this.state.buttonType !== nextProps.buttonType) {
            this.setState({
                buttonType: nextProps.buttonType
            });
        }
    }

    //events handlers
    handlerClick() {
        if (this.props.onPageClick){
            this.props.onPageClick(this.state.data, this.state.buttonType);
        }
    }

    //rendering
    render () {
        let styles = this.props.buttonStyles[this.state.buttonType];
        let className = this.props.buttonClassNames[this.state.buttonType];

        if (styles['disabled'] === undefined) {
            styles = {...styles, disabled: this.state.disabled}
        } else {
            styles['disabled'] = this.state.disabled;
        }

        return (
            <Button
                className={classnames(className, (this.state.active ? this.props.activeClassName : null))}
                onClick={this.handlerClick.bind(this)}
                {...styles}>
                { this.state.label }
            </Button>
        );
    }

    //public methods
    update(active, data, label, type) {
        this.setState({
            active: active,
            data: data,
            buttonType: type,
            label: label
        });
    }

    disable(v) {
        this.setState({
            disabled: v
        });
    }
}

export default Page;