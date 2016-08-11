import React from 'react';
import Input from './Input.js';

export class Students extends React.Component {

  render() {
    const students = Object.keys(this.props.students);
    return (
      <div>
        <h2> Students </h2>
        <Input 
          value= ''
          onClick={() => {
            socket.emit('ADD_STUDENTS', this.props.current, this.state.value);
          }} 
          onChange={(e) => {
            this.setState({value: e.target.value});
          }}
          label='Add new students; separate with a ","'
        />
        <ul> 
          {students.map((student, i) => 
            <li key={i}> {student}</li>
              
        
          )}
        </ul>
      </div>
    );
  }
}

export default Students;
