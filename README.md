# Additional components for react-toolbox components library

[![npm version](https://img.shields.io/badge/npm-v1.1.2-blue.svg?style=flat-square)](https://www.npmjs.org/package/react-toolbox-additions)

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

Here is example how to use:

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

Also important notice from authors of react-toolbox:
"Take into account that any required style will be included in the final CSS so your final would include `Button` styles in this case. It's more convenient to import components this way (or with raw imports) because if you require from the project root, every stylesheet of React Toolbox will be included, even if you don't use it."

## Importing components

The project inherits the same style of component structures that is in react-toolbox project, what makes it easy to use for everybody who is familiar with react-toolbox components structure.
```
 |- /pager
 |---- pager.js
 |---- _config.scss
 |---- index.js
 |---- readme.md
 |---- theme.scss
```

### Bundled component

```js
import { Pager } from 'react-toolbox-additions/lib/pager';
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

## License

This project is licensed under the terms of the [MIT license](https://github.com/MaximKomlev/react-toolbox-additions/blob/master/LICENSE).
