const fs = require('fs');

function parseBoard(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split('\n').map(line => line.split('').filter(c => c !== ' '));
  } catch (e) {
    console.error(`Impossible de lire le fichier ${filename}`);
    return null;
  }
}

function parseShape(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split('\n').map(line => line.split('').filter(c => c !== ' '));
  } catch (e) {
    console.error(`Impossible de lire le fichier ${filename}`);
    return null;
  }
}

function findShape(board, shape) {
  for (let i = 0; i < board.length - shape.length + 1; i++) {
    for (let j = 0; j < board[0].length - shape[0].length + 1; j++) {
      let found = true;
      for (let k = 0; k < shape.length; k++) {
        for (let l = 0; l < shape[0].length; l++) {
          if (board[i+k][j+l] !== shape[k][l] && shape[k][l] !== ' ') {
            found = false;
            break;
          }
        }
        if (!found) {
          break;
        }
      }
      if (found) {
        return [i, j];
      }
    }
  }
  return null;
}

  
  let board = parseBoard(process.argv[2]);
  // board = board.map(row => row.filter(cell => cell !== '\r'));
  console.log(board);
  let shape = parseShape(process.argv[3]);
  // shape = shape.map(row => row.filter(cell => cell !== '\r'));
  console.log(shape);

  if (board === null || shape === null) {
    console.error('Erreur lors de la lecture des fichiers');
    process.exit(1);
  }
  
  let result = findShape(board, shape);
  console.log(result);
  if (result !== null) {
    console.error('Les coordonnées renvoyées par la fonction ne sont pas celles attendues');
  }
  function printBoard(board, shape) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (shape.includes(board[i][j])) {
          process.stdout.write(board[i][j]);
        } else {
          process.stdout.write('-');
        }
      }
      console.log('');
    }
  }

  if (result === null) {
    console.log('Introuvable');
  } else {
    console.log('Trouvé !');
    console.log(`Coordonnées : ${result[0]},${result[1]}`);
    console.log(printBoard(board, shape));
    console.log(board.map(line => line.join('')).join('\n'));
  }
  
