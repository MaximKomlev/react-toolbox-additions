import { themr } from 'react-css-themr';
import { PAGER } from '../identifiers.js';
import { pagerFactory } from './pager.js';
import Page from './page.js';
import theme from './theme.css';

const Pager = pagerFactory(Page);

const ThemedPager = themr(PAGER, theme)(Pager);
export default ThemedPager;
export { ThemedPager as Pager };
