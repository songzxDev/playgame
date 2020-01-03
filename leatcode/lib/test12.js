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
const permute = function(nums) {
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

