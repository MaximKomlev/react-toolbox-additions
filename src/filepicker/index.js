import { themr } from 'react-css-themr';
import { FILEPICKER } from '../identifiers.js';
import { filePickerFactory } from './filepicker.js';
import { BrowseButton } from 'react-toolbox/lib/button';
import { Input } from 'react-toolbox/lib/input';
import theme from './theme.scss';

const FilePicker = filePickerFactory(Input, BrowseButton);

const ThemedFilePicker = themr(FILEPICKER, theme)(FilePicker);
export default ThemedFilePicker;
export { ThemedFilePicker as FilePicker };
