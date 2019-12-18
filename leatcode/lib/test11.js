//给定一个二叉树，判断其是否是一个有效的二叉搜索树。
//
// 假设一个二叉搜索树具有如下特征：
//
//
// 节点的左子树只包含小于当前节点的数。
// 节点的右子树只包含大于当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。
//
//
// 示例 1:
//
// 输入:
//    2
//   / \
//  1   3
//输出: true
//
//
// 示例 2:
//
// 输入:
//    5
//   / \
//  1   4
//     / \
//    3   6
//输出: false
//解释: 输入为: [5,1,4,null,null,3,6]。
//     根节点的值为 5 ，但是其右子节点值为 4 。
//
// Related Topics 树 深度优先搜索

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：98.验证二叉搜索树（https://leetcode-cn.com/problems/validate-binary-search-tree/submissions/）
 * 标签：树 深度优先搜索
 * 学号：1034（五期一班三组）
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root) {
    const helper = (tree, min, max) => {
        if (!tree) {
            return true;
        }
        if (tree.val <= min || tree.val >= max) {
            return false;
        }
        return helper(tree.left, min, tree.val) && helper(tree.right, tree.val, max);
    };
    let [min, max] = [-Math.pow(2, 53), Math.pow(2, 53) - 1];
    return helper(root, min, max);
};
//leetcode submit region end(Prohibit modification and deletion)

//给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
//
// 示例:
//
// 输入: n = 4, k = 2
//输出:
//[
//  [2,4],
//  [3,4],
//  [2,3],
//  [1,2],
//  [1,3],
//  [1,4],
//]
// Related Topics 回溯算法
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：77.组合（https://leetcode-cn.com/problems/combinations/）
 * 标签：递归 回溯算法
 * 学员：1034（五期一班三组）
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
    const helper = (combs, comb, a, n, k) => {
        if (k === 0) {
            combs.push(Array.from(comb));
            return;
        }
        for (let i = a; i <= n; i++) {
            comb.push(i);
            helper(combs, comb, i + 1, n, k - 1);
            comb.pop();
        }
    };
    let combs = [];
    helper(combs, [], 1, n, k);
    return combs;
};
//leetcode submit region end(Prohibit modification and deletion)
