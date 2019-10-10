/**
 * 509.斐波那契数列
 * @param {number} N
 * @return {number}
 */
const fib = function (N) {
    if (N < 1) return 0;

    let helper = (memo, n) => {
        if (n === 1 || n === 2) return 1;
        if (memo[n] !== 0) return memo[n];
        memo[n] = helper(memo, n - 1) + helper(memo, n - 2);
        return memo[n];
    };
    let memo = Array.from({length: N + 1}, () => (0));
    return helper(memo, N);
};

/**
 * 12.整数转罗马数字
 * @param {number} num
 * @return {string}
 */
const intToRoman = function (num) {
    let nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let romans = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    let [index, res] = [0, ''];
    while (index < 13) {
        while (num >= nums[index]) {
            res = res.concat(romans[index]);
            num -= nums[index];
        }
        index += 1;
    }
    return res;
};

/**
 * 811.子域名访问计数
 * @param {string[]} cpdomains
 * @return {string[]}
 */
const subdomainVisits = function (cpdomains) {
    let resMap = new Map();
    for (let domain of cpdomains) {
        let dn = domain.split(' ');
        let [count, domn] = [parseInt(dn[0], 10), dn[1].split('.')];
        while (domn.length > 0) {
            let ck = domn.join('.');
            resMap.set(ck, (resMap.get(ck) || 0) + count);
            domn.shift();
        }
    }
    let res = [];
    resMap.forEach(function (value, key) {
        res.push(value + ' ' + key);
    });
    return res;
};

/**
 * 890.查找和替换模式
 * @param {string[]} words
 * @param {string} pattern
 * @return {string[]}
 */
const findAndReplacePattern = function (words, pattern) {
    let res = [];
    let isMatch = (wds, ptns) => {
        let [map1, map2] = [new Map(), new Map()];
        for (let i = 0; i < wds.length; ++i) {
            let [w, p] = [wds.charAt(i), ptns.charAt(i)];
            if (!map1.has(w)) map1.set(w, p);
            if (!map2.has(p)) map2.set(p, w);
            if (map1.get(w) !== p || map2.get(p) !== w) {
                return false;
            }
        }
        return true;
    };
    for (let word of words) {
        if (isMatch(word, pattern)) {
            res.push(word);
        }
    }
    return res;
};

/**
 * 1160.拼写单词
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
const countCharacters = function (words, chars) {
    let charObj = Object.create(null);
    let res = 0;
    for (let char of chars) {
        charObj[char] = (charObj[char] || 0) + 1;
    }
    for (let word of words) {
        let wObj = Object.create(null);
        for (let wd of word) {
            wObj[wd] = (wObj[wd] || 0) + 1;
        }
        let isMath = true;
        for (let key of Object.keys(wObj)) {
            if (!(key in charObj) || charObj[key] < wObj[key]) {
                isMath = false;
                break;
            }
        }
        if (isMath) res += word.length;
    }
    return res;
};

/**
 * 78.子集
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
    let n = 1 << nums.length;
    let res = [];
    for (let i = 0; i < n; i++) {
        let cur = [];
        for (let j = 0; j < nums.length; j++) {
            if ((i >> j & 1) === 1) {
                cur.push(nums[j]);
            }
        }
        res.push(cur);
    }
    return res;
};

/**
 * 90.子集 II
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsetsWithDup = function (nums) {
    let n = 1 << nums.length;
    let tmpSet = new Set();
    for (let i = 0; i < n; i++) {
        let curr = [];
        for (let j = 0; j < nums.length; j++) {
            if (i >> j & 1) {
                curr.push(nums[j]);
            }
        }
        if (curr.length > 0) {
            curr.sort(function (a, b) {
                return a - b;
            });
            tmpSet.add(curr.join(','));
        }

    }
    let res = Array.from(tmpSet).map(item => item.split(',').map(tp => parseInt(tp, 10)));
    res.unshift([]);
    return res;
};

/**
 * 137.只出现一次的数字 II
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = function (nums) {
    let [one, two] = [0, 0];
    for (let i = 0; i < nums.length; i++) {
        two = two | (one & nums[i]);
        one = one ^ nums[i];
        let three = two & one;
        two = two ^ three;
        one = one ^ three;
    }
    return one | two;
};

/**
 * 693.交替位二进制数
 * @param {number} n
 * @return {boolean}
 */
const hasAlternatingBits = function (n) {
    let nBins = n.toString(2).replace(/-/g, '').split('').map(num => parseInt(num));
    let ans = nBins[0];
    for (let i = 1; i < nBins.length; i++) {
        ans = ans ^ nBins[i];
        if (ans === 0) {
            return false;
        } else {
            ans = nBins[i];
        }
    }
    return true;
};

/**
 * 191.位1的个数
 * @param {number} n - a positive integer
 * @return {number}
 */
const hammingWeight = function (n) {
    let [bits, mask] = [0, 1];
    for (let i = 0; i < 32; i++) {
        if ((n & mask) !== 0) {
            bits += 1;
        }
        mask <<= 1;
    }
    return bits;
};

/**
 * 371.两整数之和
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
const getSum = function (a, b) {
    while (b !== 0) {
        let res = (a & b) << 1;
        a = a ^ b;
        b = res;
    }
    return a;
};


/**
 * 190.颠倒二进制位
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
const reverseBits = function (n) {
    let tmp = n.toString(2).padStart(32, '0').split('').reverse().join('');
    return Number.parseInt(tmp, 2);
};

/**
 * 187.重复的DNA序列
 * @param {string} s
 * @return {string[]}
 */
const findRepeatedDnaSequences = function (s) {
    let [visited, res] = [new Set(), new Set()];
    for (let i = 0; i < s.length - 9; i++) {
        let tmp = s.substring(i, i + 10);
        if (visited.has(tmp)) {
            res.add(tmp);
        }
        visited.add(tmp);
    }
    return Array.from(res);
};

/**
 * 268.缺失数字
 * @param {number[]} nums
 * @return {number}
 */
const missingNumber = function (nums) {
    let ans = nums.length;
    for (let i = 0; i < nums.length; i++) {
        ans ^= i ^ nums[i];
    }
    return ans;
};

/**
 * 405.数字转换为十六进制数
 * @param {number} num
 * @return {string}
 */
const toHex = function (num) {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let res = '';
    while (num !== 0) {
        let end = num & 15;
        res = hex[end] + res;
        num >>>= 4;
    }
    if (res.length === 0) {
        res = hex[0];
    }
    return res;
};

/**
 * 832.翻转图像
 * @param {number[][]} A
 * @return {number[][]}
 */
const flipAndInvertImage = function (A) {
    for (let i = 0; i < A.length; i++) {
        let a = A[i];
        a.reverse();
        a = a.map(it => it ^ 1);
        A[i] = a;
    }
    return A;
};

/**
 * 1207.独一无二的出现次数
 * @param {number[]} arr
 * @return {boolean}
 */
const uniqueOccurrences = function (arr) {
    let uniqueMap = new Map();
    for (let num of arr) {
        uniqueMap.set(num, (uniqueMap.get(num) || 0) + 1);
    }
    return new Set(uniqueMap.values()).size === Array.from(uniqueMap.values()).length;
};

/**
 * 1002.查找常用字符
 * @param {string[]} A
 * @return {string[]}
 */
const commonChars = function (A) {

    let charSets = A.map(a => {
        let tmp = new Map();
        for (let w of a) {
            tmp.set(w, (tmp.get(w) || 0) + 1);
        }
        return tmp;
    });
    let intersect = new Set(charSets[0].keys());
    for (let i = 1; i < charSets.length; i++) {
        let tmp = new Set();
        new Set(charSets[i].keys()).forEach(function (value) {
            if (intersect.has(value)) {
                tmp.add(value);
            }
        });
        intersect = tmp;
    }
    let res = '';
    intersect.forEach(function (value) {
        let num = Math.min.apply(null, charSets.map(item => item.get(value)));
        res = res.concat(`${value}`.padStart(num, `${value}`));
    });
    return res.split('');
};

/**
 * 575.分糖果
 * @param {number[]} candies
 * @return {number}
 */
const distributeCandies = function (candies) {
    let mid = candies.length / 2;
    let tmp = new Set(candies);
    return tmp.size <= mid ? tmp.size : mid;
};

/**
 * 1189.【气球】的最大数量
 * @param {string} text
 * @return {number}
 */
const maxNumberOfBalloons = function (text) {
    // balloon
    let wdMap = new Map([['b', 0], ['a', 0], ['l', 0], ['o', 0], ['n', 0]]);
    for (let tx of text) {
        if (wdMap.has(tx)) {
            wdMap.set(tx, wdMap.get(tx) + 1);
        }
    }
    if (wdMap.get('l') < 2 || wdMap.get('o') < 2 || Array.from(wdMap.values()).includes(0)) {
        return 0;
    } else {
        return Number.parseInt(Math.min(wdMap.get('l'), wdMap.get('o')) / 2, 10);
    }
};

/**
 * 884.两句话中的不常见单词
 * @param {string} A
 * @param {string} B
 * @return {string[]}
 */
const uncommonFromSentences = function (A, B) {
    let merge = `${A} ${B}`.split(' ');
    let myMap = new Map();
    for (let wd of merge) {
        myMap.set(wd, (myMap.get(wd) || 0) + 1);
    }
    let res = [];
    myMap.forEach(function (value, key) {
        if (value === 1) {
            res.push(key)
        }
    });
    return res;
};