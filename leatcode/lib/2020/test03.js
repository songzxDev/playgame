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
    constructor() {
    }

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

//根据一棵树的前序遍历与中序遍历构造二叉树。
//
// 注意:
//你可以假设树中没有重复的元素。
//
// 例如，给出
//
// 前序遍历 preorder = [3,9,20,15,7]
//中序遍历 inorder = [9,3,15,20,7]
//
// 返回如下的二叉树：
//
//     3
//   / \
//  9  20
//    /  \
//   15   7
// Related Topics 树 深度优先搜索 数组


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
const buildTree = function (preorder, inorder) {
    const inMap = inorder.reduce((act, cur, idx) => act.set(cur, idx), new Map());
    const buildHelper = (preLeft, preRight, inLeft, inRight) => {
        if (preLeft > preRight || inLeft > inRight) return null;
        let leftSize = inMap.get(preorder[preLeft]) - inLeft, rootIdx = inMap.get(preorder[preLeft]);
        let curRoot = new TreeNode(preorder[preLeft]);
        curRoot.left = buildHelper(preLeft + 1, preLeft + leftSize, inLeft, rootIdx - 1);
        curRoot.right = buildHelper(preLeft + leftSize + 1, preRight, rootIdx + 1, inRight);
        return curRoot;
    }
    return buildHelper(0, preorder.length - 1, 0, inorder.length - 1);
};
//leetcode submit region end(Prohibit modification and deletion)
