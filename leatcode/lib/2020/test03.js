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
    const inorderMap = inorder.reduce((act, cur, idx) => act.set(cur, idx), new Map());
    const buildHelper = (preLeft, preRight, inLeft, inRight) => {
        if (preLeft > preRight || inLeft > inRight) return null;
        const inRootIdx = inorderMap.get(preorder[preLeft]), leftSubtreeLen = inRootIdx - 1 - inLeft + 1;
        const curRoot = new TreeNode(preorder[preLeft]);
        curRoot.left = buildHelper(preLeft + 1, preLeft + leftSubtreeLen, inLeft, inRootIdx - 1);
        curRoot.right = buildHelper(preLeft + leftSubtreeLen + 1, preRight, inRootIdx + 1, inRight);
        return curRoot;
    };
    return buildHelper(0, preorder.length - 1, 0, inorder.length - 1);
};
//leetcode submit region end(Prohibit modification and deletion)
//给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
//
// 示例:
//
// 输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
//输出:
//[
//  ["ate","eat","tea"],
//  ["nat","tan"],
//  ["bat"]
//]
//
// 说明：
//
//
// 所有输入均为小写字母。
// 不考虑答案输出的顺序。
//
// Related Topics 哈希表 字符串


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
    if (!strs || strs.length === 0) return [];
    const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
    const groupMap = new Map(), getNumKey = (stt) => {
        let numKey = 1;
        for (let i = 0; i < stt.length; i++) numKey *= PRIMES[stt.charCodeAt(i) - 97];
        return numKey;
    };
    strs.forEach(stt => {
        const numKey = getNumKey(stt);
        groupMap.has(numKey) ? groupMap.get(numKey).push(stt) : groupMap.set(numKey, [stt]);
    });
    return [...groupMap.values()];
};
//leetcode submit region end(Prohibit modification and deletion)
//给你一个字符串 S、一个字符串 T，请在字符串 S 里面找出：包含 T 所有字符的最小子串。
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


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
    if (!s || !t || s.length < t.length) return '';
    let [i, j, start, minLen, found, sMap, tMap] = [0, 0, 0, 0x7fffffff, 0, [], []];
    for (let i = 0; i < 256; i++) sMap.push(tMap.push(0) & 0);
    for (let j = 0; j < t.length; j++) tMap[t.charCodeAt(j)]++;
    while (j < s.length) {
        if (found < t.length) {
            const prev = s.charCodeAt(j++);
            if (tMap[prev] > 0) if (++sMap[prev] <= tMap[prev]) found++;
        }
        while (found === t.length) {
            if (j - i < minLen) [start, minLen] = [i, j - i];
            const next = s.charCodeAt(i++);
            if (tMap[next] > 0) if (--sMap[next] < tMap[next]) found--;
        }
    }
    return minLen === 0x7fffffff ? "" : s.substr(start, minLen);
};
//leetcode submit region end(Prohibit modification and deletion)
