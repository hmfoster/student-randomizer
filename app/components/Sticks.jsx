import React from 'react';
import NextStudent from './NextStudent.jsx';
import Groups from './Groups.jsx';
import CreateCohort from './CreateCohort.jsx';

const Sticks = ({numStudents, nextStudent, current, groups}) => {
  if(numStudents){
    return (
      <div>
        <NextStudent nextStudent={nextStudent} current={current}/>
        <Groups numStudents={numStudents} groups={groups} current={current} />
      </div>
    );
  }
  return null;

}

export default Sticks;
