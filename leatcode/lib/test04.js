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