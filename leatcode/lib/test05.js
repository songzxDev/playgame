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