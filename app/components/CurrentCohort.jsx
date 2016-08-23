import React from 'react';
import Sticks from './presentational/Sticks.jsx';
import Students from './Students.jsx';
import CreateCohort from './CreateCohort.jsx';
import store from '../stores/stores.js';

class CurrentCohort extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const current = store.getState().currentCohort;
    if (current.cohortName === 'Create') {
      return <CreateCohort />;
    } else if (current.cohortName === undefined || current.cohortName === 'Select') {
      return <p> Select a Cohort </p>;
    }
    return (
      <div>
        <h1>{current.cohortName}</h1>
        <button
          onClick={() => {
            socket.emit('DELETE_COHORT', current.cohortName);
          }}
        >
          Delete Cohort
        </button>
        <Sticks />
        <Students current={current.cohortName} students={Object.keys(current.students)} />
      </div>
    );
  }
}

export default CurrentCohort;
