import React, { PropTypes } from 'react';

const Input = ({id, label, value, onChange, onClick}) => (
  <form>
    <label> {label} </label>
    <textarea id={id} onChange={onChange} />
    <button onClick={onClick}> Create </button>
  </form>
)

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Input