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