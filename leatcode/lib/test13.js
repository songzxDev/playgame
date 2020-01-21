//一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
//
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
//
// 问总共有多少条不同的路径？
// 例如，上图是一个7 x 3 的网格。有多少可能的路径？
// 说明：m 和 n 的值均不超过 100。
// 示例 1:
// 输入: m = 3, n = 2
//输出: 3
//解释:
//从左上角开始，总共有 3 条路径可以到达右下角。
//1. 向右 -> 向右 -> 向下
//2. 向右 -> 向下 -> 向右
//3. 向下 -> 向右 -> 向右
// 示例 2:
// 输入: m = 7, n = 3
//输出: 28
// Related Topics 数组 动态规划
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：62.不同路径（https://leetcode-cn.com/problems/unique-paths/）
 * 标签：动态规划 分治算法
 * 学号：1034（五期一班三组）
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function (m, n) {
    let ans = 0;
    if (m > 0 && n > 0) {
        let dp = Array.from({length: m}, (_, i) => Array.from({length: n}, (_, j) => (i === 0 || j === 0) ? 1 : 0));
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                dp[i][j] = dp[i][j - 1] + dp[i - 1][j];
            }
        }
        ans = dp[m - 1][n - 1];
    }
    return ans;
};
//leetcode submit region end(Prohibit modification and deletion)

//给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。
//
// 例如，给出 n = 3，生成结果为：
//
// [
//  "((()))",
//  "(()())",
//  "(())()",
//  "()(())",
//  "()()()"
//]
//
// Related Topics 字符串 回溯算法
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
    let res = [];
    const helper = (res, left, right, s, n) => {
        if (left + right === (n << 1)) {
            res.push(s);
            return;
        }
        if (left < n) {
            helper(res, left + 1, right, s + '(', n);
        }
        if (right < left) {
            helper(res, left, right + 1, s + ')', n);
        }
    };

    helper(res, 0, 0, '', n);
    return res;
};
console.log(generateParenthesis(3));
//leetcode submit region end(Prohibit modification and deletion)

//给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列。
//
// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
//例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。
//
//
// 若这两个字符串没有公共子序列，则返回 0。
//
//
//
// 示例 1:
//
// 输入：text1 = "abcde", text2 = "ace"
//输出：3
//解释：最长公共子序列是 "ace"，它的长度为 3。
//
//
// 示例 2:
//
// 输入：text1 = "abc", text2 = "abc"
//输出：3
//解释：最长公共子序列是 "abc"，它的长度为 3。
//
//
// 示例 3:
//
// 输入：text1 = "abc", text2 = "def"
//输出：0
//解释：两个字符串没有公共子序列，返回 0。
//
//
//
//
// 提示:
//
//
// 1 <= text1.length <= 1000
// 1 <= text2.length <= 1000
// 输入的字符串只含有小写英文字符。
//
// Related Topics 动态规划
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：1143.最长公共子序列（https://leetcode-cn.com/problems/longest-common-subsequence/）
 * 学号：1034（五期一班三组）
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = function (text1, text2) {
    let m = text1.length, n = text2.length, lookup = Array.from({length: m + 1}, () => (new Array(n + 1).fill(0)));
    for (let i = 1; i < m + 1; i++) {
        for (let j = 1; j < n + 1; j++) {
            lookup[i][j] = text1.charAt(i - 1) === text2.charAt(j - 1) ? lookup[i - 1][j - 1] + 1 : Math.max(lookup[i - 1][j], lookup[i][j - 1]);
        }
    }
    return lookup[m][n];
};
//leetcode submit region end(Prohibit modification and deletion)


//给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三
//元组。
//
// 注意：答案中不可以包含重复的三元组。
//
//
//
// 示例：
//
// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
//
//满足要求的三元组集合为：
//[
//  [-1, 0, 1],
//  [-1, -1, 2]
//]
//
// Related Topics 数组 双指针
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：15.三数之和（https://leetcode-cn.com/problems/3sum/）
 * 学号：1034（五期一班三组）
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function(nums) {
    let res = [];
    if (nums && nums.length > 2) {
        nums.sort((a, b) => a - b);
        for (let i = 0; nums[i] <= 0 && i < nums.length - 2; i++) {
            if (i === 0 || nums[i] > nums[i - 1]) {
                let j = i + 1, k = nums.length - 1;
                while (j < k) {
                    let add = nums[i] + nums[j] + nums[k];
                    if (add < 0) {
                        j++;
                    } else if (add > 0) {
                        k--;
                    } else {
                        res.push([nums[i], nums[j], nums[k]]);
                        while (j < k && nums[j] === nums[++j]) {}
                        while (j < k && nums[k] === nums[--k]) {}
                    }
                }
            }
        }
    }
    return res;
};
//leetcode submit region end(Prohibit modification and deletion)
