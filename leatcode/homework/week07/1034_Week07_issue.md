## js 十进制转二进制   
js中int的整形范围是32位，-2^31 ~ 2^31-1（-0x80000000 ~ 0x7fffffff）之间，js自带的10进制转二进制的常用代码片段个人不太喜欢故写了一个自己能用于理解的   
```javascript
(1706).toString(2) // 输出："11010101010"
```

```javascript
let getNumBinaryArray = (num) => {
    let array32 = new Array(32).fill(0), last = 31;
    while (num > 0 && num < 0x80000000) {
        array32[last--] = num % 2;
        num = num >> 1;
    }
    return array32;
};
// 用来理解老师讲义中的： X = X & (X - 1) 清零最低位的 1 
for (let i = 0; i < 10; i++) {
    console.log(getNumBinaryArray(2 ** i).join(''));
    console.log(getNumBinaryArray((2 ** i) - 1).join(''));
    console.log('='.padEnd(34, '='));
}
```