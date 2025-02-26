import React from "react";
import { trim, upper, lower } from "../dataQualityFunctions";

const Toolbar = ({ grid, setGrid, selectedCell, handleCellChange }) => {
  const handleFormat = (format) => {
    const { row, col } = selectedCell;
    const newGrid = [...grid];
    newGrid[row][col] = format(grid[row][col]);
    setGrid(newGrid);
  };

  return (
    <div className="toolbar">
      <button onClick={() => handleFormat((text) => `<b>${text}</b>`)}>Bold</button>
      <button onClick={() => handleFormat((text) => `<i>${text}</i>`)}>Italic</button>
      <button onClick={() => handleFormat(trim)}>Trim</button>
      <button onClick={() => handleFormat(upper)}>UPPER</button>
      <button onClick={() => handleFormat(lower)}>lower</button>
    </div>
  );
};

export default Toolbar;
