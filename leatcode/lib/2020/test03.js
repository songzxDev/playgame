function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * 将数组转换为一个链表
 * @param {Array} array
 * @returns {*}
 */
const getLinkNodeFromArray = (array) => {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }

    let node = null;
    if (Array.isArray(array) && array.length > 0) {
        node = new ListNode(array[0]);
        for (let i = 1; i < array.length; i++) {
            eval(`node.${new Array(i).fill('next').join('.')} = new ListNode(${array[i]})`);
        }
    }
    return node;
};

/**
 * 题目21.合并两个有序链表 https://leetcode-cn.com/problems/merge-two-sorted-lists/
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
    if (l1 === null) return l2;
    if (l2 === null) return l1;
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};

let a = [], b = [];
for (let i = 0; i < 99; i++) a.push(getRandomInt(99));
for (let i = 0; i < 101; i++) b.push(getRandomInt(101));
a.sort((x, y) => x - y);
b.sort((x, y) => x - y);
let node1 = getLinkNodeFromArray(a), node2 = getLinkNodeFromArray(b);
let afterMerge = mergeTwoLists(node1, node2);
console.log(JSON.stringify(afterMerge));

class SortArrayUtil {
    constructor () {}
    static countSort(nums) {
        if (!nums || nums.length < 2) return nums;
        let minNum = 0, maxNum = 0;
        for (let n of nums) [minNum, maxNum] = [Math.min(minNum, n), Math.max(maxNum, n)];
        let countSize = maxNum - minNum + 1, countArray = new Array(countSize).fill(0);
        for (let n of nums) countArray[n - minNum]++;
        for (let i = 1; i < countSize; i++) countArray[i] += countArray[i - 1];
        let copied = [...nums];
        for (let f = nums.length - 1; f >= 0; f--) {
            let k = --countArray[copied[f] - minNum];
            nums[k] = copied[f];
        }
        return nums;
    }
}

console.log(SortArrayUtil.countSort([99, -1, 37, 46, 85, 2, 9, 17]));