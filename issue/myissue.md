## 观察五段js和python代码的写法
### 遍历一个数组并修改值
+ 示例1 数组：[1, 3, 4, 5, 6]，每个数组元素依次加1    
   
__javascript 示例代码__   
```javascript
let nums = [1, 3, 4, 5, 6];
nums = nums.map(num => {
    num += 1;
    return num;
});
```
__python 示例代码__   
```python
nums = [1, 2, 3, 4, 5, 6]
nums = map(lambda x: x + 1, nums)
``` 
可以看出遍历修改数组的值的写法，js和python使用了同名 __map()__ 函数，语法也很相似      
+ 示例2 找出数组中的所有偶数元素，[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]      
   
__javascript 示例代码__   
```javascript
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
nums = nums.filter(num => num % 2 === 0);
```
__python 示例代码__    
```python
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
nums = filter(lambda x: x % 2 == 0, nums)
```
可以看出遍历过滤数组中特定元素数组的值的写法，js和python使用了同名 __filter()__ 函数，语法也很相似  
+ 示例3 一行代码为多个元素初始化赋值  
         
__javascript 示例代码__    
```javascript
let [a, b, c, d, e, f] = [1, 2, 3, 4, 5, 6];
```
__python 示例代码__   
```python
a, b, c, d, e, f = 1, 2, 3, 4, 5, 6
```
可以看出二者多变量赋值写法很相像   
+ 示例4 数组转换成Set集合   
  
__javascript 示例代码__       
```javascript
let array = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
let mySet = new Set(array);
```
__python 示例代码__   
```python
array = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
myset = set(array)
```
+ 示例5 数字集合字典等类型 if else 逻辑判断写法   

__javascript 示例代码__   
```javascript
let [a, b] = [0, null];
if (a && b) { // 等价于 a > 0 && b !== null
    // todo
}
```
__python 示例代码__
```python
a, b = 0, None
if a and b:  # 等价于 a > 0 and b is not None
    # todo
```
可以看出二者简写方式用于分支判断的写法很相像（_从代码可读性角度建议写全_）   
### 蒙古大夫浅解
可以看出js和python都是弱类型语言，即是运行时才分配数据类型，而且写作风格比较类似，二者常用的函数部分函数名称和用法都比较类似，故在遇到问题时，可以尝试使用已知语言类型中的函数或语法去百度搜索类似语言中是否存在类似语法，即可开拓思路   

[javascript相对权威 wiki 地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

### 工作中解决实际问题示例
__背景：__ 某项目页面上需要提供 N 叉树的数据    
+ 已实现的javascript版本       
```javascript
let sources = [
    {deptname: '一级部门-1', deptlevel: 0, parentid: 0, detpid: 1},
    {deptname: '二级部门-1', deptlevel: 1, parentid: 1, detpid: 2},
    {deptname: '二级部门-2', deptlevel: 1, parentid: 1, detpid: 3},
];
function getTreeNodes(root, idKey, pidKey, sources) {
    const helper = (tree, children, idKey, pidKey, sources) => {
        if ((sources || []).length > 0 && tree) {
            children = sources.filter(need => need[pidKey] === tree[idKey]);
            for(let child of children) {
                helper(child, [], idKey, pidKey, sources);
            }
        }
        tree['children'] = children;
        return tree;
    };
    return helper(root, [], idKey, pidKey, sources);
}
console.log(getTreeNodes(sources[0], 'detpid', 'parentid', sources));
```
+ 仿照js版本实现的python版本       
```python
# -*- coding: utf-8 -*-#
import json

import itertools

def helper(tree, children, idname, pidname, sources):
    """
    将存在父子关系的一维数组 list[dict] 转成树状
    :param tree: 树状数据的根节点                                       :type tree: dict
    :param children: 存放当前节点的子节点list                            :type children: list
    :param idname: 一维数组中每个节点唯一标识，例如：'id'                   :type idname: str
    :param pidname: 一维数组中每个节点的父节点唯一标识，例如：'parentid'      :type pidname: str
    :param sources: 一维数组源数据
    :return: dict
    """
    if isinstance(sources, list) and len(sources) > 0 and tree and tree.get('mold', '') != 'pers':
        children = list(itertools.ifilter(lambda d: d[pidname] == tree[idname], sources))
        if len(children) > 0:
            for child in children:
                helper(child, [], idname, pidname, sources)
    tree['children'] = children if isinstance(children, list) else []
    return tree

if __name__ == '__main__':
    tests = [
        {'projectid': '1', 'parentid': '0', 'projectname': '测试父级项目节点-1'},
        {'projectid': '2', 'parentid': '1', 'projectname': '测试【A】级项目节点-1-1'},
        {'projectid': '3', 'parentid': '1', 'projectname': '测试【B】级项目节点-1-1'},
        {'projectid': '4', 'parentid': '2', 'projectname': '测试子级项目节点-A-1'},
        {'projectid': '5', 'parentid': '2', 'projectname': '测试子级项目节点-A-2'},
        {'projectid': '6', 'parentid': '3', 'projectname': '测试子级项目节点-B-1'},
        {'projectid': '7', 'parentid': '3', 'projectname': '测试子级项目节点-B-2'},
    ]
    with open('F:\\mytest\\test.json', 'w') as jsonfile:
        json.dump(helper(tests[0], [], 'projectid', 'parentid', tests), jsonfile, ensure_ascii=False)
```
### 尝试寻找相似性  
观察两段代码，可以发现除了在过滤子节点处python使用了高效遍历 [itertools wiki 链接](https://docs.python.org/2/library/itertools.html) 库中api之外，其他写法很相似   
********
经过测试，通过js版本改编的python版本可以高效的生成某项目将一维父子关系结构数组转换成所需的树状数据
********
### 个人领悟（旁门左道）
1. 人生苦短，我用python，学好python其实等于间接的掌握一门前端语言javascript   
> 能用 javascript 实现的最终都会用 javascript 方式实现  ——某算命先生         
2. 学好牛顿（_数学、物理_）定律对编程有帮助     
[雷神之锤游戏用于计算平方根分之一的逻辑](https://www.beyond3d.com/content/articles/8/)      
```C
float InvSqrt (float x){
    float xhalf = 0.5f*x;
    int i = *(int*)&x;
    i = 0x5f3759df - (i>>1);
    x = *(float*)&i;
    x = x*(1.5f - xhalf*x*x);
    return x;
}
```
经测试：牛顿迭代法效率高于js库函数内置计算方法（[测试地址](https://leetcode-cn.com/problems/sqrtx/submissions/)）    
__常规解法__ （_二分法_）         
```javascript
const mySqrt = function(x) {
    if (x > 1) {
        let [left, right] = [1, x >> 1];
        while (left < right) {
            let amid = (left + right + 1) >> 1;
            if (amid ** 2 <= x) {
                left = amid;
            } else {
                right = amid - 1;
            }
        }
        return left;
    }
    return x;
};
```

