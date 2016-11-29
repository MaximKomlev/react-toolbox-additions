import * as React from "react";
import ReactToolbox from "react-toolbox/lib/index";

export interface PagerTheme {
  /**
   * Used for the root element.
   */
  pager?: string;
  /**
   * Used for the active page.
   */
  active?: string;
  /**
   * Used for the first and last page buttons.
   */
  firstLastPagesButton?: string;
  /**
   * Used for the next and previous arrow buttons.
   */
  leftRightArrowButton?: string;
  /**
   * Used for the next and previous range pages buttons.
   */
  leftRightRangeButton?: string;
  /**
   * Used for the regular page buttons.
   */
  pagesButton?: string;
}

interface PagerProps extends ReactToolbox.Props {
  /**
   *  Used for the previous button content.
   */
  prevButtonLabel?: string;
  /**
   * Used for the left range button content
   */
  rangeLeftButtonLabel?: string;
  /**
   * Used for the right range button content
   */
  rangeRightButtonLabel?: string;
  /**
   * Used for the next button content
   */
  nextButtonLabel?: string;
  /**
   * A Number with the currently selected page
   */
  currentPage?: number;
  /**
   * A Number of total pages.
   */
  totalPages?: number;
  /**
   * A Number of pages visible in control except next, previous and ranges buttons, the minimum value is 2.
   */
  visiblePagesBlockSize?: number;
  /**
   * Callback called when the page is changing.
   */
  onPageChange?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: PagerTheme;
  /**
   * This class will be applied to the root elemt.
   */
  pagerClassName?: string;
  /**
   * Defining default style of first, last page buttons. 
   * it can have following styles:
   *    accent,
   *    flat,
   *    inverse,
   *    mini,
   *    neutral,
   *    primary,
   *    raised,
   *    toggle
   */
  firstLastPagesButtonStyles?: object;
  /**
   * Defining default style of next, previous buttons. 
   * it can have following styles:
   *    accent,
   *    flat,
   *    inverse,
   *    mini,
   *    neutral,
   *    primary,
   *    raised,
   *    toggle
   */
  leftRightArrowButtonStyles?: object;
  /**
   * Defining default style of left, right range buttons. 
   * it can have following styles:
   *    accent,
   *    flat,
   *    inverse,
   *    mini,
   *    neutral,
   *    primary,
   *    raised,
   *    toggle
   */
  leftRightRangeButtonStyles?: object;
  /**
   * Defining default style of regular page buttons. 
   * it can have following styles:
   *    accent,
   *    flat,
   *    inverse,
   *    mini,
   *    neutral,
   *    primary,
   *    raised,
   *    toggle
   */
  pagesButtonStyles?: object;
}

export class Pager extends React.Component<PagerProps, {}> { }

export default Pager;
