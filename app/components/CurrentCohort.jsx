import React from 'react';
import Sticks from './presentational/Sticks.jsx';
import Students from './Students.jsx';
import CreateCohort from './CreateCohort.jsx';
import store from '../stores/stores.js';

// class CurrentCohort extends React.Component {

// }
const CurrentCohort = () => {
  const current = store.getState();

  if (current.cohortName === 'Create') {
    return <CreateCohort />;
  } else if (current.cohortName === '' || current.cohortName === 'Select') {
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
      <Sticks
        current={current.cohortName}
        nextStudent={current.nextStudent}
        groups={current.groups}
        numStudents={Object.keys(current.students).length}
      />
      <Students current={current.cohortName} students={Object.keys(current.students)} />
    </div>
  );
};

export default CurrentCohort;
