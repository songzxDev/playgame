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
        let mid = (left + right) >> 1;
        this.mergeSort(array, left, mid);
        this.mergeSort(array, mid + 1, right);
        this.merge(array, left, mid, right);
    }

    static merge(array, left, mid, right) {
        let i = left, j = mid + 1, k = 0, tmp = [];
        while (i <= mid && j <= right) {
            tmp.push(array[i] < array[j] ? array[i++] : array[j++]);
        }
        while (i <= mid) tmp.push(array[i++]);
        while (j <= right) tmp.push(array[j++]);
        for (let p = 0; p < tmp.length; p++) array[left + p] = tmp[p];
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
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
    if (!s || !t || s.length < t.length) return "";
    let i = 0, j = 0, start = 0, found = 0, minLen = 0x7fffffff, winds = [], tMap = [], sLen = s.length,
        tLen = t.length;
    for (let i = 0; i < 256; i++) winds.push(tMap.push(0) & 0);
    for (let i = 0; i < tLen; i++) tMap[t.charCodeAt(i)]++;
    while (j < sLen) {
        if (found < tLen) {
            let before = s.charCodeAt(j++);
            if (tMap[before] > 0) if (++winds[before] <= tMap[before]) found++;
        }
        while (found === tLen) {
            if (j - i < minLen) [start, minLen] = [i, j - i];
            let after = s.charCodeAt(i++);
            if (tMap[after] > 0) if (--winds[after] < tMap[after]) found--;
        }
    }
    return minLen === 0x7fffffff ? "" : s.substr(start, minLen);
};
//leetcode submit region end(Prohibit modification and deletion)
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
        return numKey
    }
    for (const stt of strs) {
        const numKey = getNumKey(stt);
        groupMap.has(numKey) ? groupMap.get(numKey).push(stt) : groupMap.set(numKey, [stt]);
    }
    return [...groupMap.values()];
};
//leetcode submit region end(Prohibit modification and deletion)
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
    if (!nums || nums.length < 3) return [];
    nums.sort((a, b) => a - b);
    const isRun = nums[0] <= 0, n = nums.length, res = [];
    for (let i = 0; isRun && i < n - 2; i++) {
        if (i === 0 || nums[i - 1] < nums[i]) {
            let j = i + 1, k = n - 1;
            while (j < k) {
                let add = nums[i] + nums[j] + nums[k];
                if (add === 0) {
                    res.push([nums[i], nums[j], nums[k]]);
                    while (j < k && nums[j] === nums[++j]) {}
                    while (j < k && nums[k] === nums[--k]) {}
                } else if (add < 0) {
                    j++
                } else {
                    k--
                }
            }
        }
    }
    return res;
};
//leetcode submit region end(Prohibit modification and deletion)
