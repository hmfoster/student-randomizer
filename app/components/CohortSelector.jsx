import React, { PropTypes } from 'react'
import { store } from '../stores/stores.js';
import Selector from './Selector.js';

class CohortSelector extends React.Component {

  render () {
    return (
      <Selector selectValue={this.props.currentName} 
          onChange={(e) => {
              this.selectValue = e.target.value;
              socket.emit('SWITCH_COHORT', e.target.value);
          }}
          options={this.props.allCohorts}
          choice='cohort'
      />
    );
  };
};

export default CohortSelector;