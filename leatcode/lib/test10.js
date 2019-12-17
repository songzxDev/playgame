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

class Node {
    constructor(val, children) {
        this.val = val;
        this.children = children;
    }
}

//给定一个 N 叉树，返回其节点值的前序遍历。
//
// 例如，给定一个 3叉树 :
//
// 返回其前序遍历: [1,3,5,6,2,4]。
//
// 说明: 递归法很简单，你可以使用迭代法完成此题吗? Related Topics 树
/**
 * 题目：589.N叉树的前序遍历（https://leetcode-cn.com/problems/n-ary-tree-preorder-traversal/）
 * 标签：树
 * 学号：1034（五期一班三组）
 * @param {Node} root
 * @return {number[]}
 */
const preorder = function (root) {
    const helper = (tree, res) => {
        if (tree) {
            res.push(tree.val);
            if (tree.children) {
                for (let child of tree.children) {
                    helper(child, res);
                }
            }
        }
    };
    let res = [];
    helper(root, res);
    return res;
};

//给定一个 N 叉树，返回其节点值的后序遍历。
//
// 例如，给定一个 3叉树 :
//
//
//
//
//
//
//
// 返回其后序遍历: [5,6,3,2,4,1].
//
//
//
// 说明: 递归法很简单，你可以使用迭代法完成此题吗? Related Topics 树


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：590.N叉树的后续遍历（https://leetcode-cn.com/problems/n-ary-tree-postorder-traversal/）
 * 学号：1034（五期一班三组）
 * 标签：树
 * @param {Node} root
 * @return {number[]}
 */
const postorder = function (root) {
    const helper = (tree, res) => {
        if (tree) {
            if (tree.children) {
                for (let child of tree.children) {
                    helper(child, res);
                }
            }
            res.push(tree.val);
        }
    };
    let res = [];
    helper(root, res);
    return res;
};
//leetcode submit region end(Prohibit modification and deletion)

//给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。
//
// 例如，给定一个 3叉树 :
//
// 返回其层序遍历:
//
// [
//     [1],
//     [3,2,4],
//     [5,6]
//]
//
// 说明:
//
// 树的深度不会超过 1000。
// 树的节点总数不会超过 5000。
// Related Topics 树 广度优先搜索
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：429.N叉树的层序遍历（https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/）
 * 标签：树
 * 学号：1034（五期一班三组）
 * @param {Node} root
 * @return {number[][]}
 */
const levelOrder = function (root) {
    const helper = (tree, level, res) => {
        if (tree) {
            let dep = res.length > level ? res[level] : [];
            dep.push(tree.val);
            if (res.length <= level) {
                res.push(dep);
            }
            if (tree.children) {
                for (let child of tree.children) {
                    helper(child, level + 1, res);
                }
            }

        }
    };
    let res = [];
    helper(root, 0, res);
    return res;
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
 * 标签：树 递归
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
    const helper = (left, right, n, s, res) => {
        if (left === n && right === n) {
            res.push(s);
            return;
        }
        if (left < n) {
            helper(left + 1, right, n, s.concat('('), res);
        }
        if (left > right) {
            helper(left, right + 1, n, s.concat(')'), res);
        }
    };
    let res = [];
    helper(0, 0, n, '', res);
    return res;
};
//leetcode submit region end(Prohibit modification and deletion)


//假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
//
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
//
// 注意：给定 n 是一个正整数。
//
// 示例 1：
//
// 输入： 2
//输出： 2
//解释： 有两种方法可以爬到楼顶。
//1.  1 阶 + 1 阶
//2.  2 阶
//
// 示例 2：
//
// 输入： 3
//输出： 3
//解释： 有三种方法可以爬到楼顶。
//1.  1 阶 + 1 阶 + 1 阶
//2.  1 阶 + 2 阶
//3.  2 阶 + 1 阶
//
// Related Topics 动态规划
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：70.爬楼梯（https://leetcode-cn.com/problems/climbing-stairs/）
 * 标签：树 递归
 * 学号：1034（五期一班三组）
 * @param {number} n
 * @return {number}
 */
const climbStairs = function (n) {
    if (n < 4) {
        return n;
    }
    const helper = (a, n, storage) => {
        // f(n) = f(n - 1) + f(n - 2);
        if (a > n) {
            return;
        }
        storage.push(storage[a - 1] + storage[a - 2]);
        helper(a + 1, n, storage);
    };
    let storage = [0, 1, 2, 3];
    helper(4, n, storage);
    return storage[n];
};
//leetcode submit region end(Prohibit modification and deletion)

//翻转一棵二叉树。
//
// 示例：
//
// 输入：
//
//     4
//   /   \
//  2     7
// / \   / \
//1   3 6   9
//
// 输出：
//
//     4
//   /   \
//  7     2
// / \   / \
//9   6 3   1
//
// 备注:
//这个问题是受到 Max Howell 的 原问题 启发的 ：
//
// 谷歌：我们90％的工程师使用您编写的软件(Homebrew)，但是您却无法在面试时在白板上写出翻转二叉树这道题，这太糟糕了。
// Related Topics 树
//leetcode submit region begin(Prohibit modification and deletion)
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/**
 * 题目：226.翻转二叉树（https://leetcode-cn.com/problems/invert-binary-tree/）
 * 标签：树 递归
 * 学号：1034（五期一班三组）
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = function (root) {
    const helper = (tree) => {
        if (!tree || (!tree.left && !tree.right)) {
            return;
        }
        [tree.left, tree.right] = [tree.right, tree.left];
        helper(tree.left);
        helper(tree.right);
    };
    helper(root);
    return root;
};
//leetcode submit region end(Prohibit modification and deletion)


//给定一个二叉树，判断其是否是一个有效的二叉搜索树。
// 假设一个二叉搜索树具有如下特征：
// 节点的左子树只包含小于当前节点的数。
// 节点的右子树只包含大于当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。
// 示例 1:
//
// 输入:
//    2
//   / \
//  1   3
//输出: true
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
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：98.验证二叉搜索树（https://leetcode-cn.com/problems/validate-binary-search-tree/）
 * 标签：树 递归 深度优先搜索
 * 学号：1034（五期一班三组）
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root) {
    let cur = root, pre = null, stack = [];
    while (stack.length > 0 || cur) {
        if (cur) {
            stack.push(cur);
            cur = cur.left;
        } else {
            let p = stack.pop();
            if (pre && p.val <= pre.val) {
                return false;
            }
            pre = p;
            cur = p.right;
        }
    }
    return true;
};
//leetcode submit region end(Prohibit modification and deletion)

//给定一个二叉树，找出其最大深度。
//
// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
//
// 说明: 叶子节点是指没有子节点的节点。
//
// 示例：
//给定二叉树 [3,9,20,null,null,15,7]，
//
//     3
//   / \
//  9  20
//    /  \
//   15   7
//
// 返回它的最大深度 3 。
// Related Topics 树 深度优先搜索
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：104.二叉树的最大深度（https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/）
 * 标签：树 深度优先搜索
 * 学号：1034（五期一班三组）
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = function (root) {
    const helper = (tree) => {
        if (!tree) {
            return 0;
        }
        return Math.max(helper(tree.left), helper(tree.right)) + 1;
    };
    return helper(root);
};
//leetcode submit region end(Prohibit modification and deletion)

//给定一个二叉树，找出其最小深度。
//
// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
//
// 说明: 叶子节点是指没有子节点的节点。
//
// 示例:
//
// 给定二叉树 [3,9,20,null,null,15,7],
//
//     3
//   / \
//  9  20
//    /  \
//   15   7
//
// 返回它的最小深度 2.
// Related Topics 树 深度优先搜索 广度优先搜索
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：111.二叉树的最小深度（https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/）
 * 标签：树 深度优先搜索
 * 学号：1034（五期一班三组）
 * @param {TreeNode} root
 * @return {number}
 */
const minDepth = function (root) {
    const helper = (tree) => {
        if (!tree) {
            return 0;
        }
        if (!tree.left && !tree.right) {
            return 1;
        }
        let minNum = 2147483647;
        if (tree.left) {
            minNum = Math.min(helper(tree.left), minNum);
        }
        if (tree.right) {
            minNum = Math.min(helper(tree.right), minNum);
        }
        return minNum + 1;
    };
    return helper(root);
};
//leetcode submit region end(Prohibit modification and deletion)
