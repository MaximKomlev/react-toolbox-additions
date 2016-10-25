import React, { PropTypes } from 'react';

import FilePicker from '../../lib/filepicker';
import style from '../style';

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

  render () {

    return (
      <section>
        <h5>FilePicker</h5>
        <p>FilePicker based on ToolBox components.</p>

        <div className={style.filepicker}>

          <FilePicker
              buttonText={'BROWSE'}
              inputText={'FILE 1'}
              value={''}
              onFileChange={this.onChange1.bind(this)} />

          <FilePicker
              inline
              buttonText={'BROWSE'}
              inputText={'FILE 2'}
              value={''}
              onFileChange={this.onChange2.bind(this)} />

          <FilePicker
              inline
              raised 
              primary
              icon='folder_open'
              buttonText={'BROWSE'}
              inputText={'FILE 3'}
              value={''}
              onFileChange={this.onChange3.bind(this)} />

        </div>

      </section>
    );
  }
}

export default FilePickerTest;
