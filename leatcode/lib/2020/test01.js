//给你一份『词汇表』（字符串数组） words 和一张『字母表』（字符串） chars。
//
// 假如你可以用 chars 中的『字母』（字符）拼写出 words 中的某个『单词』（字符串），那么我们就认为你掌握了这个单词。
//
// 注意：每次拼写时，chars 中的每个字母都只能用一次。
//
// 返回词汇表 words 中你掌握的所有单词的 长度之和。
//
//
//
// 示例 1：
//
// 输入：words = ["cat","bt","hat","tree"], chars = "atach"
//输出：6
//解释：
//可以形成字符串 "cat" 和 "hat"，所以答案是 3 + 3 = 6。
//
//
// 示例 2：
//
// 输入：words = ["hello","world","leetcode"], chars = "welldonehoneyr"
//输出：10
//解释：
//可以形成字符串 "hello" 和 "world"，所以答案是 5 + 5 = 10。
//
//
//
//
// 提示：
//
//
// 1 <= words.length <= 1000
// 1 <= words[i].length, chars.length <= 100
// 所有字符串中都仅包含小写英文字母
//
// Related Topics 数组 哈希表
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目-1160-拼写单词 https://leetcode-cn.com/problems/find-words-that-can-be-formed-by-characters/
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
const countCharacters = (words, chars) => {
    if (!words || words.length === 0 || !chars) return 0;
    let isKnowWord = (word, chrCount) => {
        let wordCount = new Array(26).fill(0);
        for (let i = 0; i < word.length; i++) {
            let wd = word.charCodeAt(i) - 97;
            if (wordCount[wd]++ === chrCount[wd]) return false;
        }
        return true;
    }, ans = 0, chrCount = new Array(26).fill(0);
    for (let k = 0; k < chars.length; k++) chrCount[chars.charCodeAt(k) - 97]++;
    for (let word of words) if (isKnowWord(word, chrCount)) ans += word.length;
    return ans;
};
//leetcode submit region end(Prohibit modification and deletion)

//一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
//
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
//
// 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
//
//
//
// 网格中的障碍物和空位置分别用 1 和 0 来表示。
//
// 说明：m 和 n 的值均不超过 100。
//
// 示例 1:
//
// 输入:
//[
//  [0,0,0],
//  [0,1,0],
//  [0,0,0]
//]
//输出: 2
//解释:
//3x3 网格的正中间有一个障碍物。
//从左上角到右下角一共有 2 条不同的路径：
//1. 向右 -> 向右 -> 向下 -> 向下
//2. 向下 -> 向下 -> 向右 -> 向右
//
// Related Topics 数组 动态规划
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * 题目：63.不通路径II https://leetcode-cn.com/problems/unique-paths-ii/
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
const uniquePathsWithObstacles = (obstacleGrid) => {
    if (!obstacleGrid || obstacleGrid.length === 0) return 0;
    let m = obstacleGrid.length, n = obstacleGrid[0].length, steps = [];
    if (obstacleGrid[m - 1][n - 1] === 1) return 0;
    for (let s = 0; s < m; s++) steps.push(new Array(n).fill(0));
    steps[m - 1][n - 1] = 1;
    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (obstacleGrid[i][j] === 1) {
                steps[i][j] = 0;
            } else if (i === m - 1) {
                if (j < n - 1) steps[i][j] = steps[i][j + 1];
            } else if (j === n - 1) {
                if (i < m - 1) steps[i][j] = steps[i + 1][j];
            } else {
                steps[i][j] = steps[i + 1][j] + steps[i][j + 1];
            }
        }
    }
    return steps[0][0];
};
//leetcode submit region end(Prohibit modification and deletion)

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
 * 题目-912：排序数组 https://leetcode-cn.com/problems/sort-an-array/
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray = (nums) => {
    if (nums.length <= 1) return nums;
    let pivot = nums[Math.random() * nums.length | 0], lt = [], eq = [], gt = [];
    for (let n of nums) {
        if (n === pivot) eq.push(n);
        if (n > pivot) gt.push(n);
        if (n < pivot) lt.push(n);
    }
    return [...sortArray(lt), ...eq, ...sortArray(gt)];
};
//leetcode submit region end(Prohibit modification and deletion)

