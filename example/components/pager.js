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
    totalPages: 29,
    currentPage: 5
  }

  onInputChange = (name, value) => {
    const state = this.state;

    state[name] = value;

    this.setState({
        ...state
    });
  }

  onPageChange1 = (newPage, oldPage) => {
    console.info('Selected page : ' + newPage + ', Previous page: ' + oldPage);
  }

  onPageChange2 = (newPage, oldPage) => {
    console.info('Selected page : ' + newPage + ', Previous page: ' + oldPage);
  }

  render () {

    return (
      <section>
        <h5>Pager</h5>
        <p>Pager based on ToolBox components with default button styles. Example: 1.</p>
        
        <div className={style.pager}>
          <Pager
              prevButtonLabel={<FontIcon value='chevron_left' />}
              nextButtonLabel={<FontIcon value='chevron_right' />}
              rangeLeftButtonLabel={<FontIcon value='more_horiz' />}
              rangeRightButtonLabel={<FontIcon value='more_horiz' />}
              totalPages={this.state.totalPages}
              currentPage={this.state.currentPage}
              visiblePagesBlockSize={this.props.visiblePagesBlockSize}
              onPageChange={this.onPageChange1}
          />
        </div>
        
        

        <p>Pager based on ToolBox components with custom button styles. Example: 2.</p>
        
        <div className={style.pager}>
          <Pager
              prevButtonLabel={<FontIcon value='chevron_left' />}
              nextButtonLabel={<FontIcon value='chevron_right' />}
              rangeLeftButtonLabel={<FontIcon value='more_horiz' />}
              rangeRightButtonLabel={<FontIcon value='more_horiz' />}
              leftRightArrowButtonStyles={{flat: true, primary: true}}
              leftRightRangeButtonStyles={{primary: true}}
              totalPages={this.state.totalPages}
              currentPage={this.state.currentPage}
              visiblePagesBlockSize={this.props.visiblePagesBlockSize}
              onPageChange={this.onPageChange2}
          />
        </div>
        
        

        <p>Pager based on ToolBox components with custom button styles. Example: 3.</p>
        
        <div className={style.pager}>
          <Pager
              prevButtonLabel={<FontIcon value='chevron_left' />}
              nextButtonLabel={<FontIcon value='chevron_right' />}
              rangeLeftButtonLabel={<FontIcon value='more_horiz' />}
              rangeRightButtonLabel={<FontIcon value='more_horiz' />}
              leftRightArrowButtonStyles={{ primary: true, raised: true }}
              leftRightRangeButtonStyles={{ raised: true}}
              pagesButtonStyles={{raised: true }}
              firstLastPagesButtonStyles={{ raised: true}}
              totalPages={this.state.totalPages}
              currentPage={this.state.currentPage}
              visiblePagesBlockSize={this.props.visiblePagesBlockSize}
              onPageChange={this.onPageChange2}
          />
        </div>
        
        

        <p>Pager based on ToolBox components with custom theme. Example: 4.</p>
        
        <div className={style.pager}>
          <Pager
              prevButtonLabel={<FontIcon value='chevron_left' />}
              nextButtonLabel={<FontIcon value='chevron_right' />}
              rangeLeftButtonLabel={<FontIcon value='more_horiz' />}
              rangeRightButtonLabel={<FontIcon value='more_horiz' />}
              leftRightArrowButtonStyles={{ primary: true, raised: true }}
              leftRightRangeButtonStyles={{ raised: true}}
              pagesButtonStyles={{raised: true }}
              firstLastPagesButtonStyles={{ raised: true}}
              totalPages={this.state.totalPages}
              currentPage={this.state.currentPage}
              visiblePagesBlockSize={this.props.visiblePagesBlockSize}
              onPageChange={this.onPageChange2}
              theme={style}
          />
        </div>

        
        

        <p>Pager based on ToolBox components with custom theme. Example: 5.</p>
        
        <div className={style.pager}>
          <Pager
              prevButtonLabel={<FontIcon value='chevron_left' />}
              nextButtonLabel={<FontIcon value='chevron_right' />}
              rangeLeftButtonLabel={<FontIcon value='more_horiz' />}
              rangeRightButtonLabel={<FontIcon value='more_horiz' />}
              leftRightArrowButtonStyles={{ primary: true}}
              firstLastPagesButtonStyles={{ raised: true}}
              totalPages={this.state.totalPages}
              currentPage={this.state.currentPage}
              visiblePagesBlockSize={this.props.visiblePagesBlockSize}
              onPageChange={this.onPageChange2}
              theme={style}
          />
        </div>
        

        <Input
          type='number'
          value={this.state.totalPages}
          label='Last Page' onChange={this.onInputChange.bind(this, 'totalPages')}
        />

      </section>
    );
  }
}

export default PagerTest;
