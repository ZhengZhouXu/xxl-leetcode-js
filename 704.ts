function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left; // 避免有些情况的大数组
    let num = nums[mid];

    if (num === target) {
      return mid;
    } else if (num < target) {
      left = mid + 1;
    } else if (num > target) {
      right = mid - 1;
    }
  }

  return -1;
};


console.log(search([-1, 0, 3, 5, 9, 12], 2));
