import React, { PropTypes } from 'react';

import FilePicker from '../../lib/filepicker';
import style from '../style.css';

class FilePickerTest extends React.Component {

  state = {
  }

  onChange1 (fobj, fname) {
    console.info('Selected file1 : ' + fname);
  }

  onChange2 (fobj, fname) {
    console.info('Selected file2 : ' + fname);
  }

  onChange3 (fobj, fname) {
    console.info('Selected file3 : ' + fname);
  }

  onChange4 (fobj, fname) {
    console.info('Selected file4 : ' + fname);
  }

  render () {

    return (
      <section>
        <h5>FilePicker</h5>
        <p>FilePicker based on ToolBox components.</p>

        <div className={style.filepicker}>

          <FilePicker
              buttonProperties={{label: 'BROWSE'}}
              inputProperties={{label: 'Select File'}}
              value={'temp.txt'}
              onChange={this.onChange1.bind(this)} />

          <FilePicker
              inline
              buttonProperties={{label: 'BROWSE'}}
              inputProperties={{label: 'Please Select File'}}
              onChange={this.onChange2.bind(this)} />

          <FilePicker
              inline
              buttonProperties={{label: 'BROWSE', raised: true, primary: true, icon: 'folder_open'}}
              inputProperties={{label: 'Please Select File'}}
              value={''}
              onChange={this.onChange3.bind(this)} />

          <FilePicker
              buttonProperties={{label: 'BROWSE', raised: true, primary: true, icon: 'folder_open'}}
              inputProperties={{hint: 'Please Select File', icon: 'folder_open' }}
              onChange={this.onChange4.bind(this)} />

        </div>

      </section>
    );
  }
}

export default FilePickerTest;
