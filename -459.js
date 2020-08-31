/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  // return enumerate2(s);
  return kmpDoubleString(s);
};

// 枚举1，截取字符串，对字符串进行比较
function enumerate(s) {
  let subLen = 0; // 截取重复字符串的长度
  let len = s.length;

  while (subLen + 1 <= len / 2) {
    subLen++;
    if (len % subLen !== 0) {
      continue;
    }
    let subStr = s.slice(0, subLen);
    let i = subLen;

    for (; i <= len - subLen; i += subLen) {
      if (s.slice(i, i + subLen) !== subStr) {
        break;
      }
    }

    if (i > len - subLen) {
      return true;
    }
  }

  return false;
}

// 枚举2，不截取字符串，比较相对位置
function enumerate2(s) {
  let subLen = 0; // 截取重复字符串的长度
  let len = s.length;

  while (subLen + 1 <= len / 2) {
    subLen++;
    if (len % subLen == 0) {
      let i = subLen;

      for (; i < len; i++) {
        if (s[i] !== s[i - subLen]) {
          break;
        }
      }

      if (i >= len) {
        return true;
      }
    }
  }

  return false;
}

// 奇技淫巧，双倍字符串
function doubleString(s) {
  // 图解：https://leetcode-cn.com/problems/repeated-substring-pattern/solution/tu-jie-yi-xia-shuang-bei-zi-fu-chuan-de-jie-fa-by-/
  return (s + s).indexOf(s, 1) !== s.length;
}

// kmp算法的双倍字符
function kmpDoubleString(s) {
  return kmp(s + s, s, 1) !== s.length;
}

// kmp算法的indexOf
function kmp(s, p, index = 0) {
  let sLen = s.length;
  let pLen = p.length;
  let next = createNext(p);

  for (let i = index; i <= sLen - pLen; i++) {
    let j = 1;
    for (; j <= pLen; j++) {
      if (s[i] !== p[j - 1]) {
        j = next[j];

        if (j === 0) {
          break;
        } else {
          j = j - 1;
        }
      } else {
        i++;
      }
    }

    if (j > pLen) {
      return i - pLen;
    }
  }

  return -1;
}

// 先创建模式串
function createNext(s) {
  let next = [0, 0, 1];
  let len = s.length;
  let j = 1;
  for (let i = 2; i < len; i++) {
    if (s[j - 1] === s[i - 1]) {
      next.push(next[i] + 1);
      j++;
    } else {
      while (j !== 0 && s[j - 1] !== s[i - 1]) {
        j = next[j];
      }

      next.push(next[++j] + 1);
    }
  }

  return next;
}

console.log(repeatedSubstringPattern("abab"));
