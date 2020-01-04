//给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换需遵循如下规则：
// 每次转换只能改变一个字母。
// 转换过程中的中间单词必须是字典中的单词。
// 说明:
// 如果不存在这样的转换序列，返回 0。
// 所有单词具有相同的长度。
// 所有单词只由小写字母组成。
// 字典中不存在重复的单词。
// 你可以假设 beginWord 和 endWord 是非空的，且二者不相同。
// 示例 1:
// 输入:
//beginWord = "hit",
//endWord = "cog",
//wordList = ["hot","dot","dog","lot","log","cog"]
//输出: 5
//解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
//     返回它的长度 5。
// 示例 2:
// 输入:
//beginWord = "hit"
//endWord = "cog"
//wordList = ["hot","dot","dog","lot","log"]
//输出: 0
//解释: endWord "cog" 不在字典中，所以无法进行转换。
// Related Topics 广度优先搜索
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：127.单词接龙（https://leetcode-cn.com/problems/word-ladder/submissions/）
 * 学号：1034（五期一班三组）
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
const ladderLength = function (beginWord, endWord, wordList) {
    const getStatusKey = (word, k) => word.substr(0, k) + '*' + word.substr(k + 1), LEN = endWord.length;
    let statusTreeMap = new Map();
    for (let word of wordList) {
        for (let k = 0; k < LEN; k++) {
            let statusKey = getStatusKey(word, k);
            if (!statusTreeMap.has(statusKey)) {
                statusTreeMap.set(statusKey, []);
            }
            statusTreeMap.get(statusKey).push(word);
        }
    }
    let [visited, queue] = [new Set([beginWord]), [[beginWord, 1]]];
    while (queue.length > 0) {
        let [currWord, currLen] = queue.shift();
        for (let k = 0; k < LEN; k++) {
            let statusKey = getStatusKey(currWord, k);
            if (statusTreeMap.has(statusKey)) {
                for (let word of statusTreeMap.get(statusKey)) {
                    if (word === endWord) {
                        return currLen + 1;
                    } else if (!visited.has(word)) {
                        visited.add(word);
                        queue.push([word, currLen + 1]);
                    }
                }
                statusTreeMap.delete(statusKey);
            }
        }
    }
    return 0;
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
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
    const helper = (perms, perm, nums) => {
        if (perm.length === nums.length) {
            perms.push([...perm]);
            return perms;
        }
        for (let i = 0; i < nums.length; i++) {
            if (perm.indexOf(nums[i]) === -1) {
                perm.push(nums[i]);
                helper(perms, perm, nums);
                perm.pop();
            }
        }
        return perms;
    };
    return helper([], [], nums);
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
 * @param {number} n
 * @return {number}
 */
const climbStairs = function (n) {
    const memo = new Map([[1, 1], [2, 2], [3, 3]]);
    const helper = (n) => {
        return memo.has(n) ? memo.get(n) : memo.set(n, helper(n - 1) + helper(n - 2)).get(n);
    };
    return helper(n);
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
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function (digits) {
    const MEMO = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
    if (digits.length > 0) {
        const helper = (res, cur, depth, digits) => {
            if (depth === digits.length) {
                res.push(cur);
                return res;
            }
            let coolie = MEMO[digits.charCodeAt(depth) - '0'.charCodeAt(0)];
            for (let k of coolie) {
                helper(res, cur + k, depth + 1, digits);
            }
            return res;
        };
        return helper([], '', 0, digits);
    }
    return [];
};
//leetcode submit region end(Prohibit modification and deletion)

//反转一个单链表。
//
// 示例:
//
// 输入: 1->2->3->4->5->NULL
//输出: 5->4->3->2->1->NULL
//
// 进阶:
//你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
// Related Topics 链表
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * 题目：206.反转链表（https://leetcode-cn.com/problems/reverse-linked-list/）
 * 学号：1034（五期一班三组）
 * 标签：递归 遍历 链表
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
    const helper = (node) => {
        if (!node || !node.next) {
            return node;
        }
        let prev = helper(node.next);
        console.log(`before prev-${prev.val} -> ${JSON.stringify(prev)}`);
        console.log(`before node-${node.val} -> ${JSON.stringify(node)}`);
        console.log('----------------------------------------------------------------------------');
        node.next.next = node;
        node.next = null;
        console.log(`after node-${node.val} -> ${JSON.stringify(node)}`);
        console.log(`after prev-${prev.val} -> ${JSON.stringify(prev)}`);
        console.log(`head -> ${JSON.stringify(head)}`);
        console.log('');
        console.log('============================================================================');
        console.log('');
        return prev;
    };
    return helper(head);
};

let head = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4,
                next: {
                    val: 5,
                    next: null
                }
            }
        }
    }
};
reverseList(head);
//leetcode submit region end(Prohibit modification and deletion)
