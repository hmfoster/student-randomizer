import React from 'react';

const NextStudent = ({current, nextStudent}) => (
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

export default NextStudent;

