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

//你现在是棒球比赛记录员。
//给定一个字符串列表，每个字符串可以是以下四种类型之一：
//1.整数（一轮的得分）：直接表示您在本轮中获得的积分数。
//2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
//3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
//4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。
//
//每一轮的操作都是永久性的，可能会对前一轮和后一轮产生影响。
//你需要返回你在所有回合中得分的总和。
//
// 示例 1:
//
// 输入: ["5","2","C","D","+"]
//输出: 30
//解释:
//第1轮：你可以得到5分。总和是：5。
//第2轮：你可以得到2分。总和是：7。
//操作1：第2轮的数据无效。总和是：5。
//第3轮：你可以得到10分（第2轮的数据已被删除）。总数是：15。
//第4轮：你可以得到5 + 10 = 15分。总数是：30。
//
//
// 示例 2:
//
// 输入: ["5","-2","4","C","D","9","+","+"]
//输出: 27
//解释:
//第1轮：你可以得到5分。总和是：5。
//第2轮：你可以得到-2分。总数是：3。
//第3轮：你可以得到4分。总和是：7。
//操作1：第3轮的数据无效。总数是：3。
//第4轮：你可以得到-4分（第三轮的数据已被删除）。总和是：-1。
//第5轮：你可以得到9分。总数是：8。
//第6轮：你可以得到-4 + 9 = 5分。总数是13。
//第7轮：你可以得到9 + 5 = 14分。总数是27。
//
//
// 注意：
//
//
// 输入列表的大小将介于1和1000之间。
// 列表中的每个整数都将介于-30000和30000之间。
//
// Related Topics 栈
/**
 * 题目：682.棒球比赛
 * 标签：栈
 * @param {string[]} ops
 * @return {number}
 */
const calPoints = function (ops) {
    // ["5","-2","4","C","D","9","+","+"]
    let stack = [];
    // 1.整数（一轮的得分）：直接表示您在本轮中获得的积分数。
    // 2. "+"（一轮的得分）：表示本轮获得的得分是前两轮有效 回合得分的总和。
    // 3. "D"（一轮的得分）：表示本轮获得的得分是前一轮有效 回合得分的两倍。
    // 4. "C"（一个操作，这不是一个回合的分数）：表示您获得的最后一个有效 回合的分数是无效的，应该被移除。
    for (let op of ops) {
        if (op === 'C' && stack.length > 0) {
            stack.pop();
        } else if (op === 'D' && stack.length > 0) {
            stack.push(parseInt(stack[stack.length - 1], 10) * 2);
        } else if (op === '+' && stack.length > 0) {
            stack.push(stack.length > 1 ? parseInt(stack[stack.length - 1], 10) + parseInt(stack[stack.length - 2], 10) : parseInt(stack[stack.length - 1], 10));
        } else if (op !== 'D' && op !== '+' && op !== 'C') {
            stack.push(parseInt(op, 10));
        }
    }
    return stack.length === 0 ? 0 : eval(stack.join('+'));
};
console.log(calPoints(["5", "-2", "4", "C", "D", "9", "+", "+"])); // 27
console.log(calPoints(["5", "2", "C", "D", "+"])); // 30
console.log(calPoints([])); // 30
console.log(calPoints(["D", "D"])); // 30