/**
 * 方法一：暴力破解，循环2遍数组，查找对应值。时间复杂度 O(n^2)
 * 方案二：通过Hash表（js对象）存储遍历过的值。以空间换取时间。时间复杂度 O(n)
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let targetObj = {}; // 使用对象 {num: index}，加快后面的查找

  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    let targetIndex = targetObj[target - num];

    if (targetIndex !== undefined) {
      return [targetIndex, i];
    } else {
      targetObj[num] = i;
    }
  }
};
