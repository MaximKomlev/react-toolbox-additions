# Pager

Provides functionality of filepicker control, actually the component is not defined at(https://www.google.com/design/spec/components), 
but designed by using standard components from material design utilizing react-toolbox components library (http://react-toolbox.com/). 
It is easy to use and configure, also it is highly customizable.

<!-- example -->
```jsx
import Pager from 'react-toolbox-additions/lib/filepicker';

const FilePickerTest = () => {

    onChange (fobj, fname) {
      console.info('Selected file : ' + fname);
    }

    return (
        <FilePicker
            inline
            raised 
            primary
            icon='folder_open'
            buttonText={'BROWSE'}
            inputText={'FILE 3'}
            value={''}
            onFileChange={this.onChange.bind(this)} 
            />
  );
};
```

If you want to provide a theme via context, the component key is `ERTFilePicker`.

## Properties

| Name          | Type        | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`       | `String`    | ``                  | This class will be applied to the root elemt.|
| `buttonText`      | `String`    | `BROWSE`            | Used for the button text.|
| `inputText`       | `String`    | ``                  | Used for the input default text.|
| `inline`          | `boolean`   | false               | If true, the component will apear inline.|
| `onFileChange`    | `Function`  |                     | Callback called when the input is changing.|
| `theme`           | `String`    |                     | Classnames object defining the component style.|
| `value`           | `String`    | ``                  | This is initial value of input component.|


## Theme

| Name     | Description|
|:---------|:-----------|
| `filepicker` | Used for the root element.|
| `input`      | Used for the input element.|
| `inline`     | Used for inline style of component.|
| `button`     | Used for the button element.|
