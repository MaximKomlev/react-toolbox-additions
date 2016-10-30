import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';

import {BrowseButton as InjectButton} from 'react-toolbox/lib/button';
import InjectInput from 'react-toolbox/lib/input';
import { FILEPICKER } from '../identifiers.js';

const factory = (Input, Button) => {
  class FilePicker extends Component {

    static propTypes = {
        buttonText: React.PropTypes.string,
        className: React.PropTypes.string,
        inline: React.PropTypes.bool,
        inputText: React.PropTypes.string,
        onFileChange: React.PropTypes.func,
        theme: PropTypes.shape({
            button: PropTypes.string,
            filepicker: PropTypes.string,
            inline: React.PropTypes.string,
            input: PropTypes.string
        }),
        filename: React.PropTypes.string
    };

    static defaultProps = {
        buttonText: 'BROWSE',
        inputText: '',
        className: '',
        filename: '',
        inline: false
    }

    state = {
        filename: this.props.filename 
    }

    componentWillReceiveProps (nextProps) {
      if (this.state.filename !== nextProps.filename) {
        this.setState({
            filename: nextProps.filename
        });
      }
    }

    handlerBrowse = (e) => {
        let files = e.target.files;
        
        if (files && files.length) {
            if (this.state.filename !== files[0].name) {
                if (this.props.onFileChange) {
                    this.props.onFileChange(files[0], files[0].name);
                }
            }

            this.setState({
                filename: files[0].name
            });
        }
    };

    render() {
        const { className, buttonText, inputText, inline, disabled, theme, label, filename, onFileChange, onChange, onClick, readOnly, ...other } = this.props;
        const css = inline ? 'inline' : null;

        return (
            <div data-ext-react-toolbox='filepicker' className={classnames(theme.filepicker, className, [theme[css]])}>
                <Input
                    readOnly
                    className={classnames(theme.input, (this.state.filename && this.state.filename.length && inline ? [theme[css]] : null))}
                    disabled={disabled}
                    label={inputText}
                    value={this.state.filename}
                    />
                <Button
                    className={classnames(theme.button)}
                    onChange={this.handlerBrowse}
                    disabled={disabled}
                    label={buttonText}
                    {...other}
                    />
            </div>
        );
    }

    }
    return FilePicker;
};

const FilePicker = factory(InjectInput, InjectButton);

export default themr(FILEPICKER)(FilePicker);
export {
  factory as filePickerFactory
};
export { FilePicker };
