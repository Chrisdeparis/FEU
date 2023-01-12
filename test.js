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
      console.log(newShape);
      const result = findShape(newBoard, newShape);
      console.log(result);
      if (result) {
        const solution = result.coordinates.filter(
          (coordinate) => coordinate.line === 1
        );
        let coordinate = solution[0];
        let formattedCoordinate = `${coordinate.char}, ${coordinate.line}`;
        console.log("Trouvé ! Coordonnées : "+formattedCoordinate);
      } else {
        console.log("Introuvable");
      }
    });
  });
};

main(process.argv[2], process.argv[3]);
