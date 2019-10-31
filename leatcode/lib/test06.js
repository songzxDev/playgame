// =========== 动态规划 ===========
/**
 * 1143.最长公共子序列（动态规划）
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = function (text1, text2) {
    let dp = Array.from({length: text1.length + 1}, () => (
        Array.from({length: text2.length + 1}, () => (0)))
    );
    for (let i = 1; i < text1.length + 1; i++) {
        for (let j = 1; j < text2.length + 1; j++) {
            if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[text1.length][text2.length];
};

/**
 * 64.最小路径和（数组、动态规划）
 * @param {number[][]} grid
 * @return {number}
 */
const minPathSum = function (grid) {
    let dp = Array.from({length: grid.length}, () => (
        Array.from({length: grid[0].length}, () => (0)))
    );
    for (let i = grid.length - 1; i >= 0; i--) {
        for (let j = grid[0].length - 1; j >= 0; j--) {
            if (i === grid.length - 1 && j !== grid[0].length - 1) {
                dp[i][j] = grid[i][j] + dp[i][j + 1];
            } else if (j === grid[0].length - 1 && i !== grid.length - 1) {
                dp[i][j] = grid[i][j] + dp[i + 1][j];
            } else if (j !== grid[0].length - 1 && i !== grid.length - 1) {
                dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
            } else {
                dp[i][j] = grid[i][j];
            }
        }
    }
    return dp[0][0];
};

/**
 * 1200.最小绝对差（数组）
 * @param {number[]} arr
 * @return {number[][]}
 */
const minimumAbsDifference = function (arr) {
    // case01: [1,3,6,10,15]
    // case02: [3,8,-10,23,19,-4,-14,27]
    // case03: [4,2,1,3]
    arr.sort(function (a, b) {
        return a - b;
    });
    let ans = Math.pow(10, 6);
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        let j = i + 1;
        if (j !== arr.length) {
            let sub = Math.abs(arr[i] - arr[j]);
            if (sub === ans) {
                res.push([arr[i], arr[j]]);
            } else if (sub < ans) {
                res = [];
                res.push([arr[i], arr[j]]);
                ans = sub;
            }
        }
    }
    return res;
};

/**
 * 442.数组中重复的数据（数组）
 * @param {number[]} nums
 * @return {number[]}
 */
const findDuplicates = function (nums) {
    let res = [];
    for (let num of nums) {
        let idx = Math.abs(num) - 1;
        if (nums[idx] > 0) {
            nums[idx] *= -1;
        } else {
            res.push(Math.abs(num));
        }
    }
    return res;
};

/**
 * 985.查询后的偶数和（数组）
 * @param {number[]} A
 * @param {number[][]} queries
 * @return {number[]}
 */
const sumEvenAfterQueries = function (A, queries) {
    let [res, sum] = [[], eval(A.filter(a => (a & 1) === 0).join('+')) || 0];
    for (let i = 0; i < A.length && i < queries.length; i++) {
        let [val, index] = [queries[i][0], queries[i][1]];
        if ((A[index] & 1) === 0) {
            sum -= A[index];
        }
        A[index] += val;
        if ((A[index] & 1) === 0) {
            sum += A[index];
        }
        res.push(sum);
    }
    return res;
};

/**
 * 459.重复的子字符串（字符串）
 * @param {string} s
 * @return {boolean}
 */
const repeatedSubstringPattern = function (s) {
    let [len, i, t] = [s.length, 0, 0];
    for (t = 1; t <= parseInt(len / 2); ++t) {
        if (len % t > 0) continue;
        for (i = t; i < len && s.charAt(i % t) === s.charAt(i); ++i) {

        }
        if (i === len) return true;
    }
    return false;
};

/**
 * 189.旋转数组（数组/原地算法）
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = function (nums, k) {
    let [temp, prev] = [0, 0];
    for (let i = 0; i < k; i++) {
        prev = nums[nums.length - 1];
        for (let j = 0; j < nums.length; j++) {
            temp = nums[j];
            nums[j] = prev;
            prev = temp;
        }
    }
};

