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
//给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
//
// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
//
//
//
// 示例 1:
//
// 给定数组 nums = [1,1,2],
//
//函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。
//
//你不需要考虑数组中超出新长度后面的元素。
//
// 示例 2:
//
// 给定 nums = [0,0,1,1,1,2,2,3,3,4],
//
//函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。
//
//你不需要考虑数组中超出新长度后面的元素。
//
//
//
//
// 说明:
//
// 为什么返回数值是整数，但输出的答案是数组呢?
//
// 请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。
//
// 你可以想象内部操作如下:
//
// // nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
//int len = removeDuplicates(nums);
//
//// 在函数里修改输入数组对于调用者是可见的。
//// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
//for (int i = 0; i < len; i++) {
//    print(nums[i]);
//}
//
// Related Topics 数组 双指针


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function (nums) {
    let r = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i === 0 || nums[i - 1] < nums[i]) {
            nums[r++] = nums[i];
        }
    }
    return r;
};
//leetcode submit region end(Prohibit modification and deletion)
//将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
//
//
//
// 示例：
//
// 输入：1->2->4, 1->3->4
//输出：1->1->2->3->4->4
//
// Related Topics 链表


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
    if (!l1) return l2;
    if (!l2) return l1;
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};
//leetcode submit region end(Prohibit modification and deletion)
//给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
//
//
//
// 说明:
//
//
// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
// 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
//
//
//
//
// 示例:
//
// 输入:
//nums1 = [1,2,3,0,0,0], m = 3
//nums2 = [2,5,6],       n = 3
//
//输出: [1,2,2,3,5,6]
// Related Topics 数组 双指针


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function (nums1, m, nums2, n) {
    let i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) nums1[k--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
    while (j >= 0) nums1[j] = nums2[j--];
};
//leetcode submit region end(Prohibit modification and deletion)
//你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上
//被小偷闯入，系统会自动报警。
//
// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
//
//
//
// 示例 1：
//
// 输入：[1,2,3,1]
//输出：4
//解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
//     偷窃到的最高金额 = 1 + 3 = 4 。
//
// 示例 2：
//
// 输入：[2,7,9,3,1]
//输出：12
//解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
//     偷窃到的最高金额 = 2 + 9 + 1 = 12 。
//
//
//
//
// 提示：
//
//
// 0 <= nums.length <= 100
// 0 <= nums[i] <= 400
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number}
 */
const rob = function (nums) {
    if (!nums || nums.length === 0) return 0;
    const n = nums.length, stolen = [[0, nums[0]]];
    for (let i = 1; i < n; i++) stolen.push([0, 0]);
    for (let i = 1; i < n; i++) {
        stolen[i][1] = nums[i] + stolen[i - 1][0];
        stolen[i][0] = Math.max(stolen[i - 1][0], stolen[i - 1][1]);
    }
    return Math.max(stolen[n - 1][0], stolen[n - 1][1]);
};
//leetcode submit region end(Prohibit modification and deletion)


//给定一个二叉树，判断其是否是一个有效的二叉搜索树。
//
// 假设一个二叉搜索树具有如下特征：
//
//
// 节点的左子树只包含小于当前节点的数。
// 节点的右子树只包含大于当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。
//
//
// 示例 1:
//
// 输入:
//    2
//   / \
//  1   3
//输出: true
//
//
// 示例 2:
//
// 输入:
//    5
//   / \
//  1   4
//     / \
//    3   6
//输出: false
//解释: 输入为: [5,1,4,null,null,3,6]。
//     根节点的值为 5 ，但是其右子节点值为 4 。
//
// Related Topics 树 深度优先搜索


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root) {
    const validHelper = (node, leftFar, rightFar) => {
        if (!node) return true;
        if (node.val <= leftFar || node.val >= rightFar) return false;
        return validHelper(node.left, leftFar, node.val) && validHelper(node.right, node.val, rightFar);
    };
    return validHelper(root, -Infinity, Infinity);
};
//leetcode submit region end(Prohibit modification and deletion)
