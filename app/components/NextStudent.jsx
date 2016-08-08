import React from 'react';

class NextStudent extends React.Component {
    render () {
        return (
          <div>
            <button onClick={() => {
                socket.emit('PICK_STUDENT',this.props.current);
              }
            }
            >
            Pick a student!
            </button>
            <h2> 
              {this.props.nextStudent}
            </h2>
          </div>
        );
    }
}

export default NextStudent;

