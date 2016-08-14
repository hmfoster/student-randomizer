import React from 'react';
import Sticks from './Sticks.jsx';
import Students from './Students.jsx';
import CreateCohort from './CreateCohort.jsx';

const CurrentCohort = ({current}) => {
  if (current.cohortName === 'Create'){
    return (
      <CreateCohort />
    )
  }
  else if (current.cohortName !== '' && current.cohortName !== 'Select'){
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
        <Students current={current.cohortName} students={Object.keys(current.students)}/>
      </div>
    )
  } else {
      return null;
  }
  
};

export default CurrentCohort;
