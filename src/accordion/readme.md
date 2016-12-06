# Accordion

Provides functionality of Accordion control, actually the component is not defined at(https://www.google.com/design/spec/components), 
but designed by using standard components from material design utilizing react-toolbox components library (http://react-toolbox.com/). 
It is easy to use and configure, also it is highly customizable.

<!-- example -->
```jsx
import React, { PropTypes } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';
import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';
import { ListCheckbox, ListSubHeader, List, ListItem, ListDivider, ListItemText, ListItemContent } from 'react-toolbox/lib/list';

import {Accordion, Chord} from '../../lib/accordion';
import style from '../style';

class AccordionTest extends React.Component {

  static propTypes = {
  };

  static defaultProps = {
  }

  state = {
    index: 0
  }

  onChange = (idx) => {
    this.setState({
      index: idx
    });
  }

  onActive1 = () => {
    console.info('Selected chord: ' + this.state.index);
  }

  onActive2 = () => {
    console.info('Selected chord: ' + this.state.index);
  }

  onActive3 = () => {
    console.info('Selected chord: ' + this.state.index);
  }

  render () {

    return (
      <section>
        <h5>Accordion</h5>
        <p>Accordion component.</p>
        
        <div className={style.accordion}>
          <Accordion
            className={style.accordion}
            index={this.state.index}
            onChange={this.onChange}
          >
            <Chord
              label='Number One'
              onActive={this.onActive1}
            >
              <div className={style['accordion-body2']}>
                The project provides additions for react-toolbox which are not defined at material design and therefore were not included to original react-toolbox components library but it could be useful to have.
              </div>
            </Chord>
            <Chord
              labelIcon={<FontIcon value='build' />}
              label='Number Two'
              onActive={this.onActive2}
            >
              <div className={style['accordion-body1']} >
                <Input
                  type='number'
                  value={1000}
                  label='Number'
                />

                <Button
                  label='Click Me'
                />
              </div>

            </Chord>
            <Chord
              labelIcon={'view_list'}
              label='Number Three'
              labelPostIcon={this.state.index1 === 2 ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
              onActive={this.onActive3}
            >
              <List selectable ripple>
                <ListSubHeader caption='Contacts' />
                <ListItem caption='Inbox' leftIcon='inbox' />
                <ListItem caption='Outbox' selectable={false} ripple={false} leftIcon='send' />
                <ListItem caption='Trash' leftIcon='delete' />
                <ListItem caption='Spam' leftIcon='report' />
              </List>
            </Chord>
          </Accordion>
        </div>

      </section>
    );
  }
}
```

If you want to provide a theme via context, the component key is `ERTAccordion`.

## Accordion

This component is a wrapper and the main controller of the content that is being displayed as his children.

### Properties

| Name                          | Type            | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`                   | `String`        | `''`            | Additional class name to provide custom styling.|
| `disableAnimation` | `Boolean`       | `false`         | Disable the animation on children expanding/collapsing.|
| `index`                       | `Number`        | `0`             | Expanded child |
| `children`                     | `Elements`       | []         | Collection of children <Chord>.|
| `onChange`                    | `Function`      |                 | Callback function that is fired when the chord changes.|

### Theming

| Name     | Description|
|:---------|:-----------|
| `accordion` | Used for the root element.|

## Chord

Represent a single child element with some properties to describe the chors itself and get children elements as content.

### Properties

| Name              | Type            | Default         | Description|
|:-----|:-----|:-----|:-----|
| `active`          | `Boolean`       | `false`         | If true, the current component is expanded.|
| `activeClassName` | `String`        | `''`            | Additional class name to provide custom styling for the expanded chord.|
| `className`       | `String`        | `''`            | Additional class name to provide custom styling for each chord.|
| `disabled`        | `Boolean`       | `false`         | If true, the current chord component is not clickable.|
| `hidden`          | `Boolean`       | `false`         | If true, the current chord component is not visible.|
| `label`           | `String`        |                 | Label text for the chord header. |
| `labelIcon`       | `String`        |                 | Icon for chord header. |
| `labelPostIcon`   | `String`        |                 | Icon behind of the label for chord header. |
| `onActive`        | `Function`      |                 | Callback function that is fired when the chord is expanded. |
| `onClick`         | `Function`      |                 | Callback function that is fired when the chord label is clicked. |

It is required to provide either a label or an icon (or both).

### Theme

| Name     | Description|
|:---------|:-----------|
| `active` | Added to the chord element (label and content) in case it's active.|
| `disabled` | Added to the chord element in case it's disabled.|
| `hidden` | Added to the chord element in case it's hidden.|
| `label` | Base style of header of chord element.|
| `content` | Base style of content of chord element.|
