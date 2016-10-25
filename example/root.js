import React from 'react';

import {Card} from 'react-toolbox/lib/card';

import Pager from './components/pager';
import FilePicker from './components/FilePicker';
import style from './style';

const Root = () => (
  <div>
    <Card className={style.card}>
      <Pager />
    </Card>
    <Card className={style.card}>
      <FilePicker />
    </Card>
  </div>
);

export default Root;
