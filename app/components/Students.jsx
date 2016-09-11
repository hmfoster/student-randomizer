import React, { PropTypes } from 'react';
import Input from './presentational/Input.jsx';
import Student from './presentational/Student.jsx';
import store from '../stores/stores.js';

export class Students extends React.Component {
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
    const students = Object.keys(current.students);
    return (
      <div>
        <h2> Students </h2>
        <Input
          onClick={() => {
            document.getElementById('add-students').value = '';
            socket.emit('ADD_STUDENTS', current.cohortName, this.state.value);
          }}
          onChange={(e) => {
            this.setState({ value: e.target.value });
          }}
          label='Add new students; separate with a "," or a new line '
          id="add-students"
        />
        <ul>
          {students.map((student, i) =>
            <li key={i}>
              <Student
                onClick={() => {
                  socket.emit('DELETE_STUDENT', current.cohortName, student);
                }}
                student={student}
              />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

Students.propTypes = {
  students: PropTypes.arrayOf(PropTypes.string),
  current: PropTypes.string,
};

export default Students;
