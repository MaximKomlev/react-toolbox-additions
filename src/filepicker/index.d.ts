import * as React from "react";
import ReactToolbox from "react-toolbox/lib/index";

export interface FilePickerTheme {
  /**
   * Used for the root element.
   */
  filepicker?: string; 
  /**
   * Used for the input component.
   */
  input?: string;
  /**
   * Used when the component is in line.
   */
  inline?: string;
  /**
   * Used for the button component.
   */
  button?: string;
}

interface FilePickerProps extends ReactToolbox.Props {
  /**
   * This class will be applied to the root elemt.
   */
  className?: string;
  /**
   * This is button text.
   */
  buttonText?: string
  /**
   * This is input default text.
   */
  inputText?: string
  /**
   * If true, the component will apear inline.
   * @default false
   */
  inline?: boolean
  /**
   * Callback called when the input is changing.
   */
  onFileChange?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: FilePickerTheme;
}

export class FilePicker extends React.Component<FilePickerProps, {}> { }

export default FilePicker;
