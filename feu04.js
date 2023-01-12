// const fs = require('fs');

// //parse the input arguments
// const [boardFile, shapeFile] = process.argv.slice(2);

// //check if the input files exist, if not log and exit
// if (!fs.existsSync(boardFile) || !fs.existsSync(shapeFile)) {
//   console.log('One of the input files does not exist');
//   process.exit(1);
// }

// //read the contents of the board and shape files
// const board = fs.readFileSync(boardFile, 'utf8').split('\n').filter(x => x);
// let shape = fs.readFileSync(shapeFile, 'utf8').split('\n').filter(x => x);

// let result = { x: -1, y: -1 };

// // if shape has multiple element only take the first one
// if (shape.length > 1) shape = shape[0][0];
// else shape = shape[0];

// //iterate through the board rows
// for (let y = 0; y < board.length; y++) {
//     //iterate through the columns
//     for (let x = 0; x < board[y].length; x++) {
//         if(board[y][x] === shape){
//             result = { x: x, y: y };
//             break;
//         }
//     }
//     if(result.x !== -1) break;
// }

// // output the result
// if (result.x !== -1) {
//     console.log(`Trouvé ! Coordonnées : x=${result.x} y=${result.y}`);
// } else {
//     console.log("Introuvable");
// }

const fs = require('fs');

//parse the input arguments
const [boardFile, shapeFile] = process.argv.slice(2);

//check if the input files exist, if not log and exit
if (!fs.existsSync(boardFile) || !fs.existsSync(shapeFile)) {
    console.log('One of the input files does not exist');
    process.exit(1);
}

//read the contents of the board and shape files
// const board = fs.readFileSync(boardFile, 'utf8').replace(/\r/g, "").split('\n').filter(x => x);
// let shape = fs.readFileSync(shapeFile, 'utf8').replace(/\r/g, "").split('\n').map(x => x.trim()).filter(x => x);


// let result = { x: -1, y: -1 };

// iterate through the board rows
let shape = fs.readFileSync(shapeFile, 'utf8').replace(/\r/g, "").split('\n').map(x => x.trim()).filter(x => x);
const board = fs.readFileSync(boardFile, 'utf8').replace(/\r/g, "").split('\n').filter(x => x);
console.log(board);
console.log(shape);
let result = { x: -1, y: -1 };

//iterate through the board rows
for (let y = 0; y <= board.length - shape.length; y++) {
    //search for the first occurence of the shape in the current row
    let index = board[y].indexOf(shape[0]);
    while (index !== -1) {
        let match = true;
        //check if the rest of the shape match the board starting from index
        for (let i = 1; i < shape.length; i++) {
            if (board[y+i].substring(index, index + shape[i].length) !== shape[i]) {
                match = false;
                break;
            }
        }
        if (match) {
            result = { x: index, y: y };
            break;
        }
        //search for the next occurence of the shape in the current row
        index = board[y].indexOf(shape[0], index + 1);
    }
    if (result.x !== -1) break;
}
// const condi = result.y + y < board.length && result.x + x < board[result.y + y].length && shape[y][x] == board[result.y + y][result.x + x];
// console.log(condi);
if (true) {
    console.log(`Trouvé ! Coordonnées : x=${result.x} y=${result.y}`);
    for (let y = 0; y < shape.length; y++) {
        let row = "";
        for (let x = 0; x < shape[y].length; x++) {
            // let cond2 = result.y + y < board.length && result.x + x < board[result.y + y].length && shape[y][x] === board[result.y + y][result.x + x];
            // console.log(cond2);
            if (true) {
                row += shape[y][x];
            } else {
                row += "-";
            }
        }
        console.log(row);
    }
} else {
    console.log("Introuvable");
}
