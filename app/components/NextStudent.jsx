import React, { PropTypes } from 'react';

const NextStudent = ({ current, nextStudent }) => (
  <div>
    <button
      onClick={() => {
        socket.emit('PICK_STUDENT', current);
      }
    }
    >
      Pick a student!
    </button>
    <h2>
      {nextStudent}
    </h2>
  </div>
);

NextStudent.propTypes = {
  current: PropTypes.string,
  nextStudent: PropTypes.string,
};

export default NextStudent;
