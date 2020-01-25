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
const generateParenthesis = function(n) {
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
