// Créez un programme qui affiche un rectangle dans le terminal.

const width = process.argv[2];
const height = process.argv[3];

if (!width || !height || isNaN(width) || isNaN(height)) {
  console.error("Les arguments doivent être des nombres non nuls");
  process.exit(1);
}

function drawRectangle(width, height) {
  for (let i = 0; i < height; i++) {
    let row = '';
    for (let j = 0; j < width; j++) {
      if (i === 0 || i === height - 1) {
        row += 'o';
      } else if (j === 0 || j === width - 1) {
        row += '|';
      } else {
        row += ' ';
      } 
    }
    console.log(row);
  }
}
drawRectangle(width, height);
