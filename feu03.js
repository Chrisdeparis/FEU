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

function getBoardModel(board, shape, shapeStartX, shapeStartY) {
  let model = '';

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let char = '-';
      if (i >= shapeStartX && i < shapeStartX + shape.length && j >= shapeStartY && j < shapeStartY + shape[i-shapeStartX].length && 
          board[i][j].value === shape[i-shapeStartX][j-shapeStartY].value) {
        char = board[i][j].value;
      }
      model += char;
    }
    model += '\n';
  }
  return model;
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

      const positionShape = {};
      positionShape.content = newShape;
      const result = findShape(newBoard, newShape);

      if (result) {
        const solution = result.coordinates.filter(
          (coordinate) => coordinate.line === 1
        );
        if (!solution[0]) {
          console.log("Introuvable");
        } else {
          let coordinate = solution[0];
          // console.log(positionShape);
          let formattedCoordinate = `${coordinate.char}, ${coordinate.line}`;
          console.log("Trouvé ! Coordonnées : " + formattedCoordinate);
          // ecrire la forme dans le board avec tiret
          const shapeStartX = result.coordinates[0].line;
          const shapeStartY = result.coordinates[0].char;
          console.log(getBoardModel(newBoard, newShape, shapeStartX, shapeStartY));
        }
      } else {
        console.log("Introuvable");
      }
    });
  });
};

main(process.argv[2], process.argv[3]);
