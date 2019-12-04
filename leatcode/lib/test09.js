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

