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
