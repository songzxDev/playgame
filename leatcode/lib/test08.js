/**
 * 题目：76.最小覆盖子串
 * 标签：双指针 字符串 滑动窗口
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = (s, t) => {
    if (!s || !t || s.length < t.length) return "";
    let [tCount, winds] = [Array.from({length: 256}, () => (0)), Array.from({length: 256}, () => (0))];
    for (let i = 0; i < t.length; i++) tCount[t.charCodeAt(i)]++;
    let [left, right, match, start, minLen] = [0, 0, 0, 0, s.length + 1];
    while (right < s.length) {
        if (match < t.length) {
            let rightIdx = s.charCodeAt(right);
            if (tCount[rightIdx] > 0) {
                winds[rightIdx]++;
                if (winds[rightIdx] <= tCount[rightIdx]) {
                    match++;
                }
            }
            right++;
        }
        while (match === t.length) {
            if (right - left < minLen) {
                start = left;
                minLen = right - left;
            }
            let leftIdx = s.charCodeAt(left);
            if (tCount[leftIdx] > 0) {
                winds[leftIdx]--;
                if (winds[leftIdx] < tCount[leftIdx]) {
                    match--;
                }
            }
            left++;
        }
    }
    return minLen === s.length + 1 ? "" : s.substr(start, minLen);
};

class NodeList {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
let node1 = new NodeList(1);
let node2 = new NodeList(2);
let node3 = new NodeList(3);
node1.next = node2;
node2.next = node3;

console.log(node1);
console.log(node1.next);
console.log(node1.next.next);