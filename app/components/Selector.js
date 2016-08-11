import React, { PropTypes } from 'react';

const Selector = ({selectValue, onChange, options, choice}) => (
  <select 
    value={selectValue} 
    onChange={onChange} 
  >
    <option key='initial' value='initial'>Select a {choice} </option>
    {options.map((option, i) =>
      <option key={i} value={option}>{option}</option>
      )}
  </select>
)

Selector.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default Selector