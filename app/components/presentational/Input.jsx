import React, { PropTypes } from 'react';

const Input = ({ id, onChange, onClick }) => (
  <form>
    <textarea id={id} onChange={onChange} />
    <button onClick={onClick}> Create </button>
  </form>
);

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default Input;
