# Additional components for react-toolbox components library

[![npm version](https://img.shields.io/badge/npm-v1.3.6-blue.svg?style=flat-square)](https://www.npmjs.org/package/react-toolbox-additions)

The project provides additions for react-toolbox library (http://react-toolbox.com/),
which are not defined at material design and therefore were not included to original react-toolbox components library,
but it could be useful to have. For now it is just set of two components, Pager and FilePicker. 
But I hope if the project will be intresting to somebody else I have a few more ideas about components.

## Installation

React Toolbox can be installed as an [npm package](https://www.npmjs.org/package/react-toolbox-additions):

```bash
$ npm install react-toolbox-additions
```
## Prerequisites

React Toolbox Additions require uses [react-toolbox](https://www.npmjs.com/package/react-toolbox) components library and [react] (https://www.npmjs.com/package/react).

Like react-toolbox authors I also would recommend [webpack](https://webpack.github.io/) to use module bundler.

The components can be customized via themes by using [react-css-themr](https://github.com/javivelasco/react-css-themr) which is also used by React Toolbox to make component easily themeable.

## Basic usage

Examples how to use.

Pager:

```js
import Pager from 'react-toolbox-additions/lib/pager';
import FontIcon from 'react-toolbox-additions/lib/font_icon';

const PagerTest = () => {

    onPageChange = (newPage, oldPage) => {
      console.info('Selected page : ' + newPage + ', Previous page: ' + oldPage);
    }

    return (
      <Pager 
        prevButtonLabel={(<FontIcon value='chevron_left' />)}
        nextButtonLabel={(<FontIcon value='chevron_right' />)}
        rangeLeftButtonLabel={(<FontIcon value='more_horiz' />)}
        rangeRightButtonLabel={(<FontIcon value='more_horiz' />)}
        totalPages={29}
        currentPage={5}
        visiblePagesBlockSize={3}
        onPageChange={onPageChange}
      />
  );
};
```

Accordion:

```jsx
import React, { PropTypes } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';
import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';
import { ListCheckbox, ListSubHeader, List, ListItem, ListDivider, ListItemText, ListItemContent } from 'react-toolbox/lib/list';

import { Accordion, Chord } from 'react-toolbox-additions/lib/accordion';
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
    );
  }
}
```

Also important notice from authors of react-toolbox:
"Take into account that any required style will be included in the final CSS so your final would include `Button` styles in this case. It's more convenient to import components this way (or with raw imports) because if you require from the project root, every stylesheet of React Toolbox will be included, even if you don't use it."

## Importing components

The project inherits the same style of component structures that is in react-toolbox project, what makes it easy to use for everybody who is familiar with react-toolbox components structure.
```
 |- /pager
 |---- pager.js
 |---- config.css
 |---- index.js
 |---- readme.md
 |---- theme.css
```

### Bundled component

```js
import { Pager } from 'react-toolbox-additions/lib/pager';
import { Accordion, Chord } from 'react-toolbox-additions/lib/accordion';
import { FilePicker } from 'react-toolbox-additions/lib/filepicker';
```

## Authors and Contributors

The project is being initially developed and maintained by [Max Komlev](https://github.com/MaximKomlev).

Steps to build project and run example locally.

```
$ git clone https://github.com/MaximKomlev/react-toolbox-additions.git
$ npm install
$ npm run build
$ npm start
```

Local example will be available at `http://localhost:8000/`.

## Components in bundle

Currently the library implements Pager, FilePicker and Accordion components.

## Changes

The log of changes is available [here](https://github.com/MaximKomlev/react-toolbox-additions/blob/master/changelog.md).

## License

This project is licensed under the terms of the [MIT license](https://github.com/MaximKomlev/react-toolbox-additions/blob/master/LICENSE).
