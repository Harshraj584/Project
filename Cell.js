import React from "react";

const Cell = ({ value, formatting = {}, onChange, onFocus, isSelected }) => {
  const applyFormatting = (text, formatting) => {
    if (!text) return text;
    if (formatting.trim) text = text.trim();
    if (formatting.upper) text = text.toUpperCase();
    if (formatting.lower) text = text.toLowerCase();
    return text;
  };

  const formattedValue = applyFormatting(value, formatting);

  return (
    <input
      type="text"
      value={formattedValue}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      className={`cell ${isSelected ? "selected" : ""}`}
      style={{
        fontWeight: formatting.bold ? "bold" : "normal",
        fontStyle: formatting.italic ? "italic" : "normal",
      }}
    />
  );
};

export default Cell;
