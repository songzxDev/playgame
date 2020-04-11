//给你一个整数数组 nums，请你将该数组升序排列。 
//
// 
//
// 
// 
//
// 示例 1： 
//
// 输入：nums = [5,2,3,1]
//输出：[1,2,3,5]
// 
//
// 示例 2： 
//
// 输入：nums = [5,1,1,2,0,0]
//输出：[0,0,1,1,2,5]
// 
//
// 
//
// 提示： 
//
// 
// 1 <= nums.length <= 50000 
// -50000 <= nums[i] <= 50000 
// 
//
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray = (nums) => {
    if (!nums || nums.length < 2) return nums;
    const merge = (array, left, mid, right) => {
        let tmp = new Array(right - left + 1).fill(0);
        let i = left, j = mid + 1, k = 0;
        while (i <= mid && j <= right) tmp[k++] = array[i] < array[j] ? array[i++] : array[j++];
        while (i <= mid) tmp[k++] = array[i++];
        while (j <= right) tmp[k++] = array[j++];
        for (let p = 0; p < tmp.length; p++) array[left + p] = tmp[p];
    }, mergeSort = (array, left, right) => {
        if (right <= left) return;
        const mid = (left + right) >> 1;
        mergeSort(array, left, mid);
        mergeSort(array, mid + 1, right);
        merge(array, left, mid, right);
    };
    mergeSort(nums, 0, nums.length - 1);
    return nums;
};
//leetcode submit region end(Prohibit modification and deletion)
console.log(sortArray([-87, 0, -99, 100, 9, 7, 6, -9087, 35, 4, 32]));