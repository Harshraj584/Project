import React from "react";
import Cell from "./Cell";
import "./Grid.css";

const Grid = ({
  grid,
  setGrid,
  selectedCell,
  setSelectedCell,
  handleCellChange,
  evaluateFormula,
}) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={evaluateFormula(cell)}
              onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
              onFocus={() => setSelectedCell({ row: rowIndex, col: colIndex })}
              isSelected={
                selectedCell.row === rowIndex && selectedCell.col === colIndex
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
