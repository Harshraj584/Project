import React from "react";

const Toolbar = ({ grid, selectedCell, handleFormattingChange }) => {
  const { row, col } = selectedCell;
  const currentFormatting = grid[row]?.[col]?.formatting || {};

  const toggleFormatting = (format) => {
    const newFormatting = { ...currentFormatting, [format]: !currentFormatting[format] };
    handleFormattingChange(row, col, newFormatting);
  };

  return (
    <div className="toolbar">
      <button
        onClick={() => toggleFormatting("bold")}
        style={{ fontWeight: currentFormatting.bold ? "bold" : "normal" }}
      >
        Bold
      </button>
      <button
        onClick={() => toggleFormatting("italic")}
        style={{ fontStyle: currentFormatting.italic ? "italic" : "normal" }}
      >
        Italic
      </button>
      <button onClick={() => handleFormattingChange(row, col, { ...currentFormatting, trim: true })}>
        Trim
      </button>
      <button onClick={() => handleFormattingChange(row, col, { ...currentFormatting, upper: true })}>
        UPPER
      </button>
      <button onClick={() => handleFormattingChange(row, col, { ...currentFormatting, lower: true })}>
        lower
      </button>
    </div>
  );
};

export default Toolbar;
