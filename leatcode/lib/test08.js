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

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);
let node4 = new ListNode(4);
let node5 = new ListNode(5);
let node6 = new ListNode(6);
let node7 = new ListNode(7);
let node8 = new ListNode(8);
let node9 = new ListNode(9);
let node0 = new ListNode(0);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node6;
node6.next = node7;
node7.next = node8;
node8.next = node9;
node9.next = node0;
node0.next = null;
console.log(JSON.stringify(node1));
console.log(JSON.stringify(node5));

/**
 * 876.链表的中间节点
 * 标签：链表
 * @param {ListNode} head
 * @return {ListNode}
 */
const middleNode = function (head) {
    let [slow, fast] = [head, head];
    while (fast && fast.next) {
        [slow, fast] = [slow.next, fast.next.next];
    }
    return slow;
};

/**
 * 题目：283.移动零
 * 标签：双指针 数组
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const moveZeroes = function (nums) {
    let snowballLength = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            snowballLength++;
        } else if (snowballLength > 0) {
            [nums[i], nums[i - snowballLength]] = [nums[i - snowballLength], nums[i]];
        }
    }
};