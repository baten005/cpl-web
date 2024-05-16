// RadioButton.js
import React from 'react';

function RadioButton(props) {
  const { value, selected, onClick } = props;

  const handleClick = () => {
    onClick(value);
  };

  return (
    <button
      className={`btn ${selected ? 'btn-danger' : 'btn-success'}`}
      onClick={handleClick}
      style={{margin:'0 6px 10px 5px'}}
    >
      {value}
    </button>
  );
}

export default RadioButton;
