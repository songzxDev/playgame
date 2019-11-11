/**
 * 题号：88.合并两个有序数组
 * 标签：数组 双指针
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function (nums1, m, nums2, n) {
    while (m > 0 && n > 0) {
        if (nums1[m - 1] >= nums2[n - 1]) {
            nums1[m + n - 1] = nums1[m - 1];
            m--;
        } else {
            nums1[m + n - 1] = nums2[n - 1];
            n--;
        }
    }
    // eval(`nums1.splice(0, n, ${nums2.slice(0, n).join(',')})`);
    for (let i = 0; i < n; i++) {
        nums1[i] = nums2[i];
    }
};

/**
 * 题号：283.移动零
 * 标签：数组、双指针
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const moveZeroes = function (nums) {
    if (nums.length === 0) return;
    let insertPos = 0;
    for (let num of nums) {
        if (num !== 0) {
            nums[insertPos++] = num;
        }
    }
    while (insertPos < nums.length) {
        nums[insertPos++] = 0;
    }
};