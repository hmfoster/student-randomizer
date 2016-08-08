import React from 'react';
import { store } from '../stores/stores.js';

class CohortSelector extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      selectValue: this.props.current
    };

    this.handleChange = this.handleChange.bind(this);
  };

  handleChange (e) {
    this.setState({selectValue:e.target.value});
    store.dispatch({
      type: 'SWITCH_COHORT',
      cohortName: e.target.value
    });
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