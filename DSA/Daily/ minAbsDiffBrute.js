function minAbsDiffBrute(input, x) {
  let minDiff = Infinity;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (Math.abs(i - j) >= x) {
        diff = Math.abs(input[i] - input[j]);
        minDiff = Math.min(minDiff, diff);
      }
    }
  }
  return minDiff;
}

let input = [1, 3, 6, 10, 15];

let x = 1;

let output = minAbsDiffBrute(input, x);
console.log(output);
