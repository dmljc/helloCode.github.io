# 面试题集锦

PS：受 木易阳 大佬每日一题的影响，特整理此模块，旨在通过各大厂的面试题来查漏补缺，完善技能。如有侵权请联系删除。

## const 和 对象

> const 能否定义对象，定义的对象属性是否可以改变？？

众所周知 const 是用来定义常量的，而且定义的时候必须初始化，且定义后不可以修改。对于基本类型的数据来说，自然很好理解了，
例如 const PI = 3.14。如果定义的时候不初始化值的话就会报错。错误信息如下图：

``` js
const PI;

// VM377:1 Uncaught SyntaxError: Missing initializer in const declaration
```
如果我们修改 const 定义的常量也是会出现错误的，提示的错误如下图：
``` js
const PI = 3.14;

PI = 3;

// VM453:1 Uncaught TypeError: Assignment to constant variable.
```
可见，const 定义的基本数据类型的变量确实不能修改，那引用数据类型呢？
``` js
const obj = { name: '孙悟空', age: 500 };

obj.name = '猪八戒';    // "猪八戒"

console.log(obj);   // {name: "猪八戒", age: 500}
```
**obj 对象的 name 属性确实被修改了，怎么理解这个现象呢？**

因为对象是引用类型，obj 中保存的仅是对象的指针。这就意味着，const 仅保证指针不发生改变，修改对象的属性不会改变对象的指针，所以是可以修改 obj 属性的。

我们试着修改一下指针，让 obj 指向一个新对象
``` js
...

obj = { name: '白骨精', age: 18 }

// VM853:1 Uncaught TypeError: Assignment to constant variable.
```
::: tip
所以 const 定义的引用类型只要指针不发生改变，不论如何改变都是允许的。
:::

## 算法手写题

> const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

已知上述数组arr，编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组。

``` js
// 思路整理：数组扁平化 => 数组去重 => 排序

let flat = arr.flat(Infinity);
// [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]

let set = new Set(flat);
// {1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 10}

let from = Array.from(set);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 10]

let sort = from.sort((a, b) => a - b);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

// 整理成一行代码就是
Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b});
```

## 整理中...



<!-- 
## ['1','2','3'].map(parseInt)

**你可能会认为答案是：[1, 2, 3]，非也。正确答案是：[1, NaN, NaN]**

Map 有三个参数，分别是当前索引元素，索引，原数组

![gBftwj.jpg](https://t1.picb.cc/uploads/2019/09/11/gBftwj.jpg)

<h3>原因</h3>

**其实就是 map 的 callback的第二个参数 index 被当做parseInt 的第二个参数radix 来使用了**

仔细想一下，我们原本以为我们的的三次调用是这样的

``` js
parseInt('1')
parseInt('2')
parseInt('3')
```

实际上是这样被调用的

``` js
parseInt('1',0,theArray);
parseInt('2',1,theArray);
parseInt('3',2,theArray);
```

**那么重点来了，index 是如何影响 radix的呢？**

第一次，当我我们第一次调用的时候 是这样的：parseInt('1',0) 这个是没问题的 转十进制的 看我红框的图片 返回 1。

第二次，调用第二个index参数是1,也是说1作为数值的基础。规范里说的很清楚了，如果基础是非0或者小于2，函数都不会查询字符串直接返回NaN。

第三次，2作为基数。这就意味着字符串将被解析成字节数，也就是仅仅包含数值0和1。parseInt的规范第十一步指出，它仅尝试分析第一个字符的左侧，这个字符还不是要求基数的有效数字。这个字符串的第一个字符是“3”，它并不是基础基数2的一个有效数字。所以这个子字符串将被解析为空。第十二步说了：如果子字符串被解析成空了，函数将返回为NaN。

所以这里的结果就应该是[1,NaN,NaN]。

这里问题所在就是容易忽视 parseInt 是需要两个参数的。map中有三个参数。所以这里结合起来，就导致了上面问题。

解决方案如下：

``` js
['1','2','3'].map(val => parseInt(val));
```

当然，我们也可以写：

``` js
['1','2','3'].map(Number);
``` -->
