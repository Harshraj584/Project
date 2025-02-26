import React, { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import FormulaBar from "./FormulaBar";
import Grid from "./Grid";
import {
  sum,
  average,
  max,
  min,
  count,
} from "./mathFunctions";
import { trim, upper, lower } from "./dataQualityFunctions";
import { validateNumeric } from "./validation";
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
        if (expression.startsWith("SUM")) {
          return sum(grid, expression);
        } else if (expression.startsWith("AVERAGE")) {
          return average(grid, expression);
        } else if (expression.startsWith("MAX")) {
          return max(grid, expression);
        } else if (expression.startsWith("MIN")) {
          return min(grid, expression);
        } else if (expression.startsWith("COUNT")) {
          return count(grid, expression);
        } else if (expression.startsWith("TRIM")) {
          return trim(grid, expression);
        } else if (expression.startsWith("UPPER")) {
          return upper(grid, expression);
        } else if (expression.startsWith("LOWER")) {
          return lower(grid, expression);
        } else {
          return eval(expression); // WARNING: eval is unsafe for production!
        }
      } catch (e) {
        return "Error";
      }
    }
    return formula;
  };

  return (
    <div className="app">
      <Toolbar
        grid={grid}
        setGrid={setGrid}
        selectedCell={selectedCell}
        handleCellChange={handleCellChange}
      />
      <FormulaBar
        value={grid[selectedCell.row][selectedCell.col]}
        onChange={handleFormulaBarChange}
      />
      <Grid
        grid={grid}
        setGrid={setGrid}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        handleCellChange={handleCellChange}
        evaluateFormula={evaluateFormula}
      />
    </div>
  );
};

export default App;
