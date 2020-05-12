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

let a = [-9, -2, -1, 0, 1, 2, 4, 7], b = [2, 5, 8, 11, 19, 21];

let node1 = getLinkNodeFromArray(a), node2 = getLinkNodeFromArray(b);
let afterMerge = mergeTwoLists(node1, node2);
console.log(JSON.stringify(afterMerge));