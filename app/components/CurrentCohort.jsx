import React from 'react';
import Sticks from './Sticks.jsx';
import Students from './Students.jsx';
import CreateCohort from './CreateCohort.jsx';

export default class CurrentCohort extends React.Component {
  render() {
    const current = this.props.current;
    if (current.cohortName === 'Create'){
        return (
            <CreateCohort />
        )
    }
    else if (this.props.current.cohortName !== '' && this.props.current.cohortName !== 'Select'){
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
          />
          <Students current={current.cohortName} students={current.students}/>
        </div>
      )
    } else {
        return null;
    }
  }
}
