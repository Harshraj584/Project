import React, { useState, useEffect } from "react";
import Toolbar from "./components/Toolbar";
import FormulaBar from "./components/FormulaBar";
import Cell from "./components/Cell";
import "./App.css";

const ROWS = 50;
const COLS = 26;

const App = () => {
  const [grid, setGrid] = useState(() => {
    const savedGrid = JSON.parse(localStorage.getItem("grid"));
    return savedGrid || Array(ROWS).fill().map(() => Array(COLS).fill(""));
  });

  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

  useEffect(() => {
    localStorage.setItem("grid", JSON.stringify(grid));
  }, [grid]);

  const handleCellChange = (row, col, value) => {
    const newGrid = [...grid];
    newGrid[row][col] = value;
    setGrid(newGrid);
  };

  const handleFormulaBarChange = (value) => {
    const { row, col } = selectedCell;
    handleCellChange(row, col, value);
  };

  const evaluateFormula = (formula) => {
    if (formula.startsWith("=")) {
      try {
        const expression = formula.slice(1);
        return eval(expression); // WARNING: Using eval is not safe for production!
      } catch (e) {
        return "Error";
      }
    }
    return formula;
  };

  return (
    <div className="app">
      <Toolbar />
      <FormulaBar
        value={grid[selectedCell.row][selectedCell.col]}
        onChange={handleFormulaBarChange}
      />
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={evaluateFormula(cell)}
                onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
                onFocus={() => setSelectedCell({ row: rowIndex, col: colIndex })}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
