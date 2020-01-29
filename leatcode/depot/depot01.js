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
 * 学号：1034（五期一班三组）
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
    if (!s || !t || s.length < t.length) return '';
    let winds = new Array(256).fill(0), tCache = [...t].reduce((all, a) => {
        all[`${a}`.charCodeAt(0)]++;
        return all;
    }, new Array(256).fill(0)), i = 0, j = 0, found = 0, start = 0, minLen = 0x7fffffff;
    while (j < s.length) {
        if (found < t.length) {
            let distend = s.charCodeAt(j++);
            if (tCache[distend] > 0) if (++winds[distend] <= tCache[distend]) found++;
        }
        while (found === t.length) {
            if (j - i < minLen) [start, minLen] = [i, j - i];
            let pinch = s.charCodeAt(i++);
            if (tCache[pinch] > 0) if (--winds[pinch] < tCache[pinch]) found--;
        }
    }
    return minLen === 0x7fffffff ? '' : s.substr(start, minLen);
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
 * 题目：22.括号生成（https://leetcode-cn.com/problems/generate-parentheses/）
 * 学号：1034（五期一班三组）
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
    const helper = (left, right, res, s, n) => {
        if (left + right === (n << 1)) {
            res.push(s);
            return res;
        }
        if (left < n) helper(left + 1, right, res, s + '(', n);
        if (right < left) helper(left, right + 1, res, s + ')', n);
        return res;
    };
    return helper(0, 0, [], '', n);
};
//leetcode submit region end(Prohibit modification and deletion)

//给定一个没有重复数字的序列，返回其所有可能的全排列。
//
// 示例:
//
// 输入: [1,2,3]
//输出:
//[
//  [1,2,3],
//  [1,3,2],
//  [2,1,3],
//  [2,3,1],
//  [3,1,2],
//  [3,2,1]
//]
// Related Topics 回溯算法
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：46.全排列（https://leetcode-cn.com/problems/permutations/）
 * 学号：1034（五期一班三组）
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
    const helper = (res, tmp, nums) => {
        if (tmp.length === nums.length) {
            res.push([...tmp]);
            return res;
        }
        for (let num of nums) {
            if (!tmp.includes(num)) {
                tmp.push(num);
                helper(res, tmp, nums);
                tmp.pop();
            }
        }
        return res;
    };
    return helper([], [], nums);
};
//leetcode submit region end(Prohibit modification and deletion)

//给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
//
// 说明：解集不能包含重复的子集。
//
// 示例:
//
// 输入: nums = [1,2,3]
//输出:
//[
//  [3],
//  [1],
//  [2],
//  [1,2,3],
//  [1,3],
//  [2,3],
//  [1,2],
//  []
//]
// Related Topics 位运算 数组 回溯算法
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：78.子集（https://leetcode-cn.com/problems/subsets/）
 * 学号：1034（五期一班三组）
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
    const helper = (res, sub, level, nums) => {
        if (level === nums.length) {
            res.push([...sub]);
            return res;
        }
        helper(res, sub, level + 1, nums);
        sub.push(nums[level]);
        helper(res, sub, level + 1, nums);
        sub.pop();
        return res;
    };
    return helper([], [], 0, nums);
};
//leetcode submit region end(Prohibit modification and deletion)

//你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上
//被小偷闯入，系统会自动报警。
//
// 给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。
//
// 示例 1:
//
// 输入: [1,2,3,1]
//输出: 4
//解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
//     偷窃到的最高金额 = 1 + 3 = 4 。
//
// 示例 2:
//
// 输入: [2,7,9,3,1]
//输出: 12
//解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
//     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
//
// Related Topics 动态规划
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：198.打家劫舍（https://leetcode-cn.com/problems/house-robber/）
 * 学号：1034（五期一班三组）
 * @param {number[]} nums
 * @return {number}
 */
const rob = function (nums) {
    if (!nums || nums.length === 0) return 0;
    let n = nums.length, a = [[0, nums[0]]];
    for (let i = 1; i < n; i++) {
        a.push([0, 0]);
        a[i][0] = Math.max(a[i - 1][0], a[i - 1][1]);
        a[i][1] = a[i - 1][0] + nums[i];
    }
    return Math.max(a[n - 1][0], a[n - 1][1]);
};
//leetcode submit region end(Prohibit modification and deletion)

//给定一个整数数组 nums ，找出一个序列中乘积最大的连续子序列（该序列至少包含一个数）。
//
// 示例 1:
//
// 输入: [2,3,-2,4]
//输出: 6
//解释: 子数组 [2,3] 有最大乘积 6。
//
//
// 示例 2:
//
// 输入: [-2,0,-1]
//输出: 0
//解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
// Related Topics 数组 动态规划
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：152.乘积最大子序列（https://leetcode-cn.com/problems/maximum-product-subarray/）
 * 学号：1034（五期一班三组）
 * @param {number[]} nums
 * @return {number}
 */
const maxProduct = function (nums) {
    let max = -0x80000000, iMax = 1, iMin = 1;
    for (let num of nums) {
        if (num < 0) [iMax, iMin] = [iMin, iMax];
        [iMax, iMin] = [Math.max(iMax * num, num), Math.min(iMin * num, num)];
        max = Math.max(max, iMax);
    }
    return max;
};
//leetcode submit region end(Prohibit modification and deletion)

//给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回
// -1。
//
// 示例 1:
//
// 输入: coins = [1, 2, 5], amount = 11
//输出: 3
//解释: 11 = 5 + 5 + 1
//
// 示例 2:
//
// 输入: coins = [2], amount = 3
//输出: -1
//
// 说明:
//你可以认为每种硬币的数量是无限的。
// Related Topics 动态规划
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：322.零钱兑换（https://leetcode-cn.com/problems/coin-change/）
 * 学号：1034（五期一班三组）
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
const coinChange = function (coins, amount) {
    let max = amount + 1, dp = [0];
    for (let i = 1; i <= amount; i++) {
        dp.push(max);
        for (let coin of coins) if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
    return dp[amount] > amount ? -1 : dp[amount];
};

//leetcode submit region end(Prohibit modification and deletion)

class LeetCode_213_1034 {
    /**
     * 题目：213.打家劫舍II（https://leetcode-cn.com/problems/house-robber-ii/）
     * 学号：1034（五期一班三组）
     * @param nums
     * @returns {*}
     */
    robDp(nums) {
        if (nums.length === 1) return nums[0];
        let n = nums.length, a = new Array(n + 1).fill(0), b = new Array(n + 1).fill(0);
        for (let i = 2; i <= n; i++) {
            a[i] = Math.max(a[i - 1], a[i - 2] + nums[i - 2]);
            b[i] = Math.max(b[i - 1], b[i - 2] + nums[i - 1]);
        }
        return Math.max(a[n], b[n]);
    }

    rob(nums) {
        if (nums.length === 1) return nums[0];
        return Math.max(this.robRange(nums, 0, nums.length - 2),
            this.robRange(nums, 1, nums.length - 1));
    }

    robRange(nums, lower, high) {
        let include = 0, exclude = 0;
        for (let k = lower; k <= high; k++) {
            let [inc, exc] = [include, exclude];
            [include, exclude] = [exc + nums[k], Math.max(exc, inc)];
        }
        return Math.max(include, exclude);
    }
}


//给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。
//
// 示例 1:
//
// 输入: "(()"
//输出: 2
//解释: 最长有效括号子串为 "()"
//
//
// 示例 2:
//
// 输入: ")()())"
//输出: 4
//解释: 最长有效括号子串为 "()()"
//
// Related Topics 字符串 动态规划
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：32.最长有效括号（https://leetcode-cn.com/problems/longest-valid-parentheses/）
 * 学号：1034（五期一班三组）
 * @param {string} s
 * @return {number}
 */
const longestValidParentheses = (s) => {
    let dp = [], res = 0, left = 0;
    for (let k = 0; k < s.length; k++) {
        dp.push(0);
        if (s.charAt(k) === '(') {
            left++;
        } else if (left > 0) {
            dp[k] = dp[k - 1] + 2;
            dp[k] += (k - dp[k]) >= 0 ? dp[k - dp[k]] : 0;
            res = Math.max(res, dp[k]);
            left--;
        }
    }
    return res;
};
//leetcode submit region end(Prohibit modification and deletion)

//给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
//
// 说明：每次只能向下或者向右移动一步。
//
// 示例:
//
// 输入:
//[
//  [1,3,1],
//  [1,5,1],
//  [4,2,1]
//]
//输出: 7
//解释: 因为路径 1→3→1→1→1 的总和最小。
//
// Related Topics 数组 动态规划
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：64.最小路径和（https://leetcode-cn.com/problems/minimum-path-sum/）
 * 学号：1034（五期一班三组）
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (grid) {
    if (!grid || grid.length < 1) return 0;
    let m = grid[0].length, n = grid.length;
    for (let p = n - 1; p >= 0; p--) {
        for (let k = m - 1; k >= 0; k--) {
            if (p === n - 1 && k < m - 1) grid[p][k] += grid[p][k + 1];
            if (p < n - 1 && k === m - 1) grid[p][k] += grid[p + 1][k];
            if (p < n - 1 && k < m - 1) grid[p][k] += Math.min(grid[p][k + 1], grid[p + 1][k]);
        }
    }
    return grid[0][0];
};
//leetcode submit region end(Prohibit modification and deletion)

//给定两个单词 word1 和 word2，计算出将 word1 转换成 word2 所使用的最少操作数 。
//
// 你可以对一个单词进行如下三种操作：
//
//
// 插入一个字符
// 删除一个字符
// 替换一个字符
//
//
// 示例 1:
//
// 输入: word1 = "horse", word2 = "ros"
//输出: 3
//解释:
//horse -> rorse (将 'h' 替换为 'r')
//rorse -> rose (删除 'r')
//rose -> ros (删除 'e')
//
//
// 示例 2:
//
// 输入: word1 = "intention", word2 = "execution"
//输出: 5
//解释:
//intention -> inention (删除 't')
//inention -> enention (将 'i' 替换为 'e')
//enention -> exention (将 'n' 替换为 'x')
//exention -> exection (将 'n' 替换为 'c')
//exection -> execution (插入 'u')
//
// Related Topics 字符串 动态规划
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：72.编辑距离（https://leetcode-cn.com/problems/edit-distance/solution/bian-ji-ju-chi-by-leetcode/）
 * 学号：1034（五期一班三组）
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = (word1, word2) => {
    let m = word1.length, n = word2.length, cost = [];
    for (let i = 0; i <= m; i++) cost.push(new Array(n + 1).fill(0));
    for (let k = 0; k <= m; k++) cost[k][0] = k;
    for (let p = 1; p <= n; p++) cost[0][p] = p;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (word1.charAt(i) === word2.charAt(j)) {
                cost[i + 1][j + 1] = cost[i][j];
            } else {
                let [a, b, c] = [cost[i][j], cost[i][j + 1], cost[i + 1][j]];
                cost[i + 1][j + 1] = 1 + (a < b ? Math.min(a, c) : Math.min(b, c));
            }
        }
    }
    return cost[m][n];
};
//leetcode submit region end(Prohibit modification and deletion)


//在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。
//
// 示例:
//
// 输入:
//
//1 0 1 0 0
//1 0 1 1 1
//1 1 1 1 1
//1 0 0 1 0
//
//输出: 4
// Related Topics 动态规划
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：221.最大正方形（https://leetcode-cn.com/problems/maximal-square/solution/zui-da-zheng-fang-xing-by-leetcode/）
 * 学号：1034（五期一班三组）
 * @param {string[][]} matrix
 * @return {number}
 */
const maximalSquare = function (matrix) {
    if (matrix.length === 0) return 0;
    let m = matrix.length, n = matrix[0].length, result = 0;
    let dp = [new Array(n + 1).fill(0)];
    for (let i = 1; i <= m; i++) {
        dp.push(new Array(n + 1).fill(0));
        for (let j = 1; j <= n; j++) {
            if (matrix[i - 1][j - 1] === '1') {
                dp[i][j] = Math.min(Math.min(dp[i][j - 1], dp[i - 1][j - 1]), dp[i - 1][j]) + 1;
                result = Math.max(dp[i][j], result);
            }
        }
    }
    return result ** 2;
};
//leetcode submit region end(Prohibit modification and deletion)

//给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
//
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
//
//
//
// 示例:
//
// 输入："23"
//输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
//
//
// 说明:
//尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。
// Related Topics 字符串 回溯算法
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：17.电话号码的字母组合（https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/）
 * 学号：1034（五期一班三组）
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function (digits) {
    if (!digits) return [];
    const TEL = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'],
        helper = (res, s, digits, depth) => {
            if (depth === digits.length) {
                res.push(s);
                return res;
            }
            let coolie = TEL[digits.charCodeAt(depth) - '0'.charCodeAt(0)];
            for (let c of coolie) helper(res, s + c, digits, depth + 1);
            return res;
        };
    return helper([], '', digits, 0);
};
//leetcode submit region end(Prohibit modification and deletion)
