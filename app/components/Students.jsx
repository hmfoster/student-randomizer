import React from 'react';
import Input from './presentational/Input.js';
import Student from './presentational/Student.js';

export class Students extends React.Component {

  render() {
    const students = this.props.students;
    return (
      <div>
        <h2> Students </h2>
        <Input 
          onClick={() => {
            document.getElementById('add-students').value = "";
            socket.emit('ADD_STUDENTS', this.props.current, this.state.value);
          }} 
          onChange={(e) => {
            this.setState({value: e.target.value});
          }}
          label='Add new students; separate with a "," or a new line '
          id='add-students'
        />
        <ul> 
          {students.map((student, i) => 
            <li key={i}>
              <Student 
                onClick={()=>{
                  socket.emit('DELETE_STUDENT', this.props.current, student);
                }} 
                student={student}
              />
            </li>
              
        
          )}
        </ul>
      </div>
    );
  };
};

export default Students;
