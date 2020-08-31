/**
 * @param {number[]} nums
 * @return {boolean}
 */
var judgePoint24 = function (nums) {
  return recursion(nums, 24);
};

function recursion(nums, target) {
  if (nums.length === 2) {
    let operators = ["+", "-", "*", "/"];

    for (let operator of operators) {
      if (operator === "-" || operator === "/") {
        if (
          similarCompare(compute(nums, operator), target) ||
          similarCompare(compute(nums.reverse(), operator), target)
        ) {
          return true;
        }
      } else {
        if (similarCompare(compute(nums, operator), target)) {
          return true;
        }
      }
    }

    return false;
    // if (
    //   (a + b).toFixed(6) === target.toFixed(6) ||
    //   Math.abs(a - b).toFixed(6) === target.toFixed(6) ||
    //   (a * b).toFixed(6) === target.toFixed(6) ||
    //   (a / b).toFixed(6) === target.toFixed(6) ||
    //   (b / a).toFixed(6) === target.toFixed(6)
    // ) {
    //   // console.log(a, b, target);
    //   return true;
    // } else {
    //   return false;
    // }
  } else if (nums.length === 3) {
    for (let i = 0; i < 3; i++) {
      let a = nums[i]; // a 不可能为0
      let newArr = [...nums];
      newArr.splice(i, 1);

      if (
        recursion(newArr, target + a) ||
        recursion(newArr, target - a) ||
        recursion(newArr, a - target) ||
        recursion(newArr, target * a) ||
        recursion(newArr, target / a) ||
        recursion(newArr, a / target)
      ) {
        return true;
      }
    }

    return false;
  } else if (nums.length === 4) {
    for (let i = 0; i < 4; i++) {
      let a = nums[i];
      let newArr = [...nums];
      newArr.splice(i, 1);

      // if (a === 7) {
      //   console.log(a);
      //   console.log(recursion(newArr, target / a));
      // }
      if (
        recursion(newArr, target + a) ||
        recursion(newArr, target - a) ||
        recursion(newArr, a - target) ||
        recursion(newArr, target * a) ||
        recursion(newArr, target / a) ||
        recursion(newArr, a / target)
      ) {
        return true;
      }
    }

    for (let i = 0; i < 4; i++) {
      for (let j = i + 1; j < 4; j++) {
        let a = nums[i];
        let b = nums[j];
        let newArr = [...nums];
        newArr.splice(j, 1);
        newArr.splice(i, 1);

        let counts = [a + b, a - b, b - a, a * b, a / b, b / a];

        for (let num of counts) {
          if (
            recursion(newArr, target + num) ||
            recursion(newArr, target - num) ||
            recursion(newArr, num - target)
          ) {
            return true;
          } else if (
            num !== 0 &&
            (recursion(newArr, target * num) ||
              recursion(newArr, target / num) ||
              recursion(newArr, num / target))
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }
}

// 计算
function compute(nums, operator) {
  let [a, b] = nums;
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return a + b;
  }
}

// 近似比较, 保留6位
function similarCompare(a, b) {
  return a.toFixed(6) === b.toFixed(6);
}

console.log(judgePoint24([3, 3, 7, 7]));
