class SortArrayUtil {
    static quickSort(array, begin, end) {
        if (begin >= end) return;
        let pivot = this.partition(array, begin, end);
        this.quickSort(array, begin, pivot - 1);
        this.quickSort(array, pivot + 1, end);
    }

    static partition(array, begin, end) {
        let [counter, pivot] = [begin, end];
        for (let i = begin; i < end; i++) {
            if (array[i] < array[pivot]) {
                [array[i], array[counter]] = [array[counter], array[i]];
                counter++;
            }
        }
        [array[counter], array[pivot]] = [array[pivot], array[counter]];
        return counter;
    }

    static mergeSort(array, left, right) {
        if (left >= right) return;
        const mid = (left + right) >> 1;
        this.mergeSort(array, left, mid);
        this.mergeSort(array, mid + 1, right);
        this.merge(array, left, mid, right);
    }

    static merge(array, left, mid, right) {
        const temp = new Array(right - left + 1).fill(0);
        let i = left, j = mid + 1, k = 0;
        while (i <= mid && j <= right) {
            temp[k++] = array[i] <= array[j] ? array[i++] : array[j++];
        }
        while (i <= mid) temp[k++] = array[i++];
        while (j <= right) temp[k++] = array[j++];
        for (let p = 0; p < temp.length; p++) array[left + p] = temp[p];
    }
}

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const sortArray = function (nums) {
    if (nums && nums.length > 1) SortArrayUtil.mergeSort(nums, 0, nums.length - 1);
    return nums;
};
//leetcode submit region end(Prohibit modification and deletion)
