import React from "react";

const Cell = ({ value, onChange, onFocus }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      className="cell"
    />
  );
};

export default Cell;
