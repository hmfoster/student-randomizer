import React, { PropTypes } from 'react';

const Student = ({ student, onClick }) => (
  <p> <a href="delete" onClick={onClick}> X </a> {student} </p>
);

Student.propTypes = {
  student: PropTypes.string,
  onClick: PropTypes.func.required,
};

export default Student;
