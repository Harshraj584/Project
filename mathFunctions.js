export const sum = (grid, expression) => {
  const range = expression.match(/\((.*?)\)/)[1].split(":");
  const [start, end] = range;
  const [startRow, startCol] = start.match(/\d+|[A-Z]+/g);
  const [endRow, endCol] = end.match(/\d+|[A-Z]+/g);

  let total = 0;
  for (let row = startRow - 1; row < endRow; row++) {
    for (let col = startCol.charCodeAt(0) - 65; col <= endCol.charCodeAt(0) - 65; col++) {
      total += Number(grid[row][col]?.value) || 0;
    }
  }
  return total;
};

export const average = (grid, expression) => {
  const total = sum(grid, expression.replace("AVERAGE", "SUM"));
  const range = expression.match(/\((.*?)\)/)[1].split(":");
  const [start, end] = range;
  const [startRow, startCol] = start.match(/\d+|[A-Z]+/g);
  const [endRow, endCol] = end.match(/\d+|[A-Z]+/g);

  const count = (endRow - startRow + 1) * (endCol.charCodeAt(0) - startCol.charCodeAt(0) + 1);
  return total / count;
};

export const max = (grid, expression) => {
  const range = expression.match(/\((.*?)\)/)[1].split(":");
  const [start, end] = range;
  const [startRow, startCol] = start.match(/\d+|[A-Z]+/g);
  const [endRow, endCol] = end.match(/\d+|[A-Z]+/g);

  let maxVal = -Infinity;
  for (let row = startRow - 1; row < endRow; row++) {
    for (let col = startCol.charCodeAt(0) - 65; col <= endCol.charCodeAt(0) - 65; col++) {
      const cellValue = Number(grid[row][col]?.value);
      if (!isNaN(cellValue) && cellValue > maxVal) {
        maxVal = cellValue;
      }
    }
  }
  return maxVal;
};

export const min = (grid, expression) => {
  const range = expression.match(/\((.*?)\)/)[1].split(":");
  const [start, end] = range;
  const [startRow, startCol] = start.match(/\d+|[A-Z]+/g);
  const [endRow, endCol] = end.match(/\d+|[A-Z]+/g);

  let minVal = Infinity;
  for (let row = startRow - 1; row < endRow; row++) {
    for (let col = startCol.charCodeAt(0) - 65; col <= endCol.charCodeAt(0) - 65; col++) {
      const cellValue = Number(grid[row][col]?.value);
      if (!isNaN(cellValue) && cellValue < minVal) {
        minVal = cellValue;
      }
    }
  }
  return minVal;
};

export const count = (grid, expression) => {
  const range = expression.match(/\((.*?)\)/)[1].split(":");
  const [start, end] = range;
  const [startRow, startCol] = start.match(/\d+|[A-Z]+/g);
  const [endRow, endCol] = end.match(/\d+|[A-Z]+/g);

  let count = 0;
  for (let row = startRow - 1; row < endRow; row++) {
    for (let col = startCol.charCodeAt(0) - 65; col <= endCol.charCodeAt(0) - 65; col++) {
      if (!isNaN(grid[row][col]?.value)) {
        count++;
      }
    }
  }
  return count;
};
