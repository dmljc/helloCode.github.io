# 基础阶段 

## 内置类型

JavaScript 是一种弱类型脚本语言，所谓弱类型指的是定义变量时，不需要什么类型，在程序运行过程中会自动判断类型。

JS 中分为七种内置类型，七种内置类型又分为两大类型：基本类型和引用类型。

基本类型有六种： `null` ， `undefined` ， `boolean` ， `number` ， `string` ， [symbol](http://es6.ruanyifeng.com/#docs/symbol) 。

引用类型包括： `Object` ， `Array` ， `Date` ， `function` ，对象在使用过程中会遇到浅拷贝和深拷贝的问题。
``` js
let a = {
    name: 'FE'
}
let b = a
b.name = 'EF'
console.log(a.name) // EF
```    
<h3>Typeof</h3>

`typeof` 对于基本类型，除了 `null` 都可以显示正确的类型

``` js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof b // b 没有声明，但是还会显示 undefined
```   
对于 `null` 来说，虽然它是基本类型，但是会显示 `object` ，这是一个存在很久了的 `Bug`

``` js
typeof null // 'object'
```
PS: 为什么会出现这种Bug呢？ 因为在 JS 的最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息， `000` 开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

`typeof` 对于对象，除了函数都会显示 `object` (这不是我们想看到的)

``` js
typeof [] // 'object'
typeof {} // 'object'
typeof new Date() // 'object'
typeof console.log // 'function'
```   
<h3>instanceof</h3>

`instanceof` 可以正确的判断对象（引用类型）的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

instanceof 实现原理：
``` js
function instanceof(left, right) {
    // 获得对象的原型
    left = left.__proto__;
    // 获得类型的原型
    let prototype = right.prototype;
    // 判断对象的类型是否等于类型的原型
    while (true) {
    	if (left === null) {
    		return false;  //已经找到顶层
        }
    	if (left === prototype) {
    		return true;   //当 left 严格等于 prototype 时，返回 true
        }
    	left = left.__proto__;  //继续向上一层原型链查找
    }
}
```

::: tip 如何获得一个变量的正确类型呢？
通过 `Object.prototype.toString.call(xx)` ，可以获得类似 `[object Type]` 的字符串。
:::

## 数组对象遍历

一、数组遍历

*   普通for循环，经常用的数组遍历（需要知道数组的长度）
``` js
var arr = [1, 2, 3];

for (var i = 0; i < arr.length; i++){
    console.log(arr[i]);  // 打印的是数组元素 1，2，3
}

// 优化版for循环：使用变量将长度缓存起来，避免重复获取长度
for(var i = 0,len = arr.length; i < len; i++){
    console.log(arr[i]);   // 打印的是数组元素 1，2，3
}
```   
* map （有返回值，返回值组成新数组，原数组不变）
  
``` js
let arr = [1, 2, 3];

let resArr = arr.map(el => el * 2);

console.log(resArr);   // 打印的是数组元素 1，2，3
```  
**map 的第二个参数 this 经常被人遗忘，这里需要着重强调下！！！**

>array.map(function(currentValue,index,arr), this);

第二个参数 this 是一个前面已经声明过的变量。如果你传入 this，那么这个 this 会往它所在的上一级作用域去找。如果可以找到对应的实例化对象，那么 this 就是这个实例化对象了，如果找不到，那 this 就指向了全局对象。

还是要举个栗子：
``` js
// 在实例化对象 a 中
const array = [1,2,3];
const a = {
    mapObject() {
        array.map(function(){}, this) // 这个时候的 this 是 a
    }
}

// 如果不是在一个实例化对象里面
array.map(function() {}, this) // this 是 window 或者 global
```

array.map(function() {}, this) 的作用实际上和 array.map(function() {}.bind(this)) 是一样的。
map 的第二个参数就是给第一个参数 bind 一个对象，这样在第一个参数里面就可以用 this 代替第二个参数。

* forEach (数组自带的循环，主要遍历数组，实际性能比for还弱，无返回值，第二个参数同上）

``` js
let arr = [1, 2, 3];

arr.forEach((el) => {
    console.log(el);    // 打印的是数组元素 1，2，3
});

// forEach 有一个小缺陷：不能使用break语句中断循环，也不能使用return语句返回到外层函数。
```   
 
* filter （过滤符合条件的元素组成一个新数组，原数组不变，有返回值，第二个参数同上）

``` js
let arr = [1, 2, 3];

let resArr = arr.filter(el => el > 1);

console.log(resArr);   // 打印的是数组元素 2，3
```   

* some （遍历数组中是否有符合条件的函数，返回布尔值，第二个参数同上）
``` js
let arr = [1, 2, 3];

let resArr = arr.some(el => el > 2);

console.log(resArr);   // true
```    
 
* every （遍历数组是否每个元素都符合条件，返回布尔值，第二个参数同上）

``` js
let arr = [1, 2, 3];

let resArr = arr.every(el => el > 2);

console.log(resArr);   // false
```    
 
* reduce （对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值）

``` js
// Number 类型累加 demo
let arr = [1, 2, 3];

let sum = arr.reduce((total, el) => {
    return total + el;
}, 10);  

// 参数 10 是累加的初始值。如果没有提供初始值，则将使用数组中的第一个元素。
// 在没有初始值的空数组上调用 reduce 将报错。

console.log(sum);  // 16

// String 类型累加 demo
let list = [
    {length: 1, width: 2, height: 3, count: 4}, 
    {length: 99, width: 99, height: 99, count: 99}
]

let str = list.reduce((total, item, index) => {
    return total += `${index === 0 ? '' : ','} ${item.length}cm * ${item.width}cm * ${item.height}cm * ${item.count}`
}, '');

console.log(str); // 1cm * 2cm * 3cm * 4件, 99cm * 99cm * 99cm * 99件
```   

* find （返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined，第二个参数同上）

``` js
let arr = [1, 2, 3];

let resArr = arr.find(el => el > 2);

console.log(resArr);  // 打印数组元素 3
```    

* findIndex （返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1，第二个参数同上）

``` js
let arr = [1, 2, 3];

let resArr = arr.findIndex(el => el > 2);

console.log(resArr);  // 打印第一个符合条件的元素的索引值 2
```    
 
注意：由于forEach、map都是ECMA5新增数组的方法，所以ie9以下的浏览器还不支持（万恶的IE啊）， 不过呢，可以从Array原型扩展可以实现以上全部功能，例如forEach方法:

``` js
if (typeof Array.prototype.forEach != "function") {

    Array.prototype.forEach = function() {

        /* 实现 */

    };
}
```

=========================================================================

> 说完了基础用法，让我们 🎉 欢迎今天的主角：for in 和 for of 闪亮登场

=========================================================================

## for in 和 for of

大家应该都知道 for in 循环是用于遍历对象的，但它可以用来遍历数组吗？答案是可以的，因为数组在某种意义上也是对象， 但是如果用其遍历数组会存在一些隐患：`其会遍历数组原型链上的属性`。

* for in 遍历对象场景：
  
``` js
let obj = {
    name: "zfc",
    age: 18
};

for (let key in obj) {
    console.log(key); // name age
    console.log(obj[key]); // zfc 18
}

// 但是如果在 Object 原型链上添加一个方法，会遍历到原型链上的方法
Object.prototype.test = function() {};

for (let key in obj) {
    console.log(key); // name age test
    console.log(obj[key]); // zfc 18 ƒ () {}
}

// hasOwnProperty方法可以判断某属性是否是该对象的实例属性
for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key); // name age
        console.log(obj[key]); // zfc 18
    }
}
```

* for in 遍历数组场景：
  
``` js
let arr = [1, 2];

for (let key in arr) {
    console.log(key); // 会打印数组的 下标 0, 1
    console.log(arr[key]); // 会打印数组的 元素 1, 2
}

// 但是如果在 Array 原型链上添加一个方法，
Array.prototype.test = function() {};

for (let key in arr) {
    console.log(arr[key]); // 此时会打印 1, 2, ƒ () {}
}
```   

因为我们不能保证项目代码中不会对数组原型链进行操作，也不能保证引入的第三方库不对其进行操作， 所以不要使用 for in 循环来遍历数组。

* for of 不能遍历对象，只能遍历数组（不包括数组原型链上的属性和方法）

``` js
let arr = [1, 2];

for (let value of arr) {
    console.log(value); // 会打印数组的 元素 1, 2
}
```   
 
因为能够被for...of正常遍历的，都需要实现一个遍历器Iterator。而数组、字符串、Set、Map结构，早就内置好了Iterator（迭代器），它们的原型中都有一个Symbol.iterator方法，而Object对象并没有实现这个接口，使得它无法被for...of遍历。

如何让对象可以被for of 遍历，当然是给它添加遍历器，代码如下：

``` js
Object.prototype[Symbol.iterator] = function() {
    let _this = this;
    let index = 0;
    let length = Object.keys(_this).length;
    return {
        next:() => {
            let value = _this[index];
            let done = (index >= length);
            index ++;
            return {value,done};
        }
    }
}
```   

::: warning 总结
整体来说直接用来遍历对象的目前只有 for in，其他的都是遍历数组用的。小伙伴们要记住哦！
:::

## 数组去重

1、双重 for 循环 (如果前一个值与后一个值相等，那么就去掉后一个值)

``` js
let arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0];

let test = (arr) => {
    for (let i = 0, len = arr.length; i < len; i++){
        for(let j = i + 1, len = arr.length; j < len; j++){
            if(arr[i] === arr[j]) arr.splice(j,1);      
        }
    }
    return arr;
}
test(arr);  // [1, "a", "b", "d", "e", 0]
```    

2、for...of + includes()

双重for循环的升级版，外层用 for...of 语句替换 for 循环，把内层循环改为 includes()

先创建一个空数组，当 includes() 返回 false 的时候，就将该元素 push 到空数组中

类似的，还可以用 indexOf() 来替代 includes()

``` js
let arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0];

let test = (arr) => {
    let result = [];
    for(let i of arr) {
        !result.includes(i) && result.push(i)
    };
    return result;
}

test(arr); // [1, "a", "b", "d", "e", 0]
```    

3、Array.filter() + indexOf

``` js
let arr = [1, 1, 2, 2, 2, 6];

let test = () => {
    return arr.filter((item, index, array) => array.indexOf(item) === index);
};

test(arr);  // [1, 2, 6]
```    

4、for...of + Object

首先创建一个空对象，然后用 for 循环遍历。利用对象的属性不会重复这一特性，校验数组元素是否重复。

``` js
let arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0];

let test = () => {
    let result = [];
    let obj = {};
    for (let i of arr) {
        if (!obj[i]) {
            result.push(i);
            obj[i] = 1;
        }
    };
    return result;
};

test(); // [1, "a", "b", "d", "e", 0]
```    

5、ES6 Set

``` js
let arr = [1, 'a', 'a', 'b', 'd', 'e', 'e', 1, 0];

let test = (arr) => Array.from(new Set(arr));

test(arr);  // [1, "a", "b", "d", "e", 0]
```    

## 原型和原型链

每个函数都有 `prototype` 属性，除了 `Function.prototype.bind()` ，该属性指向原型。

每个对象都有 `__proto__` 属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 `[[prototype]]` ，但是 `[[prototype]]` 是内部属性，我们并不能访问到，所以使用 `_proto_` 来访问。

对象可以通过 `__proto__` 来寻找不属于该对象的属性， `__proto__` 将对象连接起来组成了原型链。

如果你想更进一步的了解原型，可以仔细阅读 [深度解析原型中的各个难点](https://github.com/KieSun/Blog/issues/2) 。

## 类的创建和继承

<h3>类的创建</h3>

在 ES5 中，类的创建方式是创建 一个 function，在这个 function 的 prototype 里面增加属性和方法。

下面来创建一个Animal类：
``` js
// 定义一个动物类
function Animal (name) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function(){
        console.log(this.name + '正在睡觉！');
    }
}
// 原型方法
Animal.prototype.eat = function(food) {
    console.log(this.name + '正在吃：' + food);
};
```
这样就生成了一个Animal类，实力化生成对象后，有方法和属性。

<h3>原型链继承</h3>

``` js
// 定义父类
function Parent(name) {
    this.name = name;
}

Parent.prototype.getName = function() {
    return this.name;
};

// 定义子类
function Children() {
    this.age = 24;
}

// 通过Children的prototype属性和Parent进行关联继承

Children.prototype = new Parent('张先生');

// Children.prototype.constructor === Parent.prototype.constructor = Parent

const test = new Children();

// test.constructor === Children.prototype.constructor === Parent

test.age // 24
test.getName(); // 张先生
```

我们可以发现，整个继承过程，都是通过原型链之间的指向进行委托关联，直到最后形成了”由构造函数所构造“的结局。

<h3>构造函数继承</h3>

在 ES5 中，我们可以使用 构造函数实现继承，使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）。

``` js
// 定义父类
function Parent(value) {
    this.language = ['javascript', 'react', 'node.js'];
    this.value = value;
}

// 定义子类
function Children() {
    Parent.apply(this, arguments);
}

const test = new Children(666);

test.language // ['javascript', 'react', 'node.js']
test.value // 666
```   
构造继承关键在于，通过在子类的内部调用父类，即通过使用apply()或call()方法可以在将来新创建的对象上获取父类的成员和方法。

<h3>在 ES6 中，我们可以通过 class 和 extends 实现继承</h3>

``` js
// 定义父类
class Parent {
    constructor(name, age) {
        this.grandmather = 'rose';
        this.grandfather = 'jack';
    }
    show() {
        console.log(`我叫:${this.name}， 今年${this.age}岁`);
    }
};

// 通过extends关键字实现继承
class Children extends Parent {
    constructor(mather,father){
        //super 关键字，它在这里表示父类的构造函数，用来新建父类的 this 对象。
        super();
        this.mather = mather;
        this.father = father;
    }
};

const child = new Children('mama','baba');

console.log(child);
// father: "baba"
// grandfather: "jack"
// grandmather: "rose"
// mather: "mama"
```    
注意：子类必须在 constructor 方法中调用 super方法，否则新建实例时会报错。这是因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。

::: tip ES5 和 ES6 继承的区别
区别于 ES5 的继承，ES6 的继承实现在于使用 super 关键字调用父类。反观 ES5 是通过 call 或者 apply 回调方法调用父类。
:::

[参考文章](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20)

## call, apply, bind

首先说下前两者的区别：

`call` 和 `apply` 都是为了解决改变 `this` 的指向。作用都是相同的，只是传参的方式不同。

第一个参数都是 要绑定的this对象， `call` 可以接收一个参数列表， `apply` 只接受一个参数数组， `bind` 是创建一个新的函数，我们必须要手动去调用。

``` js
// call 实例
var a = {
    name: "Cherry",
    fn: function(a, b) {
        console.log(a + b)
    }
}

var b = a.fn;
b.call(a, 1, 2) // 3

// apply 实例 
var a = {
    name: "Cherry",
    fn: function(a, b) {
        console.log(a + b)
    }
}

var b = a.fn;
b.apply(a, [1, 2]) // 3复制代码

// bind 实例
var a = {
    name: "Cherry",
    fn: function(a, b) {
        console.log(a + b)
    }
}

var b = a.fn;
b.bind(a, 1, 2)() // 3

// 所以我们可以看出，bind 是创建一个新的函数，我们必须要手动去调用。
```    
 
## new 关键字

*   新生成了一个对象
*   链接到原型
*   绑定 this
*   返回新对象

在调用 `new` 的过程中会发生以上四件事情，我们也可以试着来自己实现一个 `new`

``` js
function create() {
    // 创建一个空的对象
    let obj = new Object();
    // 获得构造函数
    let Con = [].shift.call(arguments);
    // 链接到原型
    obj.__proto__ = Con.prototype;
    // 绑定 this，执行构造函数
    let result = Con.apply(obj, arguments);
    // 确保 new 出来的是个对象
    return typeof result === 'object' ? result : obj;
}
```

对于实例对象来说，都是通过 `new` 产生的，无论是 `function Foo()` 还是 `let a = { b : 1 }` 。

对于创建一个对象来说，更推荐使用字面量的方式创建对象（无论性能上还是可读性）。因为你使用 `new Object()` 的方式创建对象需要通过作用域链一层层找到 `Object` ，但是你使用字面量的方式就没这个问题。

## 执行上下文

当执行 JS 代码时，会产生三种执行上下文

*   全局执行上下文
*   函数执行上下文
*   eval 执行上下文（耗性能）

每个执行上下文中都有三个重要的属性

*   变量对象（VO），包含变量、函数声明和函数的形参，该属性只能在全局上下文中访问
*   作用域链（JS 采用词法作用域，也就是说变量的作用域是在定义时就决定了）
*   this 指向

``` js
console.log(a) // undefined
var a = 100

fn('zhangsan') // 'zhangsan' 20
function fn(name) {
    age = 20;
    console.log(name, age);
    var age;
}

console.log(b); // 这里报错
// Uncaught ReferenceError: b is not defined
b = 100...
```    

对于上述代码，执行栈中有两个上下文：全局上下文和函数 `fn` 上下文。

我们来看下上面的面试小题目，为什么a是undefined，而b却报错了，实际 JS 在代码执行之前，要「全文解析」，发现var a，知道有个a的变量，存入了执行上下文，而b没有找到var关键字，这时候没有在执行上下文提前「占位」，所以代码执行的时候，提前报到的a是有记录的，只不过值暂时还没有赋值，即为undefined，而b在执行上下文没有找到，自然会报错（没有找到b的引用）。

另外，一个函数在执行之前，也会创建一个 函数执行上下文 环境，跟 全局上下文 差不多，不过 函数执行上下文 中会多出this arguments和函数的参数。参数和arguments好理解，这里的this咱们需要专门讲解。

总结一下：

*   范围：一段 `<script>` 、js 文件或者一个函数
*   全局上下文：变量定义，函数声明
*   函数上下文：变量定义，函数声明，this，arguments

## this 和 箭头函数

非箭头函数中 `this` 指向调用函数的对象

``` js
function foo() {
    console.log(this.a);
}
var a = 1;
foo();

var obj = {
    a: 2,
    foo: foo
}
obj.foo();

// 以上两者情况 `this` 只依赖于调用函数前的对象，优先级是第二个情况大于第一个情况

// 以下情况是优先级最高的， `this` 只会绑定在 `c` 上，不会被任何方式修改 `this` 指向
var c = new foo();
c.a = 3;
console.log(c.a);

// 还有种就是利用 call，apply，bind 改变 this，这个优先级仅次于 new
```  
 
以上几种情况明白了，很多代码中的 `this` 应该就没什么问题了，下面让我们看看箭头函数中的 `this`

``` js
function a() {
    return () => {
        return () => {
            console.log(this);
        }
    }
}
console.log(a()()());
``` 

箭头函数其实是没有 `this` 的，这个函数中的 `this` 只取决于他外面的第一个不是箭头函数的函数的 `this` （定义时所在的对像）。在这个例子中，因为调用 `a` 符合前面代码中的第一个情况，所以 `this` 是 `window` 。并且 `this` 一旦绑定了上下文，就不会被任何代码改变。

箭头函数存在的意义：第一写起来更加简洁，第二可以解决 ES6 之前函数执行中this是全局变量的问题，看如下代码：

``` js
function fn() {
    console.log('real', this); // {a: 100} ，该作用域下的 this 的真实的值
    var arr = [1, 2, 3];
    // 普通 JS
    arr.map(function(item) {
        console.log('js', this); // window 。普通函数，这里打印出来的是全局变量，令人费解
        return item + 1;
    })
    // 箭头函数
    arr.map(item => {
        console.log('es6', this); // {a: 100} 。箭头函数，这里打印的就是父作用域的 this
        return item + 1;
    })
}
fn.call({a: 100})...
```   

接下来让我们看一个老生常谈的例子， `var`

``` js
b(); // call b
console.log(a); // undefined

var a = 'Hello world';

function b() {
    console.log('call b'); // undefined
}
```    

想必以上的输出大家肯定都已经明白了，这是因为函数和变量提升的原因。通常提升的解释是说将声明的代码移动到了顶部，这其实没有什么错误，便于大家理解。但是更准确的解释应该是：在生成执行上下文时，会有两个阶段。第一个阶段是创建的阶段（具体步骤是创建 VO），JS 解释器会找出需要提升的变量和函数，并且给他们提前在内存中开辟好空间，函数的话会将整个函数存入内存中，变量只声明并且赋值为 undefined，所以在第二个阶段，也就是代码执行阶段，我们可以直接提前使用。

在提升的过程中，相同的函数会覆盖上一个函数，并且函数优先于变量提升

``` js
b(); // call b second

function b() {
    console.log('call b fist');
}

function b() {
    console.log('call b second');
}
var b = 'Hello world';
```   

`var` 会产生很多错误，所以在 ES6中引入了 `let` 。 `let` 不能在声明前使用，但是这并不是常说的 `let` 不会提升， `let` 提升了声明但没有赋值，因为临时死区导致了并不能在声明前使用。

## 作用域和闭包

<h3>作用域</h3>

ES6 之前 JS 没有块级作用域。例如

``` js
if (true) {
    var name = 'zhangsan';
}
console.log(name);
```  

从上面的例子可以体会到作用域的概念，作用域就是一个独立的地盘，让变量不会外泄、暴露出去。上面的name就被暴露出去了，因此，JS 没有块级作用域，只有全局作用域和函数作用域。

``` js
var a = 100;

function fn() {
    var a = 200;
    console.log('fn', a);
}
console.log('global', a);
fn();
```    

全局作用域就是最外层的作用域，如果我们写了很多行 JS 代码，变量定义都没有用函数包括，那么它们就全部都在全局作用域中。这样的坏处就是很容易撞车、冲突。

``` js
// 张三写的代码中
var data = {
    a: 100;
}

// 李四写的代码中
var data = {
    x: true;
}
```   

这就是为何 jQuery、Zepto 等库的源码，所有的代码都会放在(function(){....})()中。因为放在里面的所有变量，都不会被外泄和暴露，不会污染到外面，不会对其他的库或者 JS 脚本造成影响。这是函数作用域的一个体现。

附：ES6 中开始加入了块级作用域，使用let定义变量即可，如下：...

``` js
if (true) {
    let name = 'zhangsan';
}
console.log(name); // 报错，因为let定义的name是在if这个块级作用域
```   
<h3>作用域链</h3>

首先认识一下什么叫做 自由变量 。如下代码中，console.log(a)要得到a变量，但是在当前的作用域中没有定义a（可对比一下b）。当前作用域没有定义的变量，这成为 自由变量 。自由变量如何得到 —— 向父级作用域寻找。

``` js
var a = 100;

function fn() {
    var b = 200;
    console.log(a);
    console.log(b);
}
fn();
```    

如果父级也没呢？再一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是 作用域链 。

``` js
var a = 100;

function F1() {
    var b = 200;

    function F2() {
        var c = 300;
        console.log(a);// 自由变量，顺作用域链向父作用域找
        console.log(b); // 自由变量，顺作用域链向父作用域找
        console.log(c); // 本作用域的变量
    }
    F2();
}
F1()...
```    
<h3>[闭包]</h3>

红宝书上对于闭包的定义：闭包是指有权访问另外一个函数作用域中的变量的函数。

我对闭包的理解是：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A 的变量，函数 B 就被称为闭包。

闭包的核心：内部函数访问的外部函数的变量, 可以保存在外部函数作用域内, 而不被浏览器的垃圾回收机制回收。从而让一个变量常驻内存，避免全局变量的污染。

使用场景：函数作为返回值、函数作为参数传递

闭包的优点：

* 可以让一个变量常驻内存 (如果用的多了就成了缺点)
* 避免全局变量的污染
* 私有化变量

闭包的缺点：

* 因为闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存

``` js
function A() {
    let a = 1;

    function B() {
        console.log(a);
    }
    return B;
}
```    

你是否会疑惑，为什么函数 A 已经弹出调用栈了，为什么函数 B 还能引用到函数 A 中的变量。因为函数 A 中的变量这时候是存储在堆上的。现在的 JS 引擎可以通过逃逸分析辨别出哪些变量需要存储在堆上，哪些需要存储在栈上。

经典面试题，循环中使用闭包解决 `var` 定义函数的问题

``` js
for (var i = 1; i <= 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000 * i);
}
```    

首先因为 `setTimeout` 是个异步函数，所有会先把循环全部执行完毕，这时候 `i` 就是 6 了，所以会输出一堆 6。

解决办法如下，第一种使用闭包 (匿名自执行函数)

``` js
for (var i = 1; i <= 5; i++) {
    ((i) => {
        setTimeout(() => {
            console.log(i);
        }, i * 1000);
    })(i);
}
```    

PS：我们创建了一个匿名的函数，并立即执行它，由于外部无法引用它内部的变量， 因此循环中的局部变量 `i` 和 `j` 在执行完后很快就会被释放，节省内存！关键是这种机制不会污染全局对象。

第二种就是使用 `setTimeout` 的第三个参数 （作为第一个function 的参数传进去）

``` js
for (var i = 1; i <= 5; i++) {
    setTimeout((i) => {
        console.log(i);
    }, i * 1000, i);
}
```    

第三种就是使用 `let` 定义 `i` 了 （块级作用域）

``` js
for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i);
    }, i * 1000);
}
```   

<h3>什么是内存泄漏</h3>

不再用到的内存，没有及时释放，就叫做内存泄漏。在 js 中，详细一点说就是指我们已经无法再通过js代码来引用到某个对象，但垃圾回收器却认为这个对象还在被引用，因此在回收的时候不会释放它。导致了分配的这块内存永远也无法被释放出来。如果这样的情况越来越多，会导致内存不够用而系统崩溃。

<h3>垃圾回收机制</h3>

js 引擎为了解决内存泄漏问题，才有了垃圾回收机制，能够让 js 自动的管理内存，将内存中不在使用的变量回收掉，然后释放出内存空间。

js 用了两种策略，一个是 **标记清除法**，另一种是 **引用计数法**，其实他两的实现原理都是 **判断当前的变量是否被引用**，如果没有被引用，就说明该变量应该被回收，怎么回收就是上边说得两种策略的事情了。

<h3>什么是引用？</h3>

所谓的引用就是 存储在堆内存中的对象你是直接不能访问的，而是通过栈内存中存储该对象的地址访问的，该地址就保持着对该对象的引用。

<h3>闭包真的会造成内存泄漏吗？</h3>

网上有很多的歧义，说闭包造成了内存的泄漏。其实内存泄漏并不是闭包造成的，**根本原因是：内部函数没有及时断开对变量的引用**！

PS：老的 IE 6 是无法处理循环引用的。因为老版本的 IE 是无法检测 DOM 节点与 JavaScript 代码之间的循环引用，会导致内存泄漏。
但是，现代的浏览器使用了更先进的垃圾回收算法（标记清除），已经可以正确检测和处理循环引用了。

<h3>常见的JS内存泄漏</h3>

<h3>1、全局变量</h3>

对未声明的变量的引用在全局对象里创建一个新的变量。在浏览器的情况下，这个全局对象是window。换句话说：
函数 foo 内部忘记使用 var ，实际上JS会把bar挂载到全局对象上，意外创建一个全局变量。
``` js
function foo(arg) {
    bar = "这是一个隐藏的全局变量";
}
```

``` js
function foo(arg) {
    window.bar = "这是一个显式的全局变量";
}
```
另一个意外的全局变量可能由 this 创建
``` js
function foo() {
    this.variable = "潜在的意外全局";
}

// Foo 调用自己，this 指向了全局对象（window）
// 而不是 undefined
foo();
```

**解决方法：**

在 JavaScript 文件头部加上 'use strict'，使用严格模式避免意外的全局变量，此时上例中的this指向undefined。
如果必须使用全局变量存储大量数据时，确保用完以后把它设置为 null 或者重新定义。

<h3>2、被遗忘的计时器或回调函数</h3>

``` js
var someResource = getData();
setInterval(function() {
    var node = document.getElementById('Node');
    if(node) {
        // 处理 node 和 someResource
        node.innerHTML = JSON.stringify(someResource));
    }
}, 1000);
```
上面的例子表明，在节点node或者数据不再需要时，定时器依旧指向这些数据。所以哪怕当node节点被移除后，interval 仍旧存活并且垃圾回收器没办法回收，它的依赖也没办法被回收，除非终止定时器。

``` js
var element = document.getElementById('button');
function onClick(event) {
    element.innerHTML = 'text';
}

element.addEventListener('click', onClick);
```

对于上面观察者的例子，一旦它们不再需要（或者关联的对象变成不可达），明确地移除它们非常重要。老的 IE 6 是无法处理循环引用的。因为老版本的 IE 是无法检测 DOM 节点与 JavaScript 代码之间的循环引用，会导致内存泄漏。

但是，现代的浏览器（包括 IE 和 Microsoft Edge）使用了更先进的垃圾回收算法（标记清除），已经可以正确检测和处理循环引用了。即回收节点内存时，不必非要调用 removeEventListener 了。

<h3>3、脱离 DOM 的引用</h3>

在你要重复的操作DOM节点的时候，存储DOM节点是十分有用的。但是在你需要移除DOM节点的时候，需要确保移除DOM tree和代码中储存的引用。

```js
var element = {
    image: document.getElementById('image'),
    button: document.getElementById('button')
};

//Do some stuff

document.body.removeChild(document.getElementById('image'));
//这个时候  虽然从dom tree中移除了id为image的节点，但是还保留了一个对该节点的引用。
// 于是image仍然不能被回收。
```
当涉及到DOM树内部或子节点时，需要考虑额外的考虑因素。例如，你在JavaScript中保持对某个表格的特定单元格的引用。有一天你决定从DOM中移除表格但是保留了对单元格的引用。你也许会认为除了单元格其他的都会被回收。实际并不是这样的：单元格是表格的一个子节点，子节点保持了对父节点的引用。确切的说，JS代码中对单元格的引用造成了整个表格被留在内存中了，所以在移除有被引用的节点时候要移除其子节点。

<h3>总结：</h3>

* 小心使用全局变量，尽量不要使用全局变量来存储大量数据，如果是暂时使用，要在使用完成之后手动指定为null或者重新分配
* 如果使用了定时器，在无用的时候要记得清除。如果为DOM节点绑定了事件监听器，在移除节点时要先注销事件监听器。
* 在移除DOM节点的时候要确保在代码中没有对节点的引用，这样才能完全的移除节点。在移除父节点之前要先移除子节点。

[闭包进阶](https://segmentfault.com/a/1190000002778015)

## 深浅拷贝

``` js
let a = {
    age: 1;
}
let b = a;
a.age = 2;
console.log(b.age); // 2
```  

从上述例子中我们可以发现，如果给一个变量赋值一个对象，那么两者的值会是同一个引用，其中一方改变，另一方也会相应改变。

通常在开发中我们不希望出现这样的问题，我们可以使用浅拷贝来解决这个问题。

<h3>浅拷贝</h3>

* 首先可以通过 js 循环遍历实现浅拷贝
``` js
// 思路：遍历对象，然后把属性和属性值都放在一个新的对象即可
var shallowCopy = function(obj) {
    // 临界点判空处理（只拷贝对象）
    if (typeof obj !== 'object') return;
    // 根据obj的类型判断是新建一个数组还是对象
    var newObj = obj instanceof Array ? [] : {};
    // 遍历obj，并且判断是obj的属性才拷贝
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
```   

* 然后，可以通过 `Object.assign` 来解决这个问题

``` js
let a = {
    age: 1;
}
let b = Object.assign({}, a);
a.age = 2;
console.log(b.age); // 1
```   

* 当然我们也可以通过展开运算符（…）来解决

``` js
let a = {
    age: 1;
}
let b = { ...a }
a.age = 2;
console.log(b.age); // 1
```   
 
通常浅拷贝就能解决大部分问题了，但是当我们遇到如下情况就需要使用到深拷贝了

``` js
let a = {
    age: 1,
    jobs: {
        first: 'FE'
    }
}
let b = { ...a }
a.jobs.first = 'native';
console.log(b.jobs.first); // native
```   

浅拷贝只解决了第一层的问题，如果接下去的值中还有对象的话，那么就又回到刚开始的话题了，两者享有相同的引用。要解决这个问题，我们需要引入深拷贝。

[MDN 关于 Object.assign 的详细解释](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<h3>深拷贝</h3>

* 首先也可以通过 js 循环遍历实现深拷贝
  
``` js
// 思路：拷贝的时候判断一下属性值的类型，如果是对象，递归调用深拷贝函数即可
var deepCopy = function(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}
// 尽管使用深拷贝会完全的克隆一个新对象，不会产生副作用，但是深拷贝因为使用递归，
// 性能会不如浅拷贝，在开发中，还是要根据实际情况进行选择。
```    

通常可以通过 `JSON.parse(JSON.stringify(object))` 来解决

``` js
let a = {
    age: 1,
    jobs: {
        first: 'FE'
    }
}
let b = JSON.parse(JSON.stringify(a));
a.jobs.first = 'native';
console.log(b.jobs.first); // FE
```  
 
但是该方法也是有局限性的：

* 会忽略 `undefined`
* 会忽略 `symbol`
* 不能序列化函数
* 不能解决循环引用的对象

``` js
let obj = {
    a: 1,
    b: {
        c: 2,
        d: 3,
    },
}
obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;
let newObj = JSON.parse(JSON.stringify(obj));
console.log(newObj);
```   

如果你有这么一个循环引用对象，你会发现你不能通过该方法深拷贝

在遇到函数、 `undefined` 或者 `symbol` 的时候，该对象也不能正常的序列化

``` js
let a = {
    age: undefined,
    sex: Symbol('male'),
    jobs: function() {},
    name: 'yck'
}
let b = JSON.parse(JSON.stringify(a));
console.log(b); // {name: "yck"}
```    

你会发现在上述情况中，该方法会忽略掉函数和 `undefined` 。

但是在通常情况下，复杂数据都是可以序列化的，所以这个函数可以解决大部分问题，并且该函数是内置函数中处理深拷贝性能最快的。当然如果你的数据中含有以上三种情况下，可以使用 [lodash 的深拷贝函数](https://lodash.com/docs#cloneDeep) 。

## 同步 vs 异步

先看下面的 demo，根据程序阅读起来表达的意思，应该是先打印100，1秒钟之后打印200，最后打印300。但是实际运行根本不是那么回事。

``` js
console.log(100);
setTimeout(function() {
    console.log(200);
}, 1000);
console.log(300);
```    

再对比以下程序。先打印100，再弹出200（等待用户确认），最后打印300。这个运行效果就符合预期要求。

``` js
console.log(100);
alert(200); // 1秒钟之后点击确认
console.log(300);
```  

这俩到底有何区别？—— 第一个示例中间的步骤根本没有阻塞接下来程序的运行，而第二个示例却阻塞了后面程序的运行。前面这种表现就叫做 异步（后面这个叫做 同步 ），即不会阻塞后面程序的运行。

<h3>异步和单线程</h3>

JS 需要异步的根本原因是 JS 是单线程运行的，即在同一时间只能做一件事，不能“一心二用”。

一个 Ajax 请求由于网络比较慢，请求需要 5 秒钟。如果是同步，这 5 秒钟页面就卡死在这里啥也干不了了。异步的话，就好很多了，5 秒等待就等待了，其他事情不耽误做，至于那 5 秒钟等待是网速太慢，不是因为 JS 的原因。

讲到单线程，我们再来看个真题：...

``` js
var a = true;
setTimeout(function() {
    a = false;
}, 100);
while (a) {
    console.log('while执行了');
}
```

这是一个很有迷惑性的题目，不少候选人认为100ms之后，由于a变成了false，所以while就中止了，实际不是这样，因为JS是单线程的，所以进入while循环之后，没有「时间」（线程）去跑定时器了，所以这个代码跑起来是个死循环！

前端异步的场景：

* 定时 setTimeout setInterval
* 网络请求，如 Ajax 加载

## 异步发展史

<h3>第 1 阶段：回调函数 </h3>

``` js
ajax('XXX1', () => {
    // callback 函数体
    ajax('XXX2', () => {
        // callback 函数体
        ajax('XXX3', () => {
            // callback 函数体
        })
    })
})
```
优点：解决了同步的问题。

缺点：回调地狱，不能用 try catch 捕获错误，不能 return;

<h3>第 2 阶段：Promise</h3>

Promise就是为了解决 callback 的问题而产生的。

Promise 实现了链式调用，也就是说每次 then 后返回的都是一个全新 Promise，如果我们在 then 中 return ，return 的结果会被 Promise.resolve() 包装。

``` js
ajax('XXX1')
    .then(res => {
        // 操作逻辑
        return ajax('XXX2')
    }).then(res => {
        // 操作逻辑
        return ajax('XXX3')
    }).then(res => {
        // 操作逻辑
    }).catch(err => {
        // 捕获异常信息
    });
```
优点：解决了回调地狱的问题。

缺点：无法取消 Promise ，错误需要通过回调函数来捕获。

<h3>第 3 阶段：Generator</h3>

特点：可以控制函数的执行，可以配合 co 函数库使用。

``` js
function *fetch() {
    yield ajax('XXX1', () => {})
    yield ajax('XXX2', () => {})
    yield ajax('XXX3', () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```
PS:虽然可以控制函数的执行但是不够优雅和简洁。

<h3>第 4 阶段：Async/await</h3>

``` js
async function test() {
    // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
    // 如果有依赖性的话，其实就是解决回调地狱的例子了
    await fetch('XXX1')
    await fetch('XXX2')
    await fetch('XXX3')
}
```
优点：异步的终极解决方案 代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题。

缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性使用 await 会导致性能的降低。

PS：其实 await 就是 generator 加上 Promise的语法糖，且内部实现了自动执行 generator。

## 定时器

一般情况下不建议使用 setInterval，而建议使用setTimeout，因为它可能会带来两个问题：

*   “丢帧”现象
*   不同定时器的代码的执行间隔比预期小

原因在于其本身的实现逻辑：很多人会认为 setInterval 中第二个时间参数的作用是经过该 毫秒数执行回调方法。其实不然，其真正的作用是经过该毫秒数将回调方法放置到 队列 中去， 但是如果队列中存在正在执行的方法，其会等待之前的方法完毕再执行， 如果存在还未执行的代码实例，其不会插入到队列中去，也就产生了 “丢帧”。

而 setTimeout 并不会出现这样的现象，因为每一次调用都会产生了一个新定时器， 同时在前一个定时器代码执行完之前，不会向队列插入新的定时器代码。
``` js
// 该定时器实际会在 3s 后立即触发下一次回调
setInterval(() => {
    // 执行完这里的代码需要 2s
}, 1000);

// 使用 setTimeout 改写，4秒后触发下一次回调
let doSometing = () => {
    // 执行完这里的代码需要 2s
    
    setTimeout(doSometing, 1000);
}

doSometing();
```   

延伸阅读：[对于“不用setInterval，用setTimeout”的理解](https://segmentfault.com/a/1190000011282175)

## 栈堆内存

JS的内存空间分为栈(stack)、堆(heap)、池(一般也会归类为栈中)。

其中栈存放变量，堆存放复杂对象，池存放常量，所以也叫常量池。

<h3>栈数据结构</h3>

栈是一种特殊的列表，栈内的元素只能通过列表的一端访问，这一端称为栈顶。 栈被称为是一种后入先出（LIFO，last-in-first-out）的数据结构。 由于栈具有后入先出的特点，所以任何不在栈顶的元素都无法访问。 为了得到栈底的元素，必须先拿掉上面的元素。

在这里，为方便理解，通过类比乒乓球盒子来分析栈的存取方式：

![img](https://t1.picb.cc/uploads/2019/09/09/gXSKoT.png)

这种乒乓球的存放方式与栈中存取数据的方式如出一辙。 处于盒子中最顶层的乒乓球 5，它一定是最后被放进去，但可以最先被使用。 而我们想要使用底层的乒乓球 1，就必须将上面的 4 个乒乓球取出来，让乒乓球1处于盒子顶层。 这就是栈空间先进后出，后进先出的特点。

<h3>堆数据结构</h3>

堆是一种经过排序的树形数据结构，每个结点都有一个值。 通常我们所说的堆的数据结构，是指二叉堆。 堆的特点是根结点的值最小（或最大），且根结点的两个子树也是一个堆。 由于堆的这个特性，常用来实现优先队列，堆的存取是随意，这就如同我们在图书馆的书架上取书， 虽然书的摆放是有顺序的，但是我们想取任意一本时不必像栈一样，先取出前面所有的书， 我们只需要关心书的名字。

<h3>变量类型与内存</h3>

基本数据类型保存在栈内存中，因为基本数据类型占用空间小、大小固定，通过按值来访问，属于被频繁使用的数据。

为了更好的搞懂基本数据类型变量与栈内存，我们结合以下例子与图解进行理解：

``` js
let num1 = 1;
let num2 = 1;
```

![gFl8QK.jpg](https://t1.picb.cc/uploads/2019/09/16/gFl8QK.jpg)

PS: 需要注意的是闭包中的基本数据类型变量不保存在栈内存中，而是保存在堆内存中。这个问题，我们后文再说。

Array,Function,Object...可以认为除了上文提到的基本数据类型以外，所有类型都是引用数据类型。

引用数据类型存储在堆内存中，因为引用数据类型占据空间大、大小不固定。 如果存储在栈中，将会影响程序运行的性能； 引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。 当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

为了更好的搞懂变量对象与堆内存，我们结合以下例子与图解进行理解：

``` js
// 基本数据类型-栈内存
let a1 = 0;
// 基本数据类型-栈内存
let a2 = 'this is string';
// 基本数据类型-栈内存
let a3 = null;

// 对象的指针存放在栈内存中，指针指向的对象存放在堆内存中
let b = { m: 20 };
// 数组的指针存放在栈内存中，指针指向的数组存放在堆内存中
let c = [1, 2, 3];
```   

![gFcIyM.jpg](https://t1.picb.cc/uploads/2019/09/16/gFcIyM.jpg)

因此当我们要访问堆内存中的引用数据类型时，实际上我们首先是从变量中获取了该对象的地址指针， 然后再从堆内存中取得我们需要的数据。

<h3>内存和变量复制</h3>

* 基本数据类型的复制
    
``` js
let a = 20;
let b = a;
b = 30;
console.log(a); // 此时a的值是多少，是30？还是20？
```

答案是：20

在这个例子中，a、b 都是基本类型，它们的值是存储在栈内存中的，a、b 分别有各自独立的栈空间， 所以修改了 b 的值以后，a 的值并不会发生变化。

从下图可以清晰的看到变量是如何复制并修改的：

![gFcimt.jpg](https://t1.picb.cc/uploads/2019/09/16/gFcimt.jpg)

* 引用数据类型的复制

``` js
let m = { a: 10, b: 20 };
let n = m;
n.a = 15;
console.log(m.a) //此时m.a的值是多少，是10？还是15？
``` 

答案是：15

在这个例子中，m、n都是引用类型，栈内存中存放地址指向堆内存中的对象， 引用类型的复制会为新的变量自动分配一个新的值保存在变量中， 但只是引用类型的一个地址指针而已，实际指向的是同一个对象， 所以修改 n.a 的值后，相应的 m.a 也就发生了改变。

从下图可以清晰的看到变量是如何复制并修改的：

![gFcnQF.jpg](https://t1.picb.cc/uploads/2019/09/16/gFcnQF.jpg)


<h3>栈和堆优缺点</h3>

在JS中，基本数据类型变量大小固定，并且操作简单容易，所以把它们放入栈中存储。 引用类型变量大小不固定，所以把它们分配给堆中，让他们申请空间的时候自己确定大小，这样把它们分开存储能够使得程序运行起来占用的内存最小。

栈内存由于它的特点，所以它的系统效率较高。 堆内存需要分配空间和地址，还要把地址存到栈中，所以效率低于栈。

<h3>栈和堆垃圾回收</h3>

栈内存中变量一般在它的当前执行环境结束就会被销毁被垃圾回收制回收， 而堆内存中的变量则不会，因为不确定其他的地方是不是还有一些对它的引用。 堆内存中的变量只有在所有对它的引用都结束的时候才会被回收。

<h3>闭包与堆内存</h3>

前面介绍闭包的时候已经提到过了本知识点，再梳理下吧：

闭包中的变量并不保存中栈内存中，而是保存在堆内存中。 这也就解释了函数调用之后之后为什么闭包还能引用到函数内的变量。

函数 A 弹出调用栈后，函数 A 中的变量这时候是存储在堆上的，所以函数B依旧能引用到函数A中的变量。 现在的 JS 引擎可以通过逃逸分析辨别出哪些变量需要存储在堆上，哪些需要存储在栈上。


