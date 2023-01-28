const fs = require("fs");

// Fonction pour lire le fichier de plateau
function readMap(file) {
  try {
    const data = fs.readFileSync(file, "utf8");
    const lines = data.split(/[\r\n]+/);
    // le plateau n'a pas la première ligne
    const plateau = lines.slice(1);
    const firstLine = lines[0].replace(/\s/g, "");
    const [size, empty, obstacle, full] = firstLine

    if (parseInt(size) < 1 || parseInt(size) !== plateau.length) {
      throw new Error("Carte invalide");
    }

    return { size, empty, obstacle, full, map: plateau };
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Fonction pour trouver le plus grand carré possible
function findLargestSquare(map, empty, full) {
  let square = { x: 0, y: 0, size: 0 };

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === empty) {
        let currentSize = 1;
        let canExpand = true;

        while (canExpand) {
          for (let i = y; i < y + currentSize; i++) {
            for (let j = x; j < x + currentSize; j++) {
              if (i >= map.length || j >= map[i].length || map[i][j] !== empty) {
                canExpand = false;
                break;
              }
            }
            if (!canExpand) {
              break;
            }
          }

          if (canExpand) {
            currentSize++;
          } else {
            currentSize--;
            if (currentSize > square.size) {
              square = { x, y, size: currentSize };
            }
          }
        }
      }
    }
  }

  return square;
}

// Fonction pour remplir le carré
function fillSquare(map, square, full) {
  for (let y = square.y; y < square.y + square.size; y++) {
    for (let x = square.x; x < square.x + square.size; x++) {
      map[y] = map[y].substr(0, x) + full + map[y].substr(x + 1);
    }
  }
  return map;
}

// Programme principal
const file = process.argv[2];
const { size, empty, obstacle, full, map } = readMap(file);
const square = findLargestSquare(map, empty, full);
const newMap = fillSquare(map, square, full);
console.log(newMap.join("\n"));
