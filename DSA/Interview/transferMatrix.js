function transforMatrix(input) {
  let row = input.length;
  let col = input[0].length;

  let zeroRow = new Set();
  let zeroCol = new Set();

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (input[i][j] === 0) {
        zeroRow.add(i);
        zeroCol.add(j);
      }
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (zeroRow.has(i) || zeroCol.has(j)) {
        input[i][j] = 0;
      }
    }
  }

  return input;
}

let input = [
  [3, 4, 0],
  [5, 0, 9],
  [12, 13, 14],
];

let output = transforMatrix(input);
console.log(output);
