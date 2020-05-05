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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

let randomArray = [];
for (let i = 0; i < 10000; i++) randomArray.push(getRandomIntInclusive(0, 10000));

console.log(sortArrayByQuick(randomArray));

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
    if (!strs || strs.length === 0) return [];
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
    const getNumKey = (str) => {
        let numKey = 1;
        for (let i = 0; i < str.length; i++) numKey *= primes[str.charCodeAt(i) - 97];
        return numKey;
    }, countMap = new Map();
    strs.forEach(str => {
        const numKey = getNumKey(str);
        countMap.has(numKey) ? countMap.get(numKey).push(str) : countMap.set(numKey, [str]);
    });
    return [...countMap.values()];
};


//给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。
//
// 你可以对一个单词进行如下三种操作：
//
//
// 插入一个字符
// 删除一个字符
// 替换一个字符
//
//
//
//
// 示例 1：
//
// 输入：word1 = "horse", word2 = "ros"
//输出：3
//解释：
//horse -> rorse (将 'h' 替换为 'r')
//rorse -> rose (删除 'r')
//rose -> ros (删除 'e')
//
//
// 示例 2：
//
// 输入：word1 = "intention", word2 = "execution"
//输出：5
//解释：
//intention -> inention (删除 't')
//inention -> enention (将 'i' 替换为 'e')
//enention -> exention (将 'n' 替换为 'x')
//exention -> exection (将 'n' 替换为 'c')
//exection -> execution (插入 'u')
//
// Related Topics 字符串 动态规划
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * leetcode72.编辑距离 https://leetcode-cn.com/problems/edit-distance/submissions/
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = function (word1, word2) {
    if (word1 === word2) return 0;
    let n1 = word1.length, n2 = word2.length, dp = [Array.from({length: n2 + 1}, (_, i) => i)]; // 第一行
    for (let i = 1; i < n1 + 1; i++) {
        dp.push(new Array(n2 + 1).fill(0));
        dp[i][0] = dp[i - 1][0] + 1;// 第一列
    }
    for (let i = 1; i < n1 + 1; i++) {
        for (let j = 1; j < n2 + 1; j++) {
            if (word1.charAt(i - 1) === word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], Math.min(dp[i - 1][j - 1], dp[i][j - 1])) + 1;
            }
        }
    }
    return dp[n1][n2];
};
//leetcode submit region end(Prohibit modification and deletion)
