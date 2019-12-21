# 递归之浅解
## 观察一段简单的递归代码
### 函数定义
[覃超老师提供的递归代码模版](https://shimo.im/docs/DjqqGCT3xqDYwPyY/read)   
__subtract()__ 函数伪代码含义：输入一个大于0的正整数，该整数递减后如果仍大于0，则继续递归调用，直到该整数值为0停止
```javascript
/**
 *
 * @param num
 * @returns {object}
 */
const subtract = (num) => {
    let [calling, execution] = [[], []];
    const helper = (num) => {
        if (num > 0) { // recursion terminator
            let sub = num - 1; // process logic in current level
            // 递归调用语句前的语句
            calling.push(`helper(num = ${sub})`);
            num = helper(sub); // drill down 
            // 递归调用语句后的语句
            execution.push(`helper(num = ${sub})`);
        }
        return num; // // process result
    };
    helper(num);
    return {"calling": calling, "execution": execution};
};
// call function subtract
console.log(JSON.stringify(subtract(10), null, 4));
```
### 返回值变量含义
|变量名称|含义|
|:---|:---|
|calling|递归调用语句前的语句的顺序集合|
|execution|递归调用语句后的语句的顺序集合|
```json
{
    "calling": [
        "helper(num = 9)",
        "helper(num = 8)",
        "helper(num = 7)",
        "helper(num = 6)",
        "helper(num = 5)",
        "helper(num = 4)",
        "helper(num = 3)",
        "helper(num = 2)",
        "helper(num = 1)",
        "helper(num = 0)"
    ],
    "execution": [ 
        "helper(num = 0)",
        "helper(num = 1)",
        "helper(num = 2)",
        "helper(num = 3)",
        "helper(num = 4)",
        "helper(num = 5)",
        "helper(num = 6)",
        "helper(num = 7)",
        "helper(num = 8)",
        "helper(num = 9)"
    ]
}
```
### 对比这两个顺序数组尝试找寻规律
1. 位于递归调用语句前的语句的执行顺序和各个被调用函数的顺序相同，位于递归调用语句后的语句的执行顺序和各个被调用函数的顺序相反
2. 每一次函数调用都会有一次返回．当程序流执行到某一级递归的结尾处时，它会转移到前一级递归继续执行
3. 递归函数中必须包含可以终止递归调用的语句来避免死循环
4. 对比观察后得出 calling 中越靠后的语句在 execution 中越靠前，这有点类似一种数据结构：__栈__
    + 可以尝试将递归调用理解为：入栈和出栈操作，函数按照调用顺序依次入栈，入栈操作结束后(*递归终止*)，开始进行关键逻辑调用就是出栈操作，出栈顺序：先入后出
