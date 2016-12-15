import React, { PropTypes } from 'react';
import FontIcon from 'react-toolbox/lib/font_icon';
import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';
import { ListCheckbox, ListSubHeader, List, ListItem, ListDivider, ListItemText, ListItemContent } from 'react-toolbox/lib/list';

import {Accordion, Chord} from '../../lib/accordion';
import style from '../style.css';

class AccordionTest extends React.Component {

  static propTypes = {
  };

  static defaultProps = {
  }

  state = {
    index1: 0,
    index2: 0
  }

  onChange1 = (idx) => {
    this.setState({
      index1: idx
    });
  }

  onChange2 = (idx) => {
    this.setState({
      index2: idx
    });
  }

  onActive1 = () => {
    console.info('Selected chord: ' + this.state.index1);
  }

  onActive2 = () => {
    console.info('Selected chord: ' + this.state.index1);
  }

  onActive3 = () => {
    console.info('Selected chord: ' + this.state.index1);
  }

  render () {

    return (
      <section>
        <h5>Accordion</h5>
        <p>Accordion component.</p>
        
        <div className={style.accordion}>
          <Accordion
            className={style.accordion}
            index={this.state.index1}
            onChange={this.onChange1}
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
        </div>


        <p>Themed accordion component.</p>
        
        <div className={style.accordion}>
          <Accordion
            disableAnimation={true}
            index={this.state.index2}
            onChange={this.onChange2}
            theme={style}
          >
            <Chord
              label='Number One'
            >
              <div className={style['accordion-body2']}>
                The project provides additions for react-toolbox which are not defined at material design and therefore were not included to original react-toolbox components library but it could be useful to have.
              </div>
            </Chord>
            <Chord
              labelIcon={<FontIcon value='build' />}
              label='Number Two'
            >

              <Input
                type='number'
                value={1000}
                label='Number'
              />

              <Button
                label='Click Me'
              />

            </Chord>
            <Chord
              labelIcon={'view_list'}
              label='Number Three'
              labelPostIcon={this.state.index2 === 2 ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
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
        </div>
      </section>
    );
  }
}

export default AccordionTest;
