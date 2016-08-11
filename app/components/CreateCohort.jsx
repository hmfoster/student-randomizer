import React from 'react';
import Input from './Input.js';

class CreateCohort extends React.Component {
  render(){
    return (
      <Input 
        onClick={() => {
          socket.emit('CREATE_COHORT', this.state.value);
        }} 
        onChange={(e) => {
          this.setState({value: e.target.value});
        }}
        value=''
      />
    )
  }
}

export default CreateCohort;