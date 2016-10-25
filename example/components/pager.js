import React, { PropTypes } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';
import Input from 'react-toolbox/lib/input';

import Pager from '../../lib/pager';
import style from '../style';

class PagerTest extends React.Component {

  static propTypes = {
    visiblePagesBlockSize: PropTypes.number
  };

  static defaultProps = {
    visiblePagesBlockSize: 3
  }

  state = {
    lastPage: 29,
    currentPage: 5
  }

  onInputChange = (name, value) => {
    const state = this.state;

    state[name] = value;

    this.setState({
        ...state
    });
  }

  onPageChange (newPage, oldPage) {
    console.info('Selected page : ' + newPage + ', Previous page: ' + oldPage);
  }

  render () {

    return (
      <section>
        <h5>Pager</h5>
        <p>Pager based on ToolBox components.</p>

        <div className={style.pager}>
          <Pager
              prevButtonContent={<FontIcon value='chevron_left' />}
              nextButtonContent={<FontIcon value='chevron_right' />}
              rangeLeftButtonContent={<FontIcon value='more_horiz' />}
              rangeRightButtonContent={<FontIcon value='more_horiz' />}
              lastPage={this.state.lastPage}
              currentPage={this.state.currentPage}
              visiblePagesBlockSize={this.props.visiblePagesBlockSize}
              onPageChange={this.onPageChange}
          />
        </div>

        <Input
          type='number'
          value={this.state.lastPage}
          label='Last Page' onChange={this.onInputChange.bind(this, 'lastPage')}
        />

      </section>
    );
  }
}

export default PagerTest;
