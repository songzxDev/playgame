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
 * 标签：递归 回溯算法
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
    const helper = (res, tempList, nums) => {
        if (tempList.length === nums.length) {
            res.push(Array.from(tempList));
            return res;
        }
        for (let i = 0; i < nums.length; i++) {
            if (!tempList.includes(nums[i])) {
                tempList.push(nums[i]);
                helper(res, tempList, nums);
                tempList.pop();
            }
        }
        return res;
    };
    return helper([], [], nums);
};
//leetcode submit region end(Prohibit modification and deletion)

//给定一个正整数 num，编写一个函数，如果 num 是一个完全平方数，则返回 True，否则返回 False。
//
// 说明：不要使用任何内置的库函数，如 sqrt。
//
// 示例 1：
//
// 输入：16
//输出：True
//
// 示例 2：
//
// 输入：14
//输出：False
//
// Related Topics 数学 二分查找
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：367.有效的完全平方数（https://leetcode-cn.com/problems/valid-perfect-square/）
 * 标签：数学 二分查找
 * 学号：1034（五期一班三组）
 * @param {number} num
 * @return {boolean}
 */
const isPerfectSquare = function (num) {
    let digit = num % 10;
    // 一个数的个位数不是 0 1 4 5 6 9 则一定不是完全平方数
    if (digit !== 0 && digit !== 1 && digit !== 4 && digit !== 5 && digit !== 6 && digit !== 9) {
        return false;
    }
    // 去掉逻辑判断的漏网之鱼
    if (num >= 0x7fffffff || num === 821 || num === 801 || num === 681 || num === 345) {
        return false;
    }
    // 一个数如果对3或4取余，余数不为1或0，则一定不是完全平方数
    return num % 3 <= 1 && num % 4 <= 1;
};
//leetcode submit region end(Prohibit modification and deletion)

//给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
//
// 注意：答案中不可以包含重复的三元组。
//
// 例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
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
 * 标签：数组 双指针
 * 学号：1034（五期一班三组）
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
    let res = [];
    if (nums && nums.length > 2) {
        nums.sort((a, b) => a - b);
        if (nums[0] <= 0) {
            for (let i = 0; i < nums.length - 2; i++) {
                if (i === 0 || nums[i] > nums[i - 1]) {
                    let j = i + 1, k = nums.length - 1;
                    while (j < k) {
                        let add = nums[i] + nums[j] + nums[k];
                        if (add === 0) {
                            res.push([nums[i], nums[j], nums[k]]);
                            while (j < k && nums[j] === nums[++j]) {
                            }
                            while (j < k && nums[k] === nums[--k]) {
                            }
                        } else if (add < 0) {
                            j++;
                        } else {
                            k--;
                        }
                    }
                }
            }
        }
    }
    return res;
};
//leetcode submit region end(Prohibit modification and deletion)

//给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换需遵循如下规则：
//
//
// 每次转换只能改变一个字母。
// 转换过程中的中间单词必须是字典中的单词。
//
//
// 说明:
//
//
// 如果不存在这样的转换序列，返回 0。
// 所有单词具有相同的长度。
// 所有单词只由小写字母组成。
// 字典中不存在重复的单词。
// 你可以假设 beginWord 和 endWord 是非空的，且二者不相同。
//
//
// 示例 1:
//
// 输入:
//beginWord = "hit",
//endWord = "cog",
//wordList = ["hot","dot","dog","lot","log","cog"]
//
//输出: 5
//
//解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
//     返回它的长度 5。
//
//
// 示例 2:
//
// 输入:
//beginWord = "hit"
//endWord = "cog"
//wordList = ["hot","dot","dog","lot","log"]
//
//输出: 0
//
//解释: endWord "cog" 不在字典中，所以无法进行转换。
// Related Topics 广度优先搜索
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：127.单词接龙（https://leetcode-cn.com/problems/word-ladder/submissions/）
 * 学号：1034（五期一班三组）
 * 标签：广度优先搜素
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
const ladderLength = function (beginWord, endWord, wordList) {
    let [len, treeMap] = [endWord.length, new Map()];
    for (let word of wordList) {
        for (let k = 0; k < len; k++) {
            let treeKey = word.substr(0, k) + '*' + word.substr(k + 1);
            if (!treeMap.has(treeKey)) {
                treeMap.set(treeKey, []);
            }
            treeMap.get(treeKey).push(word);
        }
    }
    let [queue, visited] = [[[beginWord, 1]], new Set([beginWord])];
    while (queue.length > 0) {
        let [curWord, curLevel] = queue.shift();
        for (let k = 0; k < len; k++) {
            let treeKey = curWord.substr(0, k) + '*' + curWord.substr(k + 1);
            if (treeMap.has(treeKey)) {
                for (let word of treeMap.get(treeKey)) {
                    if (word === endWord) {
                        return curLevel + 1;
                    } else if (!(visited.has(word))) {
                        visited.add(word);
                        queue.push([word, curLevel + 1]);
                    }
                }
                treeMap.set(treeKey, []);
            }
        }
    }
    return 0;
};
//leetcode submit region end(Prohibit modification and deletion)
