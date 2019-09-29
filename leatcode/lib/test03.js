/**
 * 784.字母大小写全排列
 * @param {string} S
 * @return {string[]}
 */
const letterCasePermutation = function (S) {
    if (S.length === 0) return [];
    let res = new Set();
    res.add(S);
    let execRes = (index) => {
        if (index === S.length) return;
        res.forEach(function (value) {
            let s = value.charAt(index);
            if (/[a-zA-Z]/g.test(s)) { // 字母
                res.add(value);
                let temp = value.split('');
                temp[index] = String.fromCharCode(s.charCodeAt(0) ^ (1 << 5));
                res.add(temp.join(''));
            } else { // 数字

            }
        });
        execRes(index + 1);
    };

    execRes(0);
    return Array.from(res);
};

/**
 * 1051. 高度检查器
 * @param {number[]} heights
 * @return {number}
 */
const heightChecker = function (heights) {
    // TODO: 通过对另一个数组进行排序来建立正确的高度顺序，然后比较两个数组
    let copy = Array.from(heights);
    copy.sort(function (a, b) {
        return a - b;
    });
    let res = 0;
    for (let i = 0; i < heights.length; i++) {
        if (heights[i] !== copy[i]) res += 1;
    }
    return res;
};

/**
 * 925.长按键入
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
const isLongPressedName = function (name, typed) {
    if (typed.length < name.length || name.charAt(0) !== typed.charAt(0)) return false;
    let j = 0;
    for (let c of name) {
        if (typed.charAt(j) !== c) {
            if (j === 0 || typed.charAt(j - 1) !== typed.charAt(j)) return false;
            let curr = `${typed.charAt(j)}`;
            while (j < typed.length && typed.charAt(j) === curr) j++;
            if (j === typed.length || typed.charAt(j) !== c) return false;
        }
        j++;
    }
    return true;
};

function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * 237.删除链表中的节点
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
const deleteNode = function (node) {
    Object.assign(node, node.next);
};

/**
 * 905.按奇数偶数排序数组
 * @param {number[]} A
 * @return {number[]}
 */
const sortArrayByParity = function (A) {
    if (A.length <= 1) return A;
    let [i, j] = [0, A.length - 1];
    while (i < j) {
        if (A[i] % 2 > A[j] % 2) {
            [A[i], A[j],] = [A[j], A[i],];
        }
        if (A[i] % 2 === 0) {
            i++;
        }
        if (A[j] % 2 === 1) {
            j--;
        }
    }
    return A;
};

/**
 * 22.括号生成
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function (n) {
    let backtrack = (ans, cur, open, close, max) => {
        if (cur.length === max * 2) {
            ans.push(cur);
            return;
        }
        if (open < max) {
            backtrack(ans, cur.concat('('), open + 1, close, max);
        }
        if (close < open) {
            backtrack(ans, cur.concat(')'), open, close + 1, max);
        }
    };
    let ans = [];
    backtrack(ans, "", 0, 0, n);
    return ans;
};

/**
 * 1108.IP 地址无效化
 * @param {string} address
 * @return {string}
 */
const defangIPaddr = function (address) {
    return address.split('.').join('[.]');
};

/**
 * 461.汉明距离
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const hammingDistance = function (x, y) {
    // 将两个给定的数进行 异或(^)运算后保存在变量a，汉明距离就是a的二进制中1的个数
    let a = x ^ y;
    return a.toString(2).replace(/0/g, '').length;
};

/**
 * 476.数字的补数
 * @param {number} num
 * @return {number}
 */
const findComplement = function (num) {
    let i = 1;
    let numTemp = num;
    while (num !== 1) {
        num = (num / 2) | 0;
        i++;
    }
    let temp = Math.pow(2, i) - 1;
    return numTemp ^ temp;
};

/**
 * 15.三数之和
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
    nums.sort(function (a, b) {
        return a - b;
    });
    let res = [];
    for (let k = 0; k < nums.length - 2; k++) {
        if (nums[k] > 0) break;
        if (k > 0 && nums[k] === nums[k - 1]) continue;
        let [i, j] = [k + 1, nums.length - 1];
        while (i < j) {
            let s = nums[k] + nums[i] + nums[j];
            if (s < 0) {
                i += 1;
                while (i < j && nums[i] === nums[i - 1]) i += 1;
            } else if (s > 0) {
                j -= 1;
                while (i < j && nums[j] === nums[j + 1]) j -= 1;
            } else {
                res.push([nums[k], nums[i], nums[j]]);
                i += 1;
                j -= 1;
                while (i < j && nums[i] === nums[i - 1]) i += 1;
                while (i < j && nums[j] === nums[j + 1]) j -= 1;
            }
        }
    }
    return res;
};

/**
 * 561.数组拆分 I
 * @param {number[]} nums
 * @return {number}
 */
const arrayPairSum = function (nums) {
    nums.sort(function (a, b) {
        return a - b;
    });
    let sum = 0;
    for (let i = 0; i < nums.length; i += 2) {
        sum += nums[i];
    }
    return sum;
};

/**
 * 804.唯一摩尔斯密码词
 * @param {string[]} words
 * @return {number}
 */
const uniqueMorseRepresentations = function (words) {
    const MOORE = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."];
    let res = new Set();
    for (let word of words) {
        let temp = '';
        for (let s of word) {
            temp = temp.concat(MOORE[s.charCodeAt(0) - 'a'.charCodeAt(0)]);
        }
        if (!res.has(temp)) res.add(temp);
    }
    return res.size;
};

/**
 * 762. 二进制表示中质数个计算置位
 * @param {number} L
 * @param {number} R
 * @return {number}
 */
const countPrimeSetBits = function (L, R) {
    let isPrimeNumber = (num) => {
        if (num === 2) return true;
        if (num < 2 || num % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    };

    let res = 0;
    for (let i = L; i <= R; i++) {
        let bitStr = i.toString(2).replace(/0/g, '');
        if (isPrimeNumber(bitStr.length)) {
            res += 1;
        }
    }
    return res;
};

/**
 * 657.机器人能否返回原点
 * @param {string} moves
 * @return {boolean}
 */
const judgeCircle = function (moves) {
    let operation = Object.create(null);
    [operation['U'], operation['D'], operation['L'], operation['R']] = [0, 0, 0, 0];
    for (let move of moves) {
        operation[move] = (operation[move] || 0) + 1;
    }
    return operation['U'] === operation['D'] && operation['L'] === operation['R'];
};


/**
 * 557. 反转字符串中的单词 III
 * @param {string} s
 * @return {string}
 */
const reverseWords = function (s) {
    if (s.length === 0) return s;
    let ss = s.split(' ');
    for (let i = 0; i < ss.length; i++) {
        let sts = ss[i].split('');
        let res = [];
        while (sts.length > 0) res.push(sts.pop());
        ss[i] = res.join('');
    }
    return ss.join(' ');
};


/**
 * 541. 反转字符串 II
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const reverseStr = function (s, k) {
    let kk = k * 2;
    let subs = [];
    for (let i = 0; i < s.length; i += kk) {
        let sub = s.substr(i, kk).split('');
        if (sub.length === kk || (sub.length >= k && sub.length < kk)) {
            // 对从字符串开头算起的每个 2k 个字符的前k个字符进行反转
            // 如果有小于 2k 但大于或等于 k 个字符，则反转前 k 个字符，并将剩余的字符保持原样
            subs.push(sub.slice(0, k).reverse().concat(sub.slice(k)).join(''));
        } else if (sub.length < k) {
            // 剩余少于 k 个字符，则将剩余的所有全部反转
            subs.push(sub.reverse().join(''));
        }
    }
    return subs.join('');
};


/**
 * 1021. 删除最外层的括号
 * @param {string} S
 * @return {string}
 */
const removeOuterParentheses = function (S) {
    let stack = [];
    let res = '';
    let j = 0;
    for (let i = 0; i < S.length; i++) {
        let s = S.charAt(i);
        if (s === '(') {
            stack.push(s);
        }
        if (s === ')') {
            stack.pop();
            if (stack.length === 0) {
                res = res.concat(S.substring(j + 1, i));
                j = i + 1;
            }
        }
    }
    return res;
};


/**
 * 338. 比特位计数
 * @param {number} num
 * @return {number[]}
 */
const countBits = function (num) {
    /*
    奇数：二进制，奇数一定比前一个偶数多1，因为多的就是最低位的1
    偶数：二进制，1的个数一定和除以2后的那个数一样多，因为最低位是0，除以2就是右移一位，把0抹掉，1个个数不变
    0的二进制1的个数为0
     */
    let res = [0];
    for (let i = 1; i <= num; i++) {
        if (i % 2 === 1) {
            res[i] = res[i - 1] + 1;
        } else {
            res[i] = res[i / 2];
        }
    }
    return res;
};


/**
 * 950. 按递增顺序显示卡牌
 * @param {number[]} deck
 * @return {number[]}
 */
const deckRevealedIncreasing = function (deck) {
    deck.sort(function (a, b) {
        return b - a;
    });
    let res = [];
    for (let i = 0; i < deck.length; i++) {
        let d = deck[i];
        res.push(d);
        if (i < deck.length - 1) {
            res.push(res.shift());
        }
    }
    return res.reverse();
};

/**
 * 977. 有序数组的平方
 * @param {number[]} A
 * @return {number[]}
 */
const sortedSquares = function (A) {
    let n = A.length;
    let j = 0;
    while (j < n && A[j] < 0) {
        j++;
    }
    let i = j - 1;
    let ans = [];
    let t = 0;
    while (i >= 0 && j < n) {
        if (A[i] * A[i] < A[j] * A[j]) {
            ans[t++] = A[i] * A[i];
            i--;
        } else {
            ans[t++] = A[j] * A[j];
            j++;
        }
    }
    while (i >= 0) {
        ans[t++] = A[i] * A[i];
        i--;
    }

    while (j < n) {
        ans[t++] = A[j] * A[j];
        j++;
    }

    return ans;
};