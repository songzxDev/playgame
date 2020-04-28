//给你一个整数数组 nums，请你将该数组升序排列。 
//
// 
//
// 
// 
//
// 示例 1： 
//
// 输入：nums = [5,2,3,1]
//输出：[1,2,3,5]
// 
//
// 示例 2： 
//
// 输入：nums = [5,1,1,2,0,0]
//输出：[0,0,1,1,2,5]
// 
//
// 
//
// 提示： 
//
// 
// 1 <= nums.length <= 50000 
// -50000 <= nums[i] <= 50000 
// 
//
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray = (nums) => {
    if (!nums || nums.length < 2) return nums;
    const merge = (array, left, mid, right) => {
        let tmp = new Array(right - left + 1).fill(0);
        let i = left, j = mid + 1, k = 0;
        while (i <= mid && j <= right) tmp[k++] = array[i] < array[j] ? array[i++] : array[j++];
        while (i <= mid) tmp[k++] = array[i++];
        while (j <= right) tmp[k++] = array[j++];
        for (let p = 0; p < tmp.length; p++) array[left + p] = tmp[p];
    }, mergeSort = (array, left, right) => {
        if (right <= left) return;
        const mid = (left + right) >> 1;
        mergeSort(array, left, mid);
        mergeSort(array, mid + 1, right);
        merge(array, left, mid, right);
    };
    mergeSort(nums, 0, nums.length - 1);
    return nums;
};
//leetcode submit region end(Prohibit modification and deletion)

//给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord 的最短转换序列的长度。转换需遵循如下规则：
//
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
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
const ladderLength = (beginWord, endWord, wordList) => {
    if (wordList.length === 0 || !wordList.includes(endWord)) return 0;
    let wordSet = new Set(wordList), beginSet = new Set([beginWord]), endSet = new Set([endWord]), steps = 1;
    while (beginSet.size > 0) {
        if (beginSet.size > endSet.size) [beginSet, endSet] = [endSet, beginSet];
        let nextSet = new Set();
        for (let word of beginSet) {
            for (let i = 0; i < word.length; i++) {
                const prefix = word.slice(0, i), postfix = word.slice(i + 1);
                for (const c of "abcdefghijklmnopqrstuvwxyz") {
                    const target = prefix + c + postfix;
                    if (endSet.has(target)) return steps + 1;
                    if (wordSet.has(target)) {
                        wordSet.delete(target);
                        nextSet.add(target);
                    }
                }
            }
        }
        beginSet = nextSet;
        steps++;
    }
    return 0;
};
//leetcode submit region end(Prohibit modification and deletion)

const partition = (nums, begin, end) => {
    let pivot = end, counter = begin;
    for (let i = begin; i < end; i++) {
        if (nums[i] < nums[pivot]) {
            [nums[i], nums[counter]] = [nums[counter], nums[i]];
            counter++;
        }
    }
    [nums[pivot], nums[counter]] = [nums[counter], nums[pivot]];
    return counter;
};
const quickSort = (nums, begin, end) => {
    if (begin >= end) return;
    let pivot = partition(nums, begin, end);
    quickSort(nums, begin, pivot - 1);
    quickSort(nums, pivot + 1, end);
};

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArrayByQuick = function (nums) {
    if (!nums || nums.length < 2) return nums;
    quickSort(nums, 0, nums.length - 1);
    return nums;
};
//leetcode submit region end(Prohibit modification and deletion)
console.log(sortArrayByQuick([1, 88, 99, 3, -98, 271]));