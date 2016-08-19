import React, { PropTypes } from 'react';
import Selector from './presentational/Selector.jsx';
import store from '../stores/stores.js';


class CohortSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: 'Select a Cohort',
    };
  }
  render() {
    const options = ['Select a Cohort', ...this.props.allCohorts, 'Create New Cohort'];

    return (
      <Selector
        value={this.state.selectValue}
        onChange={(e) => {
          this.setState({ selectValue: e.target.value });
          if (e.target.value === 'Create New Cohort') {
            store.dispatch({
              type: 'SWITCH_COHORT',
              cohortName: 'Create',
            });
          } else {
            socket.emit('SWITCH_COHORT', e.target.value);
          }
        }}
        options={options}
        choice="cohort"
        label="New cohort name"
      />
    );
  }
}

CohortSelector.propTypes = {
  allCohorts: PropTypes.arrayOf(PropTypes.string),
};

export default CohortSelector;
