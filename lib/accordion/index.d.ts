import * as React from "react";
import ReactToolbox from "../index";

export interface AccordionTheme {
  /**
   * Used for the root element.
   */
  accordion?: string;
}

interface AccordionProps extends ReactToolbox.Props {
  /**
   * The class(s) will be applied to the root elemt.
   */
  className
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Disable the animation on children expanding/collapsing.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * Expanded element
   * @default 0
   */
  index?: number;
  /**
   * Callback function that is fired when the Chord changes.
   */
  onChange?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: AccordionTheme;
}

export class Accordion extends React.Component<AccordionProps, {}> { }

export interface ChordTheme {
  /**
   * Added to the chord element (label and content) in case it's active.
   */
  active?: string;
  /**
   * Added to the chord element in case it's disabled.
   */
  disabled?: string;
  /**
   * Added to the chord element in case it's hidden.
   */
  hidden?: string;
  /**
   * Base style of header of chord element.
   */
  label?: string;
  /**
   * Base style of content of chord element.
   */
  content?: string;
}

interface ChordProps extends ReactToolbox.Props {
  /**
   * If true, the current component is visible.
   */
  active?: boolean;
  /**
   * Additional class name to provide custom styling for the active Chord.
   */
  activeClassName?: string;
  /**
   * If true, the current component is not clickable.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the current component is not visible.
   * @default false
   */
  hidden?: boolean;
  /**
   * Label text for the chord header. Required.
   */
  label: string;
  /**
   * Icon for chord header. Required.
   */
  labelIcon: string;
  /**
   * Icon behind of the label for chord header.
   */
  labelPostIcon: string;
  /**
   * Callback function that is fired when the Chord is activated.
   */
  onActive?: Function;
  /**
   * Callback function that is fired when the chord label is clicked.
   */
  onClick?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: ChordTheme;
}

export class Chord extends React.Component<ChordProps, {}> { }
