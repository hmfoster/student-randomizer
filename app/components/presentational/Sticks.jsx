import React, { PropTypes } from 'react';
import NextStudent from '../NextStudent.jsx';
import Groups from '../Groups.jsx';

const Sticks = ({ numStudents, nextStudent, current, groups }) => {
  if (numStudents) {
    return (
      <div>
        <NextStudent nextStudent={nextStudent} current={current} />
        <Groups numStudents={numStudents} groups={groups} current={current} />
      </div>
    );
  }
  return null;
};

Sticks.propTypes = {
  numStudents: PropTypes.number,
  nextStudent: PropTypes.string,
  current: PropTypes.string,
  groups: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

export default Sticks;
