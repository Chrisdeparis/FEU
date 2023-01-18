const fs = require("fs");

const main = (boardFile) => {
  fs.readFile(boardFile, "utf8", (err, boardData) => {
    if (err) {
      console.error(err);
      return;
    }
    const board = boardData.split("\n").filter((x) => x);
    // composition unitaire du board file
    const newBoard = board.map((item, lineIndex) => {
      return item
        .replace("\r", "")
        .split("")
        .map((char, charIndex) => {
          return { row: lineIndex, col: charIndex, value: char };
        });
    });

    // changer les value en number
    let newGrid = newBoard.map((row, i) => {
      return row.map((cell, j) => {
        return cell.value === "." ? "." : parseInt(cell.value);
      });
    });


    // remplacer les cases vides
    function fillMissingValues(grid) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === ".") {
            let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            // Check row
            for (let i = 0; i < 9; i++) {
              if (possibilities.indexOf(grid[row][i]) !== -1) {
                possibilities.splice(possibilities.indexOf(grid[row][i]), 1);
              }
            }
            // Check column
            for (let i = 0; i < 9; i++) {
              if (possibilities.indexOf(grid[i][col]) !== -1) {
                possibilities.splice(possibilities.indexOf(grid[i][col]), 1);
              }
            }
            // Check 3x3 grid
            let startRow = row - (row % 3);
            let startCol = col - (col % 3);
            for (let i = startRow; i < startRow + 3; i++) {
              for (let j = startCol; j < startCol + 3; j++) {
                if (possibilities.indexOf(grid[i][j]) !== -1) {
                  possibilities.splice(possibilities.indexOf(grid[i][j]), 1);
                }
              }
            }
            // Assign new value
            grid[row][col] = possibilities[0];
          }
        }
      }
      return grid;
    }
    fillMissingValues(newGrid);
    // affichage en console du sudoku
    for (let i = 0; i < 9; i++) {
      let row = "";
      for (let j = 0; j < 9; j++) {
        row += `${newGrid[i][j]} `;
      }
      console.log(row);
    }
  });
};

main(process.argv[2]);
