/**
 * 两个索引指向字符串 start 与 end
 * 循环 end++
 * 在重复时，start++ ，且计算长度
 */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let len = s.length;
  let max = 0;
  let occ = new Set();
  let end = 0;

  for (let start = 0; start < len; start++) {
    occ.delete(s.charAt(start - 1));

    while (end < len && !occ.has(s[end])) {
      occ.add(s[end]);
      end++;
    }

    max = Math.max(max, end - start);
  }

  return max;
};

console.log(lengthOfLongestSubstring("aab"));
