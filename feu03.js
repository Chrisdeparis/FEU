const fs = require("fs");

function findShape(board, shape) {
  let shapeFound = false;
  let coordinates = [];

  for (let i = 0; i <= board.length - shape.length; i++) {
    for (let j = 0; j <= board[i].length - shape[0].length; j++) {
      let match = true;
      for (let x = 0; x < shape.length; x++) {
        for (let y = 0; y < shape[x].length; y++) {
          // prendre en compte les zones aussi vides
          if (
            shape[x][y].value !== " " &&
            shape[x][y].value !== board[i + x][j + y].value
          ) {
            match = false;
            break;
          }
        }
        if (!match) break;
      }
      if (match) {
        shapeFound = true;
        for (let x = 0; x < shape.length; x++) {
          for (let y = 0; y < shape[x].length; y++) {
            coordinates.push({
              line: i + shape[x][y].line,
              char: j + shape[x][y].char,
            });
          }
        }
        break;
      }
    }
    if (shapeFound) break;
  }
  return { shapeFound, coordinates };
}


function compareAndDisplay(board, shape) {
  let modifiedBoard = JSON.parse(JSON.stringify(board));
  for (let i = 0; i < board.length; i++) {
      let row = "";
      for (let j = 0; j < board[i].length; j++) {
          let match = false;
          if(i < shape.length) {
              for (let y = 0; y < shape[i].length; y++) {
                  if (shape[i][y].char === j && shape[i][y].value !== ' ') {
                      modifiedBoard[i][j].value = shape[i][y].value;
                      match = true;
                      break;
                  }
              }
          }
          if (match) {
              row += modifiedBoard[i][j].value;
          } else {
              row += "-";
          }
      }
      console.log(row);
  }
}


const main = (boardFile, shapeFile) => {
  fs.readFile(boardFile, "utf8", (err, boardData) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.readFile(shapeFile, "utf8", (err, shapeData) => {
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
            return { line: lineIndex, char: charIndex, value: char };
          });
      });
      console.log(newBoard);
      const shape = shapeData.split("\n").filter((x) => x);
      // composition unitaire du shape file to_find
      const newShape = shape.map((item, lineIndex) => {
        return item
          .replace("\r", "")
          .split("")
          .map((char, charIndex) => {
            return { line: lineIndex, char: charIndex, value: char };
          });
      });
      // console.log(newShape);
      const result = findShape(newBoard, newShape);

      if (result) {
        const solution = result.coordinates.filter(
          (coordinate) => coordinate.line === 1
        );
        if (!solution[0]) {
          console.log("Introuvable");
        } else {
          let coordinate = solution[0];
          let formattedCoordinate = `${coordinate.char}, ${coordinate.line}`;
          console.log("Trouvé ! Coordonnées : " + formattedCoordinate);
          // displayShapeOnBoard(newBoard, newShape, 1, 1);
          compareAndDisplay(newBoard, newShape);
        }
      } else {
        console.log("Introuvable");
      }
    });
  });
};

main(process.argv[2], process.argv[3]);
