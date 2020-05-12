function ListNode(val) {
    this.val = val;
    this.next = null;
}

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

let a = [1, 2, 4, 7], b = [2, 5, 8, 11, 19];

let node1 = new ListNode(a[0]), node2 = new ListNode(b[0]);
for (let i = 1; i < a.length; i++) {
    eval(`node1.${new Array(i).fill('next').join('.')} = new ListNode(${a[i]})`);
}
for (let j = 1; j < b.length; j++) {
    eval(`node2.${new Array(j).fill('next').join('.')} = new ListNode(${b[j]})`);
}

let afterMerge = mergeTwoLists(node1, node2);
console.log(JSON.stringify(afterMerge));