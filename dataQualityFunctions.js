export const trim = (grid, expression) => {
  const range = expression.match(/\((.*?)\)/)[1].split(":");
  const [start, end] = range;
  const [startRow, startCol] = start.match(/\d+|[A-Z]+/g);
  const [endRow, endCol] = end.match(/\d+|[A-Z]+/g);

  for (let row = startRow - 1; row < endRow; row++) {
    for (let col = startCol.charCodeAt(0) - 65; col <= endCol.charCodeAt(0) - 65; col++) {
      grid[row][col].value = grid[row][col].value.trim();
    }
  }
  return "Trimmed";
};

export const upper = (grid, expression) => {
  const range = expression.match(/\((.*?)\)/)[1].split(":");
  const [start, end] = range;
  const [startRow, startCol] = start.match(/\d+|[A-Z]+/g);
  const [endRow, endCol] = end.match(/\d+|[A-Z]+/g);

  for (let row = startRow - 1; row < endRow; row++) {
    for (let col = startCol.charCodeAt(0) - 65; col <= endCol.charCodeAt(0) - 65; col++) {
      grid[row][col].value = grid[row][col].value.toUpperCase();
    }
  }
  return "UPPERCASE";
};

export const lower = (grid, expression) => {
  const range = expression.match(/\((.*?)\)/)[1].split(":");
  const [start, end] = range;
  const [startRow, startCol] = start.match(/\d+|[A-Z]+/g);
  const [endRow, endCol] = end.match(/\d+|[A-Z]+/g);

  for (let row = startRow - 1; row < endRow; row++) {
    for (let col = startCol.charCodeAt(0) - 65; col <= endCol.charCodeAt(0) - 65; col++) {
      grid[row][col].value = grid[row][col].value.toLowerCase();
    }
  }
  return "lowercase";
};
