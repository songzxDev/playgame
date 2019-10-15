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
