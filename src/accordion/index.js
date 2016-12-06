import { themr } from 'react-css-themr';
import { ACCORDION } from '../identifiers.js';
import { accordionFactory } from './accordion.js';
import { Chord } from './chord.js';
import theme from './theme.scss';

const applyTheme = (Component) => themr(ACCORDION, theme)(Component);
const ThemedChord = applyTheme(Chord);
const ThemedAccordion = applyTheme(accordionFactory(ThemedChord));

export { ThemedChord as Chord };
export { ThemedAccordion as Accordion };
