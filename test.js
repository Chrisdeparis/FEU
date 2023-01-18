class Solution {
  isValidSudoku(board) {
    let rows = Array(9).fill(new Set());
    let columns = Array(9).fill(new Set());
    let squares = Array(3).fill(Array(3).fill(new Set()));

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        let cellValue = board[x][y];
        if (cellValue === ".") {
          continue;
        }
        if (
          rows[x].has(cellValue) ||
          columns[y].has(cellValue) ||
          squares[Math.floor(x / 3)][Math.floor(y / 3)].has(cellValue)
        ) {
          return false;
        }

        rows[x].add(cellValue);
        columns[y].add(cellValue);
        squares[Math.floor(x / 3)][Math.floor(y / 3)].add(cellValue);
      }
    }

    return true;
  }
}
