/**
 * 题号：88.合并两个有序数组
 * 标签：数组 双指针
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function (nums1, m, nums2, n) {
    while (m > 0 && n > 0) {
        if (nums1[m - 1] >= nums2[n - 1]) {
            nums1[m + n - 1] = nums1[m - 1];
            m--;
        } else {
            nums1[m + n - 1] = nums2[n - 1];
            n--;
        }
    }
    // eval(`nums1.splice(0, n, ${nums2.slice(0, n).join(',')})`);
    for (let i = 0; i < n; i++) {
        nums1[i] = nums2[i];
    }
};

/**
 * 题号：283.移动零
 * 标签：数组、双指针
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const moveZeroes = function (nums) {
    if (nums.length === 0) return;
    let zero = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            [nums[i], nums[zero]] = [nums[zero], nums[i]];
            zero++;
        }
    }
};

/**
 * 题目：11.盛最多水的容器
 * 标签：数组 双指针
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function (height) {
    let [ans, i, j] = [0, 0, height.length - 1];
    while (i < j) {
        let minHeight = height[i] < height[j] ? height[i++] : height[j--];
        ans = Math.max(ans, minHeight * (j - i + 1));
    }
    return ans;
};

/**
 * 题目：70.爬楼梯
 * 标签：动态规划 数组 递归
 * @param {number} n
 * @return {number}
 */
const climbStairs = function (n) {
    // 爬到第N层楼梯后，往后退，只能退到N-1层楼梯或者N-2层楼梯，F(N) = F(N-1) + F(N-2) 斐波那契数列
    let tmp = Object.create(null);
    [tmp[1], tmp[2]] = [1, 2];
    for (let i = 3; i <= n; i++) {
        tmp[i] = tmp[i - 1] + tmp[i - 2];
    }
    return tmp[n];
};

/**
 * 题目：500.键盘行
 * 标签：哈希表
 * @param {string[]} words
 * @return {string[]}
 */
const findWords = function (words) {
    let isContains = (small, large) => {
        for (let sl of small) {
            if (!large.has(sl)) {
                return false;
            }
        }
        return true;
    };
    let res = [];
    const set1 = new Set(['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']);
    const set2 = new Set(['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']);
    const set3 = new Set(['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'z', 'x', 'c', 'v', 'b', 'n', 'm']);
    for (let wd of words) {
        let wdSet = new Set(wd.split(""));
        if (isContains(wdSet, set1) || isContains(wdSet, set2) || isContains(wdSet, set3)) {
            res.push(wd);
        }
    }
    return res;
};

/**
 * 题目：20.有效的括号
 * 标签：栈 字符串
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (strs) {
    // 时间复杂度 O(N^2) 暴力法
    const replaceBrackets = (ss) => {
        let lastStr = ss;
        while (lastStr.includes('()') || lastStr.includes('[]' || lastStr.includes('{}'))) {
            lastStr = lastStr.replace(/\(\)/g, "").replace(/{}/g, "").replace(/\[]/g, "");
        }
        return lastStr;
    };
    // return replaceBrackets(strs).length === 0;
    let stack = [];
    for (let s of strs) {
        if (s === '(') {
            stack.push(')');
        } else if (s === '{') {
            stack.push('}');
        } else if (s === '[') {
            stack.push(']');
        } else if (stack.length === 0 || stack.pop() !== s) {
            return false;
        }
    }
    return stack.length === 0;
};