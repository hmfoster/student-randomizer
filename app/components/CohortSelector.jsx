import React, { PropTypes } from 'react'
import { store } from '../stores/stores.js';
import Selector from './Selector.js';

class CohortSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: 'Select a Cohort'
    };
  }
  render () {
    const options = ['Select a Cohort',...this.props.allCohorts, 'Create New Cohort'];

    return (
      <Selector value={this.state.selectValue} 
          onChange={(e) => {
            this.setState({selectValue: e.target.value});
            socket.emit('SWITCH_COHORT', e.target.value);
          }}
          options={options}
          choice='cohort'
          label='New cohort name'
      />
    );
  };
};

export default CohortSelector;