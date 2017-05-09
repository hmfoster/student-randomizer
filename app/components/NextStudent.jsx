import React from 'react';
import store from '../stores/stores.js';

class NextStudent extends React.Component {
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
    return (
      <div>
        <button
          onClick={() => {
            socket.emit('PICK_STUDENT', current.cohortName);
          }
        }
        >
          Pick a student!
        </button>
        <button
          onClick={() => {
            socket.emit('SKIP_STUDENT', current.cohortName);
          }
        }
        >
          Skip
        </button>
        <h2>
          {current.nextStudent}
        </h2>
      </div>
    );
  }
}

export default NextStudent;
