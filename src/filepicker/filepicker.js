import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

import {BrowseButton as InjectButton} from 'react-toolbox/lib/button';
import InjectInput from 'react-toolbox/lib/input';
import { FILEPICKER } from '../identifiers.js';

const factory = (Input, Button) => {
  class FilePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {value: props.value};
    }

    static propTypes = {
        buttonProperties: React.PropTypes.object,
        className: PropTypes.string,
        inline: PropTypes.bool,
        inputProperties: React.PropTypes.object,
        onChange: PropTypes.func,
        theme: PropTypes.shape({
            button: PropTypes.string,
            filepicker: PropTypes.string,
            inline: PropTypes.string,
            input: PropTypes.string
        }),
        value: PropTypes.string
    };

    static defaultProps = {
        buttonProperties: {label: 'BROWSE'},
        className: '',
        inline: false,
        inputProperties: {label: 'SELECT FILE'},
        value: undefined
    }

    state = {
        value: this.props.value
    }

    componentWillReceiveProps (nextProps) {
      if (this.state.value !== nextProps.value) {
        this.setState({
            value: nextProps.value
        });
      }
    }

    handlerBrowse = (e) => {
        let files = e.target.files;
        
        if (files && files.length) {
            if (this.state.value !== files[0].name) {
                if (this.props.onChange) {
                    this.props.onChange(files[0], files[0].name);
                }
            }

            this.setState({
                value: files[0].name
            });
        }
    }

    render() {
        const { className, buttonProperties, inputProperties, value, inline, theme } = this.props;
        const css = inline ? 'inline' : null;

        return (
            <div data-ext-react-toolbox='filepicker' className={classnames(theme.filepicker, className, [theme[css]])}>
                <Input
                    className={classnames(theme.input)}
                    value={this.state.value}
                    {...inputProperties}
                    />
                <Button
                    className={classnames(theme.button, theme.iefix)}
                    onChange={this.handlerBrowse}
                    {...buttonProperties}
                    />
            </div>
        );}
    }
    return FilePicker;
};

const FilePicker = factory(InjectInput, InjectButton);

export default themr(FILEPICKER)(FilePicker);
export {
  factory as filePickerFactory
};
export { FilePicker };
