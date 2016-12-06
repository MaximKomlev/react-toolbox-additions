import React from 'react';

import {Card} from 'react-toolbox/lib/card';

import Pager from './components/pager';
import FilePicker from './components/filepicker';
import Accordion from './components/accordion';
import style from './style';

const Root = () => (
  <div>
    <Card className={style.card}>
      <Pager />
    </Card>
    <Card className={style.card}>
      <FilePicker />
    </Card>
    <Card className={style.card}>
      <Accordion />
    </Card>
  </div>
);

export default Root;
