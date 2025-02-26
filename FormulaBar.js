import React from "react";

const FormulaBar = ({ value, onChange }) => {
  return (
    <div className="formula-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter value or formula"
      />
    </div>
  );
};

export default FormulaBar;
