import React, { PropTypes } from 'react'
import { store } from '../stores/stores.js';
import Selector from './Selector.js';

class CohortSelector extends React.Component {

  render () {
    const options = [...this.props.allCohorts, 'Create New Cohort'];
    return (
      <Selector selectValue={this.props.currentName} 
          onChange={(e) => {
              this.setState.value = e.target.value;
              socket.emit('SWITCH_COHORT', e.target.value);
          }}
          options={options}
          choice='cohort'
      />
    );
  };
};

export default CohortSelector;