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