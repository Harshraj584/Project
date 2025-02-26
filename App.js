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
import "./App.css";

const ROWS = 50;
const COLS = 26;

const App = () => {
  const [grid, setGrid] = useState(() => {
    const savedGrid = JSON.parse(localStorage.getItem("grid"));
    return (
      savedGrid ||
      Array(ROWS)
        .fill()
        .map(() =>
          Array(COLS)
            .fill()
            .map(() => ({ value: "", formatting: {} }))
        )
    );
  });
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

  useEffect(() => {
    localStorage.setItem("grid", JSON.stringify(grid));
  }, [grid]);

  const handleCellChange = (row, col, value) => {
    const newGrid = [...grid];
    newGrid[row][col] = { ...newGrid[row][col], value };
    setGrid(newGrid);
  };

  const handleFormattingChange = (row, col, formatting) => {
    const newGrid = [...grid];
    newGrid[row][col] = { ...newGrid[row][col], formatting };
    setGrid(newGrid);
  };

  const handleFormulaBarChange = (value) => {
    const { row, col } = selectedCell;
    handleCellChange(row, col, value);
  };

  const evaluateFormula = (formula) => {
    if (typeof formula === "string" && formula.startsWith("=")) {
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
        selectedCell={selectedCell}
        handleFormattingChange={handleFormattingChange}
      />
      <FormulaBar
        value={grid[selectedCell.row][selectedCell.col].value}
        onChange={handleFormulaBarChange}
      />
      <Grid
        grid={grid}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        handleCellChange={handleCellChange}
        evaluateFormula={evaluateFormula}
      />
    </div>
  );
};

export default App;
