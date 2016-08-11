import React from 'react';
import Input from './Input.js';

export class Students extends React.Component {

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Students;
