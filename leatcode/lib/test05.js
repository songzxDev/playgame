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

/**
 * 287.寻找重复数【双指针】-（弗洛伊德的乌龟和兔子）
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate = function (nums) {
    // 数组是只读的，只能使用额外O(1)的空间，时间复杂度小于O(n^2)
    // 乌龟和兔子都要走到当前值的索引处
    let [tortoise, hare] = [nums[0], nums[0]];
    do {
        tortoise = nums[tortoise];
        hare = nums[nums[hare]];
    } while (tortoise !== hare);

    let [ptr1, ptr2] = [nums[0], tortoise];
    while (ptr1 !== ptr2) {
        ptr1 = nums[ptr1];
        ptr2 = nums[ptr2];
    }
    return ptr1;
};

/**
 * 521.最长特殊序列 I
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
const findLUSlength = function (a, b) {
    if (a === b) return -1;
    let [al, bl] = [a.length, b.length];
    return al > bl ? al : bl;
};

/**
 * LCP 1.猜数字
 * @param {number[]} guess
 * @param {number[]} answer
 * @return {number}
 */
const game = function (guess, answer) {
    let ans = 0;
    if (guess[0] === answer[0]) {
        ans += 1;
    }
    if (guess[1] === answer[1]) {
        ans += 1;
    }
    if (guess[2] === answer[2]) {
        ans += 1;
    }
    return ans;
};

/**
 * 75.颜色分类（双指针）
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function (nums) {
    let [p0, curr, p2] = [0, 0, nums.length - 1];
    while (curr <= p2) {
        if (nums[curr] === 0) {
            [nums[p0], nums[curr]] = [nums[curr], nums[p0]];
            p0 += 1;
            curr += 1;
        } else if (nums[curr] === 2) {
            [nums[curr], nums[p2]] = [nums[p2], nums[curr]];
            p2 -= 1;
        } else {
            curr += 1;
        }
    }
};

/**
 * 748.最短的完整词
 * @param {string} licensePlate
 * @param {string[]} words
 * @return {string}
 */
const shortestCompletingWord = function (licensePlate, words) {
    let lps = licensePlate.replace(/\s+/g, '').replace(/\d/g, '').split('');
    let lpMap = new Map();
    for (let ls of lps) {
        lpMap.set(ls.toLowerCase(), (lpMap.get(ls.toLowerCase()) || 0) + 1);
    }
    let res = Object.create(null);
    for (let word of words) {
        let tmp = new Map();
        for (let wd of word) {
            tmp.set(wd, (tmp.get(wd) || 0) + 1);
        }
        let sum = eval(Array.from(tmp.values()).join('+'));
        for (let key of lpMap.keys()) {
            if (tmp.has(key) && tmp.get(key) >= lpMap.get(key)) {
                res[word] = sum;
            } else {
                delete res[word];
                break;
            }
        }
    }
    if (Object.keys(res).length === 0) {
        return "";
    } else {
        let word = '';
        let num = 0;
        for (let key of Object.keys(res)) {
            if (num === 0) {
                num = res[key];
                word = key;
            } else {
                if (res[key] < num) {
                    num = res[key];
                    word = key;
                }
            }

        }
        return word;
    }
};

/**
 * 409.最长回文串
 * @param {string} s
 * @return {number}
 */
const longestPalindrome = function (s) {
    let [i, j] = [97, 65];
    let count = new Map(Array.from({length: 26}, () => ([String.fromCharCode(i++), 0])).concat(Array.from({length: 26}, () => ([String.fromCharCode(j++), 0]))));
    for (let c of s) {
        count.set(c, count.get(c) + 1);
    }
    let ans = 0;
    for (let v of count.values()) {
        ans += parseInt(v / 2, 10) * 2;
        if (v % 2 === 1 && ans % 2 === 0) {
            ans += 1;
        }
    }
    return ans;
};

/**
 * 599.两个列表的最小索引总和（哈希表）
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
const findRestaurant = function (list1, list2) {
    let [set1, set2] = [new Set(list1), new Set(list2)];
    let [res, tmpIdx] = [[], -1];
    set1.forEach(function (value) {
        if (set2.has(value)) {
            let currIdx = list1.indexOf(value) + list2.indexOf(value);
            if (tmpIdx === -1 || currIdx <= tmpIdx) {
                res.push(value);
                tmpIdx = currIdx;
            }

        }
    });
    return res;
};

/**
 * 299.猜数字游戏（哈希表）
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
const getHint = function (secret, guess) {
    let [A, B] = [0, 0];
    let [sObj, gObj] = [Object.create(null), Object.create(null)];
    let notIdx = new Set();
    for (let k = 0; k < secret.length; k++) {
        let [sct, ges] = [secret.charAt(k), guess.charAt(k)];
        if (sct !== ges) {
            sObj[sct] = (sObj[sct] || 0) + 1;
            gObj[ges] = (gObj[ges] || 0) + 1;
            notIdx.add(k);
        } else {
            A++;
        }
    }

    for (let i of notIdx) {
        let [s, g] = [secret.charAt(i), guess.charAt(i)];
        if (s in gObj && gObj[s] > 0) {
            gObj[s] -= 1;
            B += 1;
        }

    }
    return `${A}A${B}B`;
};

/**
 * 594.最长和谐子序列（哈希表）
 * @param {number[]} nums
 * @return {number}
 */
const findLHS = function (nums) {
    let [numObj, ans] = [Object.create(null), 0];
    for (let num of nums) {
        numObj[num] = (numObj[num] || 0) + 1;
        if (num - 1 in numObj) {
            ans = Math.max(ans, numObj[num] + numObj[num - 1]);
        }
        if (num + 1 in numObj) {
            ans = Math.max(ans, numObj[num] + numObj[num + 1]);
        }
    }
    return ans;
};

/**
 * 712.两个字符串的最小ASCII删除和【动态规划】
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
const minimumDeleteSum = function (s1, s2) {
    let dp = Array.from({length: s1.length + 1}, () => (Array.from({length: s2.length + 1}, () => (0))));
    for (let i = s1.length - 1; i >= 0; i--) {
        dp[i][s2.length] = dp[i + 1][s2.length] + s1.charCodeAt(i);
    }
    for (let j = s2.length - 1; j >= 0; j--) {
        dp[s1.length][j] = dp[s1.length][j + 1] + s2.charCodeAt(j);
    }

    for (let i = s1.length - 1; i >= 0; i--) {
        for (let j = s2.length - 1; j >= 0; j--) {
            if (s1.charAt(i) === s2.charAt(j)) {
                dp[i][j] = dp[i + 1][j + 1];
            } else {
                dp[i][j] = Math.min(dp[i + 1][j] + s1.charCodeAt(i), dp[i][j + 1] + s2.charCodeAt(j));
            }
        }
    }
    return dp[0][0];
};

/**
 * 647.回文子串（动态规划）
 * @param {string} s
 * @return {number}
 */
const countSubstrings = function (s) {

    let buildDPForCountSubstrings = (str) => {
        let n = str.length;
        let dp = Array.from({length: n}, () => (Array.from({length: n}, () => (false))));
        for (let j = 0; j < n; j++) {
            for (let i = 0; i <= j; i++) {
                if (i === j) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = str.charAt(i) === str.charAt(j) && (j - i <= 1 || dp[i + 1][j - 1]);
                }
            }
        }
        return dp;
    };
    if (s === null || s.length === 0) {
        return 0;
    }
    let res = 0;
    let dp = buildDPForCountSubstrings(s);
    for (let j = 0; j < dp.length; j++) {
        for (let i = 0; i <= j; i++) {
            if (dp[i][j]) res += 1;
        }
    }
    return res;
};

/**
 * 877.石子游戏（动态规划）
 * @param {number[]} piles
 * @return {boolean}
 */
const stoneGame = function (piles) {
    let n = piles.length;
    let dp = Array.from({length: n + 2}, () => (Array.from({length: n + 2}, () => (0))));
    for (let k = 1; k <= n; ++k) {
        for (let i = 0; i + k <= n; ++i) {
            let j = i + k - 1;
            let parity = parseInt((j + i + n) % 2, 10);
            if (parity === 1) {
                dp[i + 1][j + 1] = Math.max(piles[i] + dp[i + 2][j + 1], piles[j] + dp[i + 1][j]);
            } else {
                dp[i + 1][j + 1] = Math.min(-piles[i] + dp[i + 2][j + 1], -piles[j] + dp[i + 1][j]);
            }
        }
    }
    return dp[1][n] > 0;
};

/**
 * 931.下降路径最小和（动态规划）
 * @param {number[][]} A
 * @return {number}
 */
const minFallingPathSum = function (A) {
    /*动态规划思路
    dp[i][j]表示以A中第i行第j列位置为结束点时，对应的下降路径最小和：
    dp[i][j] = min{dp[i-1][j], dp[i-1][j+1]} + A[i][j], j = 0(前面第一列)
    dp[i][j] = min{dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1]} + A[i][j], 1 < j < A.length-1 (中间列)
    dp[i][j] = min{dp[i-1][j-1], dp[i-1][j]} + A[i][j], j = A.length-1(最后一列)
    返回dp中最后一行中最小值，即为下降路劲最小和。时间复杂度O(n^2)，空间复杂度O(n^2)*/
    let n = A.length;
    let dp = Array.from({length: n}, () => (Array.from({length: n}, () => (0))));
    for (let i = 0; i < n; i++) {
        dp[0][i] = A[0][i];
    }
    for (let i = 1; i < n; i++) {
        // 第一列计算
        dp[i][0] = Math.min(dp[i - 1][0], dp[i - 1][1]) + A[i][0];
        // 中间列计算
        for (let j = 1; j < n - 1; j++) {
            dp[i][j] = Math.min(Math.min(dp[i - 1][j - 1], dp[i - 1][j]), dp[i - 1][j + 1]) + A[i][j];
        }
        // 最后一列计算
        dp[i][n - 1] = Math.min(dp[i - 1][n - 2], dp[i - 1][n - 1]) + A[i][n - 1];
    }
    let res = Math.pow(2, 31);
    for (let j = 0; j < n; j++) {
        res = Math.min(res, dp[n - 1][j]);
    }
    return res;
};