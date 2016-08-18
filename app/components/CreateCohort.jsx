import React from 'react';
import Input from './presentational/Input.js';


const CreateCohort = () => (
  <Input
    label='Create a Cohort'
    id='create-cohort'
    onClick={() => {
      document.getElementById('create-cohort').value = "";
      socket.emit('CREATE_COHORT', this.state.value);
    }} 
    onChange={(e) => {
      this.setState({value: e.target.value});
    }}
    value=''
  />
);

export default CreateCohort;