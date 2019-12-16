//给你一个字符串 S、一个字符串 T，请在字符串 S 里面找出：包含 T 所有字母的最小子串。
//
// 示例：
//
// 输入: S = "ADOBECODEBANC", T = "ABC"
//输出: "BANC"
//
// 说明：
//
//
// 如果 S 中不存这样的子串，则返回空字符串 ""。
// 如果 S 中存在这样的子串，我们保证它是唯一的答案。
//
// Related Topics 哈希表 双指针 字符串 Sliding Window
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：76.最小覆盖子串（https://leetcode-cn.com/problems/minimum-window-substring/）
 * 标签：哈希表 双指针 字符串 滑动窗口
 * 学号：1034（五期三班一组）
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
    if (!s || !t || s.length < t.length) {
        return '';
    }
    const getCountArray = () => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let mapT = getCountArray(), winds = getCountArray(), i = 0, j = 0, minLen = s.length + 1, found = 0, start = 0;
    for (let k = 0; k < t.length; k++) {
        mapT[t.charCodeAt(k)]++;
    }
    while (j < s.length) {
        if (found < t.length) {
            let right = s.charCodeAt(j++);
            if (mapT[right] > 0) {
                if (++winds[right] <= mapT[right]) {
                    found++;
                }
            }
        }
        while (found === t.length) {
            if (j - i < minLen) {
                [start, minLen] = [i, j - i];
            }
            let left = s.charCodeAt(i++);
            if (mapT[left] > 0) {
                if (--winds[left] < mapT[left]) {
                    found--;
                }
            }
        }
    }
    return minLen === s.length + 1 ? '' : s.substr(start, minLen);
};

//leetcode submit region end(Prohibit modification and deletion)
//给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
// 例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
//满足要求的三元组集合为：
//[
//  [-1, 0, 1],
//  [-1, -1, 2]
//]
// Related Topics 数组 双指针
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：15.三数之和（https://leetcode-cn.com/problems/3sum/）
 * 标签：双指针 数组
 * 学号：1034（五期三班一组）
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
    let res = [];
    nums.sort((a, b) => a - b);
    if (nums[0] > 0 || nums.length < 3) {
        return res;
    }
    for (let k = 0; k < nums.length - 2; k++) {
        if (k === 0 || nums[k] > nums[k - 1]) {
            let i = k + 1, j = nums.length - 1;
            while (i < j) {
                let afterAdd = nums[k] + nums[i] + nums[j];
                if (afterAdd < 0) {
                    i++;
                } else if (afterAdd > 0) {
                    j--;
                } else {
                    res.push([nums[k], nums[i], nums[j]]);
                    while (i < j && nums[i] === nums[++i]) {
                    }
                    while (i < j && nums[j] === nums[--j]) {
                    }
                }
            }
        }
    }
    return res;
};
//leetcode submit region end(Prohibit modification and deletion)

//给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。
//
// 以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
//
// 图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。
//
// 示例:
//
// 输入: [2,1,5,6,2,3]
//输出: 10
// Related Topics 栈 数组
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：84.柱状图中的最大矩形面积（https://leetcode-cn.com/problems/largest-rectangle-in-histogram/）
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = function (heights) {
    Array.prototype.peek = function () {
        return this.length > 0 ? this[this.length - 1] : null;
    };
    let stack = [-1], maxArea = 0;
    for (let k = 0; k < heights.length; k++) {
        while (stack.peek() > -1 && heights[stack.peek()] >= heights[k]) {
            maxArea = Math.max(maxArea, heights[stack.pop()] * (k - stack.peek() - 1));
        }
        stack.push(k);
    }
    while (stack.peek() > -1) {
        maxArea = Math.max(maxArea, heights[stack.pop()] * (heights.length - stack.peek() - 1));
    }
    return maxArea;
};
//leetcode submit region end(Prohibit modification and deletion)
