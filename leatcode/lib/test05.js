/**
 * 46.全排列（回朔算法）
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {

    let backtrack = (first) => {
        if (first === n) {
            output.push(Array.from(nums));
        } else {
            for (let i = first; i < n; i++) {
                [nums[first], nums[i]] = [nums[i], nums[first]];
                backtrack(first + 1);
                [nums[first], nums[i]] = [nums[i], nums[first]];
            }
        }
    };
    let [n, output] = [nums.length, []];
    backtrack(0);
    return output;
};

/**
 * 260.只出现一次的数字 III 【位运算】
 * @param {number[]} nums
 * @return {number[]}
 */
const singleNumber = function (nums) {
    nums.sort(function (a, b) {
        return a - b;
    });
    let tmp = new Set();
    nums.forEach(function (value) {
        if (tmp.has(value)) {
            tmp.delete(value);
        } else {
            tmp.add(value);
        }
    });
    return Array.from(tmp);
};

/**
 * 77.组合（回朔算法）
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
    let backtrack = (start, k, n, pre, res) => {
        if (pre.length === k) {
            res.push(Array.from(pre));
            return;
        }
        for (let i = start; i < n + 1; i++) {
            pre.push(i);
            backtrack(i + 1, k, n, pre, res);
            pre.pop();
        }
    };
    if (n <= 0 || k <= 0 || k > n) return [];
    let res = [];
    backtrack(1, k, n, [], res);
    return res;
};

/**
 * 5222.分割平衡字符串（贪心算法）
 * @param {string} s
 * @return {number}
 */
const balancedStringSplit = function (s) {
    let ss = s.split('');
    let stack = Object.create(null);
    [stack['L'], stack['R']] = [0, 0];
    let ans = 0;
    for (let i = 0; i < s.length; i++) {
        stack[ss.pop()] += 1;
        if (stack['L'] === stack['R']) {
            ans += 1;
            [stack['L'], stack['R']] = [0, 0];
        }
    }
    return ans;
};

/**
 * 717.1 比特与 2 比特字符
 * @param {number[]} bits
 * @return {boolean}
 */
const isOneBitCharacter = function (bits) {
    let i = 0;
    while (i < bits.length) {
        let curr = bits[i];
        if (curr === 1) {
            i += 2;
            if (i >= bits.length) {
                return false;
            }
        } else {
            i += 1;
        }
    }
    return true;
};

/**
 * 485.最大连续1的个数
 * @param {number[]} nums
 * @return {number}
 */
const findMaxConsecutiveOnes = function (nums) {
    let res = 0;
    let j = nums.indexOf(1);
    if (j === -1) return 0;
    let k = nums.lastIndexOf(1);
    if (j === k) return 1;
    while (j <= k) {
        let ans = 0;
        while (j <= k && nums[j] === 1) {
            ans += 1;
            j++;
        }
        res = Math.max(res, ans);
        while (j <= k && nums[j] === 0) {
            j++;
        }
    }
    return res;
};

/**
 * 1185.一周中的第几天
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @return {string}
 */
const dayOfTheWeek = function (day, month, year) {
    let weekSet = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let datte = `${year}/${month <= 9 ? '0' + month : month}/${day <= 9 ? '0' + day : day}`;
    return weekSet[new Date(datte).getDay()];
};

/**
 * 80.删除排序数组中的重复项 II
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function (nums) {
    let n = 0;
    for (let num of nums) {
        if (n < 2 || num !== nums[n - 2]) {
            nums[n] = num;
            n++;
        }
    }
    return n;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * 206.反转链表
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
    let [prev, curr] = [null, head];
    while (curr !== null) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode(val) {
    this.val = val;
    [this.left, this.right] = [null, null];
}

/**
 * 104.二叉树的最大深度
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = function (root) {
    if (root === null) {
        return 0;
    } else {
        let leftHeight = maxDepth(root.left);
        let rightHeight = maxDepth(root.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
};

