import React, { PropTypes } from 'react';

const Selector = ({ selectValue, onChange, options }) => (
  <select
    value={selectValue}
    onChange={onChange}
  >
    {options.map((option, i) =>
      <option key={i} value={option}>{option}</option>
      )}
  </select>
);

Selector.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  selectValue: PropTypes.any,
};

export default Selector;
