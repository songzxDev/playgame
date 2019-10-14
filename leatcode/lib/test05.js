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