import React from 'react';

const Student = ({student, onClick}) => (
  <p> <a href="#" onClick={onClick}> X </a> {student} </p>
);

export default Student;