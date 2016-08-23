import React from 'react';
import Selector from './presentational/Selector.jsx';
import store from '../stores/stores.js';


class CohortSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: 'Select a Cohort',
    };
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const allCohorts = Object.keys(store.getState().allCohorts);
    const options = ['Select a Cohort', ...allCohorts, 'Create New Cohort'];

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

export default CohortSelector;
