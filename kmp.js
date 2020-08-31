// kmp算法

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

console.log(kmp("abac", "abac"));
