import React, { PropTypes } from 'react';

const Input = ({value, onChange, onClick}) => (
  <form>
    <label> New cohort name </label>
    <input type="text" onChange={onChange} />
    <button onClick={onClick}> Create </button>
  </form>
)

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Input