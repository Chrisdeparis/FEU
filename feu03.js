const fs = require('fs');

// Lit le contenu d'un fichier et le renvoie sous forme de tableau de lignes
function readFile(fileName) {
  const fileContent = fs.readFileSync(fileName, 'utf8');
  return fileContent.split('\n').map((line) => line.trim());
}

// Vérifie si une forme est présente à une position donnée dans un plateau
function presentAt(board, shape, x, y) {
  for (let shapeY = 0; shapeY < shape.length; shapeY += 1) {
    for (let shapeX = 0; shapeX < shape[shapeY].length; shapeX += 1) {
      if (board[y + shapeY][x + shapeX] !== shape[shapeY][shapeX]) {
        return false;
      }
    }
  }
  return true;
}

// Trouve la position de la forme dans le plateau
function findShape(board, shape) {
  for (let y = 0; y < board.length; y += 1) {
    for (let x = 0; x < board[y].length; x += 1) {
      if (presentAt(board, shape, x, y)) {
        return [y, x];
      }
    }
  }
  return null;
}

// Vérifie si le nombre d'arguments est correct
if (process.argv.length !== 4) {
  console.log('Usage: node exo.js board.txt shape.txt');
  process.exit();
}

const [, , boardFile, shapeFile] = process.argv;

// Lit les fichiers d'entrée
const board = readFile(boardFile);
const shape = readFile(shapeFile);

// Trouve la forme dans le plateau
const position = findShape(board, shape);

if (position) {
  console.log('Trouvé !');
  console.log(`Coordonnées : ${position[0] + 1},${position[1] + 1}`);
} else {
  console.log('Introuvable');
}
