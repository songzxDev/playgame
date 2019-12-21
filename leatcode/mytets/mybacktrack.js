// 感觉这种函数递归，执行优先级是 "尾递归" （最后那步程序）先执行，然后向上冒泡执行，不知道我理解对不对，欢迎大家有时间一起讨论

// 下面是一段简单的js程序，大概逻辑：输入一个数字，数字每次执行会递减，如果数字为0则递归结束
// 浏览器控制台可直接运行查看结果
const hit = (num) => {
    if (num <= 0) {
        return 0;
    }
    let cur = hit(num - 1);
    console.log(cur, num);
    return cur;
};
// hit(10);
// 直觉预期打印顺序是： 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
// ================================================
//    实际打印顺序是： 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

/**
 *
 * @param num
 * @returns {*}
 */
const subtract = (num) => {
    let [calling, execution] = [[], []];
    const helper = (num) => {
        if (num > 0) {
            let sub = num - 1;
            calling.push(`helper(num = ${sub})`);
            num = helper(sub);
            execution.push(`helper(num = ${sub})`);
        }
        return num;
    };
    helper(num);
    return {"calling": calling, "execution": execution};
};
// call function subtract
console.log(JSON.stringify(subtract(10), null, 4));