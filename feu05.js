const fs = require("fs");

const readBoard = async (boardFile) => {
  try {
    const boardData = await fs.promises.readFile(boardFile, "utf8");
    return boardData;
  } catch (err) {
    console.error(err);
  }
};

const parseBoard = (boardData, n) => {
    // Split the board data into an array of lines
    const lines = boardData.split(/[\r\n]+/);
    console.log(lines);
    const newBoard = lines.slice(1);
    console.log(newBoard);
    // Get the board size, empty character, obstacle character, and full character from the first line
    const firstLine = lines[0].replace(/\s/g, "");
    console.log(firstLine);
    let nb = parseInt(firstLine[0]);
    console.log(nb);
    const emptyChar = firstLine[1];
    console.log(emptyChar);
    const obstacleChar = firstLine[2];
    console.log(obstacleChar);
    const fullChar = firstLine[3].toString();
    console.log(fullChar);
    return { newBoard, nb, n, emptyChar, obstacleChar, fullChar };
  };
  

const getMaxSquare = (newBoard, n, obstacleChar) => {
  // Create a new 2D array dp of the same dimensions as the board array, and initialize all its elements to 0.
  let dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(n).fill(0);
  }

  // iterate board
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (newBoard[i][j] === obstacleChar) {
        if (i === 0 || j === 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        }
      }
    }
  }

  // find the max
  let maxLength = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      maxLength = Math.max(maxLength, dp[i][j]);
    }
  }

  // find the coordinates of the element with the maximum value in the dp array
  let topLeft = [0, 0];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (dp[i][j] === maxLength) {
        topLeft = [i, j];
        break;
      }
    }
  }
  return { maxLength, topLeft };
};

const updateBoard = (
  newBoard,
  n,
  obstacleChar,
  emptyChar,
  maxLength,
  topLeft,
  fullChar
) => {
  // use the maxLength and topLeft values to construct the square by replacing the appropriate elements in the board array with the fullChar value.
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (newBoard[i][j] !== obstacleChar) {
        newBoard[i][j] = emptyChar;
      }
    }
  }
  for (let i = topLeft[0]; i < topLeft[0] + maxLength; i++) {
    for (let j = topLeft[1]; j < topLeft[1] + maxLength; j++) {
      newBoard[i][j] = fullChar;
    }
  }
  return newBoard;
};

const main = async (boardFile, n) => {
  try {
    const boardData = await readBoard(boardFile);
    const { newBoard, emptyChar, obstacleChar, fullChar } = parseBoard(
      boardData,
      n
    );
    const { maxLength, topLeft } = getMaxSquare(newBoard, n, obstacleChar);
    const updatedBoard = updateBoard(
      newBoard,
      n,
      obstacleChar,
      emptyChar,
      maxLength,
      topLeft,
      fullChar
    );
    // console.log(updatedBoard.join("\n"));
  } catch (err) {
    console.error(err);
  }
};

main(process.argv[2]);
