import React from 'react';
import { store } from '../stores/stores.js';

class CohortSelector extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectValue: this.props.current.cohortName
    };

    this.handleChange = this.handleChange.bind(this);
  };

  handleChange (e) {
    this.setState({selectValue:e.target.value});
    socket.emit('SWITCH_COHORT', e.target.value);
  };

  render () {
    return (
      <div>
        <select 
          value={this.state.selectValue} 
          onChange={this.handleChange} 
        >
          {this.props.allCohorts.map(cohort =>
            <option value={cohort}>{cohort}</option>
            )}
        </select>
      </div>        
    );
  };
};

export default CohortSelector;