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
