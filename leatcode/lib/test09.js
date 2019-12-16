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
/**
 * 题目：76.最小覆盖子串
 * 标签：双指针 字符串 滑动窗口 哈希表
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = (s, t) => {
    if (!s || !t || s.length < t.length) return "";
    if (s === t) return s;
    let countedT = Array.from({length: 256}, () => (0));
    for (let k = 0; k < t.length; k++) countedT[t.charCodeAt(k)]++;
    let i = 0, j = 0, match = 0, wins = Array.from({length: 256}, () => (0)), start = 0, minLen = s.length + 1;
    while (j < s.length) {
        if (match < t.length) {
            let right = s.charCodeAt(j);
            if (countedT[right] > 0) {
                wins[right]++;
                if (wins[right] <= countedT[right]) match++;
            }
            j++;
        }
        while (match === t.length) {
            if (j - i < minLen) [start, minLen] = [i, j - i];
            let left = s.charCodeAt(i);
            if (wins[left] > 0) {
                wins[left]--;
                if (wins[left] < countedT[left]) match--;
            }
            i++;
        }
    }
    return minLen === s.length + 1 ? "" : s.substr(start, minLen);
};


/**
 * 题目28.实现 strStr()
 * 标签：双指针 字符串
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStrSlow = function (haystack, needle) {
    if (needle.length === 0) return 0;
    for (let i = 0; i < haystack.length; i++) {
        let hay = haystack.charAt(i);
        if (hay === needle.charAt(0) && haystack.substr(i, needle.length) === needle) {
            return i;
        }
    }
    return -1;
};

/**
 * 题目：28.实现 strStr()
 * 标签：字符串 双指针
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr = function (haystack, needle) {
    let [len1, len2, sub] = [haystack.length, needle.length, haystack.length - needle.length];
    if (len1 === sub) {
        return 0;
    } else if (sub < 0) {
        return -1;
    }
    for (let p = 0; p <= sub; p++) {
        if (haystack.charAt(p) === needle.charAt(0) && haystack.substr(p, len2) === needle) {
            return p;
        }
    }
    return -1;
};


/**
 * 题目：80.删除排序数组中的重复项 II
 * 标签：双指针 数组 原地算法
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function (nums) {
    let j = 0;
    for (let i = 0; i < nums.length; i++) {
        if (j < 2 || nums[i] > nums[j - 2]) {
            nums[j++] = nums[i];
        }
    }
    return j;
};

/**
 * 题目：15.三数之和
 * 标签：数组 双指针
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
    let res = [];
    if (!nums || nums.length < 3) {
        return res;
    }
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length - 2; i++) {
        if (i === 0 || nums[i] > nums[i - 1]) {
            let j = i + 1, k = nums.length - 1;
            while (j < k) {
                let add = nums[i] + nums[j] + nums[k];
                if (add > 0) {
                    k--;
                } else if (add < 0) {
                    j++;
                } else {
                    res.push([nums[i], nums[j], nums[k]]);
                    while (j < k && nums[j] === nums[++j]) ;
                    while (j < k && nums[k] === nums[--k]) ;
                }
            }
        }
    }
    return res;
};

/**
 * 题目：189.旋转数组
 * 标签：数组 双指针
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = function (nums, k) {
    let reverse = (begin, end, arry) => {
        while (begin < end) {
            [arry[begin], arry[end]] = [arry[end], arry[begin]];
            begin++;
            end--;
        }
    };
    k %= nums.length;
    if (k === 0) return;
    reverse(0, nums.length - 1, nums);
    reverse(0, k - 1, nums);
    reverse(k, nums.length - 1, nums);
};

class LeetCode_189_1034 {
    constructor() {

    }

    reverse(begin, end, nums) {
        while (begin < end) {
            nums[begin] ^= nums[end];
            nums[end] ^= nums[begin];
            nums[begin++] ^= nums[end--];
        }
    }

    /**
     * 题目：189.旋转数组（https://leetcode-cn.com/problems/rotate-array/）
     * 学号：1034（五期一班三组）
     * @param nums
     * @param k
     */
    rotate(nums, k) {
        k %= nums.length;
        if (!nums || nums.length < 2 || k === 0) {
            return;
        }
        this.reverse(0, nums.length - 1, nums);
        this.reverse(0, k - 1, nums);
        this.reverse(k, nums.length - 1, nums);
    }
}

/**
 * 题目：189.旋转数组
 * 标签：数组 双指针
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = function (nums, k) {
    new LeetCode_189_1034().rotate(nums, k);
};


// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。
// 以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
// 图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。
// 示例:
// 输入: [2,1,5,6,2,3]
// 输出: 10
// Related Topics 栈 数组
class Stack extends Array {
    constructor(any) {
        super();
        this.push(any);
    }

    peek() {
        return this.length > 0 ? this[this.length - 1] : null;
    }
}

/**
 * 题目：84.柱状图中的最大矩形（https://leetcode-cn.com/problems/largest-rectangle-in-histogram/）
 * 标签：栈 数组
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = function (heights) {
    let stack = new Stack(-1), maxArea = 0;
    for (let i = 0; i < heights.length; i++) {
        while (stack.peek() > -1 && heights[stack.peek()] >= heights[i]) {
            maxArea = Math.max(maxArea, heights[stack.pop()] * (i - stack.peek() - 1));
        }
        stack.push(i);
    }
    while (stack.peek() > -1) {
        maxArea = Math.max(maxArea, heights[stack.pop()] * (heights.length - stack.peek() - 1));
    }
    return maxArea;
};

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
//给定一个二叉树，返回它的中序 遍历。
//
// 示例:
//
// 输入: [1,null,2,3]
//   1
//    \
//     2
//    /
//   3
//
//输出: [1,3,2]
//
// 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
// Related Topics 栈 树 哈希表
/**
 * 94.二叉树的中序遍历（https://leetcode-cn.com/problems/binary-tree-inorder-traversal/）
 * 学员：1034（五期一班三组）
 * 标签：树 栈
 * @param {TreeNode} root
 * @return {number[]}
 */
const inorderTraversal = function(root) {
    const helper = (root, res) => {
        if (root) {
            if (root.left) {
                helper(root.left, res);
            }
            res.push(root.val);
            if (root.right) {
                helper(root.right, res);
            }
        }
    };
    let res = [];
    helper(root, res);
    return res;
};

//给定一个二叉树，返回它的 前序 遍历。
//
// 示例:
//
// 输入: [1,null,2,3]
//   1
//    \
//     2
//    /
//   3
//
//输出: [1,2,3]
//
//
// 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
// Related Topics 栈 树
/**
 * 144.二叉树的前序遍历（https://leetcode-cn.com/problems/binary-tree-preorder-traversal/）
 * 学员：1034（五期一班三组）
 * 标签：树 栈
 * @param {TreeNode} root
 * @return {number[]}
 */
const preorderTraversal = function(root) {
    const helper = (tree, res) => {
        if (tree) {
            res.push(tree.val);
            if (tree.left) {
                helper(tree.left, res);
            }
            if (tree.right) {
                helper(tree.right, res);
            }
        }
    };
    let res = [];
    helper(root, res);
    return res;
};

//给定一个二叉树，返回它的 后序 遍历。
//
// 示例:
//
// 输入: [1,null,2,3]
//   1
//    \
//     2
//    /
//   3
//
//输出: [3,2,1]
//
// 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
// Related Topics 栈 树
/**
 * 144.二叉树的后序遍历（https://leetcode-cn.com/problems/binary-tree-postorder-traversal/）
 * 学员：1034（五期一班三组）
 * 标签：树 栈
 * @param {TreeNode} root
 * @return {number[]}
 */
const postorderTraversal = function(root) {
    const helper = (tree, res) => {
        if (tree) {
            if (tree.left) {
                helper(tree.left, res);
            }
            if (tree.right) {
                helper(tree.right, res);
            }
            res.push(tree.val);
        }
    };
    let res = [];
    helper(root, res);
    return res;
};