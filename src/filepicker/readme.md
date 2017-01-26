# Pager

Provides functionality of filepicker control, actually the component is not defined at(https://www.google.com/design/spec/components), 
but designed by using standard components from material design utilizing react-toolbox components library (http://react-toolbox.com/). 
It is easy to use and configure, also it is highly customizable.

<!-- example -->
```jsx
import FilePicker from 'react-toolbox-additions/lib/filepicker';

const FilePickerTest = () => {

    onChange (fobj, fname) {
      console.info('Selected file : ' + fname);
    }

    return (
        <FilePicker
            buttonProperties={{label: 'BROWSE', raised: true, primary: true, icon: 'folder_open'}}
            inputProperties={{hint: 'Please Select File', icon: 'folder_open' }}
            value=''
            onChange={this.onChange.bind(this)} />
  );
};
```

If you want to provide a theme via context, the component key is `ERTFilePicker`.

## Properties

| Name          | Type        | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`           | `String`    | ``                      | This class will be applied to the root elemt.|
| `buttonProperties`    | `String`    | {label: 'BROWSE'}       | This is button base properties like: accent, disabled, icon, ...|
| `inputProperties`     | `String`    | {label: 'SELECT FILE'}  | This is input base properties like: hint, disabled, icon, ...|
| `inline`              | `boolean`   | false                   | If true, the component will apear inline.|
| `onChange`            | `Function`  |                         | Callback called when the input is changing.|
| `theme`               | `String`    |                         | Classnames object defining the component style.|
| `value`               | `String`    | ``                      | This is initial value of input component.|


## Theme

| Name     | Description|
|:---------|:-----------|
| `filepicker` | Used for the root element.|
| `input`      | Used for the input element.|
| `inline`     | Used for inline style of component.|
| `button`     | Used for the button element.|
