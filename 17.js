/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  // 数字和字母映射表
  return recursion(digits);
};

function recursion(digits, base = "") {
  let arr = [];
  let board = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];

  if (digits.length > 0) {
    let num = digits.slice(0, 1);
    let str = board[num];

    for (let c of str) {
      arr.push(...recursion(digits.slice(1), base + c));
    }
  } else if (base) {
    arr.push(base);
  }

  return arr;
}

console.log(letterCombinations("23"));
