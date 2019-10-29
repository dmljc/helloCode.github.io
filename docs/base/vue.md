# 前端框架

## Vue Router

单页Web应用（single page application，SPA），就是只有一个Web页面的应用，
是加载单个HTML页面，并在用户与应用程序交互时动态更新该页面的Web应用程序。

* 单页面应用程序：
只有第一次会加载页面, 以后的每次请求, 仅仅是获取必要的数据.然后, 由页面中js解析获取的数据, 展示在页面中
* 传统多页面应用程序：
对于传统的多页面应用程序来说, 每次请求服务器返回的都是一个完整的页面

<h4>单页的优势：</h4>

* 减少了请求体积，加快页面响应速度，降低了对服务器的压力
* 更好的用户体验，让用户在web app感受native app的流畅

<h4>单页的缺点：</h4>

* 不利于 SEO（解决方案：[服务端渲染](http://zhangfangchao.com/performance/Performance.html#_1-12-%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93-ssr-or-%E9%A2%84%E6%B8%B2%E6%9F%93)）
* 首屏渲染时间长（解决方案：[预渲染](http://zhangfangchao.com/performance/Performance.html#_3-3-%E7%BD%91%E7%BB%9C%E7%9B%B8%E5%85%B3))

<h3>Vue Router 实现原理</h3>

vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
缺点是：丑。

如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

## Vuex

底层原理：
* State: 提供一个响应式数据
* Getter: 借助 Vue 的计算属性 computed 来实现缓存 
* Mutation: 更改 state 方法（同步）
* Action: 触发 mutation 方法（异步更改 state 方法）
* Module: Vue.set 动态添加state到响应式数据中

核心概念：
* State —— this.$store.state.xxx —— mapState 取值
* Getter —— this.$store.getters.xxx —— mapGetters 取值
* Mutation —— this.$store.commit(“xxx”) —— mapMutations 赋值 
* Action —— this.$store.dispatch(“xxx”) —— mapActions 赋值

## v-model 的原理

我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

* text 和 textarea 元素使用 value 属性和 input 事件；
* checkbox 和 radio 使用 checked 属性和 change 事件；
* select 字段将 value 作为 prop 并将 change 作为事件。

以 input 表单元素为例：

``` js
<input v-model='name' />
    
相当于

<input v-bind:value="name" v-on:input="name = $event.target.value" />
```

由于事件处理写成了内联模式，所以脚本部分不需要修改。但是多数情况下，事件一般都会定义成一个方法，代码就会复杂得多：

``` js
<input :value="name" @input="updateName" />

new Vue({
    // ....
    methods: {
        updateName(e) {
            this.name = e.target.value;
        }
    }
})
```

从上面的示例来看 v-model 节约了不少代码，最重要的是可以少定义一个事件处理函数。所以 v-model 实际干的事件包括：

* 使用 v-bind(即 :)单向绑定一个属性(示例：:value="name")
* 绑定 input 事件(即 @input)到一个默认实现的事件处理函数(示例：@input=updateName)
* 这个默认的事件处理函数会根据事件对象带入的值来修改被绑定的数据(示例：this.name = e.target.value)

## 数据双向绑定原理

相信大家对mvvm双向绑定应该都不陌生了，一言不合上代码，下面先看一个本文最终实现的效果吧，和vue一样的语法，如果还不了解双向绑定，猛戳[Google](https://www.google.com.hk/search?q=%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A);

``` js
<div id="mvvm-app">
    <input type="text" v-model="word">
    <p>{{word}}</p>
    <button v-on:click="sayHi">change model</button>
</div>

<script src="./js/observer.js"></script>
<script src="./js/watcher.js"></script>
<script src="./js/compile.js"></script>
<script src="./js/mvvm.js"></script>
<script>
    var vm = new MVVM({
        el: '#mvvm-app',
        data: {
            word: 'Hello World!'
        },
        methods: {
            sayHi: function() {
                this.word = 'Hi, everybody!';
            }
        }
    });
</script>
```

效果：

![gFwYoe.gif](https://t1.picb.cc/uploads/2019/09/16/gFwYoe.gif)

### 几种实现双向绑定的做法

目前几种主流的mvc(vm)框架都实现了单向数据绑定，而我所理解的双向数据绑定无非就是在单向绑定的基础上给可输入元素（input、textare等）添加了change(input)事件，来动态修改model和 view，并没有多高深。所以无需太过介怀是实现的单向或双向绑定。

实现数据绑定的做法有大致如下几种：

* 发布者-订阅者模式（backbone.js）
* 脏值检查（angular.js）
* 数据劫持（vue.js）

**发布者-订阅者模式:** 一般通过sub, pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是 vm.set('property', value)。

这种方式现在毕竟太low了，我们更希望通过 vm.property = value 这种方式更新数据，同时自动更新视图，于是有了下面两种方式

**脏值检查:** angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 setInterval() 定时轮询检测数据变动，当然Google不会这么low，angular只有在指定的事件触发时进入脏值检测，大致如下：

* DOM事件，譬如用户输入文本，点击按钮等 ( ng-click )
* XHR响应事件 ( $http )
* 浏览器Location变更事件 ( $location )
* Timer事件( $timeout , $interval )
* 执行 $digest() 或 $apply()
  
**数据劫持:** vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

**数据劫持的优势:**

* 无需显示调用：例如Vue运用数据劫持+发布订阅,直接可以通知变化并驱动视图,而比如Angular的脏检测则需要显示调用markForCheck(可以用zone.js避免显示调用,不展开),react需要显示调用setState。
* 可精确得知变化数据：当我们劫持了属性的setter,当属性值改变,我们可以精确获知变化的内容newVal,因此在这部分不需要额外的diff操作,否则我们只知道数据发生了变化而不知道具体哪些数据变化了,这个时候需要大量diff来找出变化值,这是额外性能损耗。

### 思路整理

已经了解到vue是通过数据劫持的方式来做数据绑定的，其中最核心的方法便是通过Object.defineProperty()来实现对属性的劫持，达到监听数据变动的目的，无疑这个方法是本文中最重要、最基础的内容之一，如果不熟悉defineProperty，猛戳[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

整理了一下，要实现mvvm的双向绑定，就必须要实现以下几点：

* 实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
* 实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
* 实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
* mvvm入口函数，整合以上三者

上述流程如图所示：

![gFwsRj.png](https://t1.picb.cc/uploads/2019/09/16/gFwsRj.png)

### 实现Observer

我们知道可以利用Obeject.defineProperty()来监听属性变动
那么将需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter和getter
这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化。相关代码可以是这样：

``` js
var data = {name: 'kindeng'};
observe(data);
data.name = 'dmq'; // 哈哈哈，监听到值变化了 kindeng --> dmq

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
};

function defineReactive(data, key, val) {
    observe(val); // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function() {
            return val;
        },
        set: function(newVal) {
            console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
        }
    });
}
```
这样我们已经可以监听每个数据的变化了，那么监听到变化之后就是怎么通知订阅者了，所以接下来我们需要实现一个消息订阅器，很简单，维护一个数组，用来收集订阅者，数据变动触发notify，再调用订阅者的update方法，代码改善之后是这样：

``` js
// ... 省略
function defineReactive(data, key, val) {
    var dep = new Dep();
    observe(val); // 监听子属性

    Object.defineProperty(data, key, {
        // ... 省略
        set: function(newVal) {
            if (val === newVal) return;
            console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
            dep.notify(); // 通知所有订阅者
        }
    });
}

function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
```

那么问题来了，谁是订阅者？怎么往订阅器添加订阅者？
没错，上面的思路整理中我们已经明确订阅者应该是Watcher, 而且var dep = new Dep();是在 defineReactive方法内部定义的，所以想通过dep添加订阅者，就必须要在闭包内操作，所以我们可以在 getter里面动手脚：

``` js
// Observer.js
// ...省略
Object.defineProperty(data, key, {
    get: function() {
        // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
        Dep.target && dep.addSub(Dep.target);
        return val;
    }
    // ... 省略
});

// Watcher.js
Watcher.prototype = {
    get: function(key) {
        Dep.target = this;
        this.value = data[key];    // 这里会触发属性的getter，从而添加订阅者
        Dep.target = null;
    }
}
```

这里已经实现了一个Observer了，已经具备了监听数据和数据变化通知订阅者的功能，[完整代码](https://github.com/DMQ/mvvm/blob/master/js/observer.js)。那么接下来就是实现Compile了

### 实现Compile

compile主要做的事情是解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图，如图所示：

![gFwDkc.png](https://t1.picb.cc/uploads/2019/09/16/gFwDkc.png)

因为遍历解析的过程有多次操作dom节点，为提高性能和效率，会先将跟节点el转换成文档碎片fragment进行解析编译操作，解析完成，再将fragment添加回原来的真实dom节点中

``` js
function Compile(el) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}
Compile.prototype = {
    init: function() { this.compileElement(this.$fragment); },
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(), child;
        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }
};
```

compileElement方法将遍历所有节点及其子节点，进行扫描解析编译，调用对应的指令渲染函数进行数据渲染，并调用对应的指令更新函数进行绑定，详看代码及注释说明：

``` js
Compile.prototype = {
    // ... 省略
    compileElement: function(el) {
        var childNodes = el.childNodes, me = this;
        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;    // 表达式文本
            // 按元素节点方式编译
            if (me.isElementNode(node)) {
                me.compile(node);
            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }
            // 遍历编译子节点
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        var nodeAttrs = node.attributes, me = this;
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 规定：指令以 v-xxx 命名
            // 如 <span v-text="content"></span> 中指令为 v-text
            var attrName = attr.name;    // v-text
            if (me.isDirective(attrName)) {
                var exp = attr.value; // content
                var dir = attrName.substring(2);    // text
                if (me.isEventDirective(dir)) {
                    // 事件指令, 如 v-on:click
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    // 普通指令
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
            }
        });
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    // ...省略
    bind: function(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];
        // 第一次初始化视图
        updaterFn && updaterFn(node, vm[exp]);
        // 实例化订阅者，此操作会在对应的属性消息订阅器中添加了该订阅者watcher
        new Watcher(vm, exp, function(value, oldValue) {
            // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
            updaterFn && updaterFn(node, value, oldValue);
        });
    }
};

// 更新函数
var updater = {
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
    // ...省略
};
```
这里通过递归遍历保证了每个节点及子节点都会解析编译到，包括了{{}}表达式声明的文本节点。指令的声明规定是通过特定前缀的节点属性来标记，如<span v-text="content" other-attr中v-text便是指令，而other-attr不是指令，只是普通的属性。
监听数据、绑定更新函数的处理是在compileUtil.bind()这个方法中，通过new Watcher()添加回调来接收数据变化的通知

至此，一个简单的Compile就完成了，[完整代码](https://github.com/DMQ/mvvm/blob/master/js/compile.js)。接下来要看看Watcher这个订阅者的具体实现了

### 实现Watcher

Watcher订阅者作为Observer和Compile之间通信的桥梁，主要做的事情是:
1、在自身实例化时往属性订阅器(dep)里面添加自己
2、自身必须有一个update()方法
3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。
如果有点乱，可以回顾下前面的思路整理

``` js
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    // 此处为了触发属性的getter，从而在dep添加自己，结合Observer更易理解
    this.value = this.get(); 
}
Watcher.prototype = {
    update: function() {
        this.run();    // 属性值变化收到通知
    },
    run: function() {
        var value = this.get(); // 取到最新值
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal); // 执行Compile中绑定的回调，更新视图
        }
    },
    get: function() {
        Dep.target = this;    // 将当前订阅者指向自己
        var value = this.vm[exp];    // 触发getter，添加自己到属性订阅器中
        Dep.target = null;    // 添加完毕，重置
        return value;
    }
};
// 这里再次列出Observer和Dep，方便理解
Object.defineProperty(data, key, {
    get: function() {
        // 由于需要在闭包内添加watcher，所以可以在Dep定义一个全局target属性，暂存watcher, 添加完移除
        Dep.target && dep.addDep(Dep.target);
        return val;
    }
    // ... 省略
});
Dep.prototype = {
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update(); // 调用订阅者的update方法，通知变化
        });
    }
};
```

实例化Watcher的时候，调用get()方法，通过Dep.target = watcherInstance标记订阅者是当前watcher实例，强行触发属性定义的getter方法，getter方法执行的时候，就会在属性的订阅器dep添加当前watcher实例，从而在属性值有变化的时候，watcherInstance就能收到更新通知。

ok, Watcher也已经实现了，[完整代码](https://github.com/DMQ/mvvm/blob/master/js/watcher.js)。
基本上vue中数据绑定相关比较核心的几个模块也是这几个，猛戳[这里](https://github.com/vuejs/vue) , 在src 目录可找到vue源码。

最后来讲讲MVVM入口文件的相关逻辑和实现吧，相对就比较简单了~

### 实现MVVM

MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

一个简单的MVVM构造器是这样子：

``` js
function MVVM(options) {
    this.$options = options;
    var data = this._data = this.$options.data;
    observe(data, this);
    this.$compile = new Compile(options.el || document.body, this)
}
```

但是这里有个问题，从代码中可看出监听的数据对象是options.data，每次需要更新视图，则必须通过var vm = new MVVM({data:{name: 'kindeng'}}); vm._data.name = 'dmq'; 这样的方式来改变数据。

显然不符合我们一开始的期望，我们所期望的调用方式应该是这样的：
var vm = new MVVM({data: {name: 'kindeng'}}); vm.name = 'dmq';

所以这里需要给MVVM实例添加一个属性代理的方法，使访问vm的属性代理为访问vm._data的属性，改造后的代码如下：

``` js
function MVVM(options) {
    this.$options = options;
    var data = this._data = this.$options.data, me = this;
    // 属性代理，实现 vm.xxx -> vm._data.xxx
    Object.keys(data).forEach(function(key) {
        me._proxy(key);
    });
    observe(data, this);
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    _proxy: function(key) {
        var me = this;
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                return me._data[key];
            },
            set: function proxySetter(newVal) {
                me._data[key] = newVal;
            }
        });
    }
};
```

这里主要还是利用了Object.defineProperty()这个方法来劫持了vm实例对象的属性的读写权，使读写vm实例的属性转成读写了vm._data的属性值，达到鱼目混珠的效果，哈哈

至此，全部模块和功能已经完成了，如本文开头所承诺的两点。一个简单的MVVM模块已经实现，其思想和原理大部分来自经过简化改造的vue[源码](https://github.com/vuejs/vue)，猛戳[这里](https://github.com/DMQ/mvvm)可以看到本文的所有相关代码。
由于本文内容偏实践，所以代码量较多，且不宜列出大篇幅代码，所以建议想深入了解的童鞋可以再次结合本文源代码来进行阅读，这样会更加容易理解和掌握。

总结
本文主要围绕“几种实现双向绑定的做法”、“实现Observer”、“实现Compile”、“实现Watcher”、“实现MVVM”这几个模块来阐述了双向绑定的原理和实现。并根据思路流程渐进梳理讲解了一些细节思路和比较关键的内容点，以及通过展示部分关键代码讲述了怎样一步步实现一个双向绑定MVVM。文中肯定会有一些不够严谨的思考和错误，欢迎大家指正，有兴趣欢迎一起探讨和改进~

[参考文章](https://segmentfault.com/a/1190000006599500)

## defineProperty 缺陷

### 无法监听数组变化

由于 JavaScript 的限制，Vue 不能检测以下数组的变动：

1、当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue  
2、当你修改数组的长度时，例如：vm.items.length = newLength

举个官网的例子：
``` js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

为了解决第一类问题，以下两种方式都可以实现和 vm.items[indexOfItem] = newValue 相同的效果，同时也将在响应式系统内触发状态更新：

``` js
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

你也可以使用 vm.$set 实例方法，该方法是全局方法 Vue.set 的一个别名：

``` js
vm.$set(vm.items, indexOfItem, newValue)
// 个人比较喜欢这种处理方式 简单粗暴，一步到位
```

为了解决第二类问题 vm.items.length = newLength，你可以使用 splice：

``` js
vm.items.splice(newLength)
```

然而[Vue的文档](https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B)提到了Vue是可以检测到部分数组的变化，但是只有以下八种方法：

``` js
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

小伙伴可能会有疑问：why？先看下源码：

``` js
/**
* Observe a list of Array items. 遍历数组
*/
observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
        observe(items[i])  // observe 功能为监测数据的变化
    }
}
```

**通过 Vue 源码部分查看，我们就能知道 Vue 框架是通过遍历数组 和递归遍历对象，从而达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。**

### 只能劫持对象的属性

Object.defineProperty的第二个缺陷，只能劫持对象的属性。因此，我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历，显然能劫持一个完整的对象是更好的选择。

``` js
/**
* 对属性进行递归遍历
*/
let childOb = !shallow && observe(val) // observe 功能为监测数据的变化
```

**通过 Vue 源码部分查看，我们就能知道 Vue 框架是通过遍历数组 和递归遍历对象，从而达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。**

为了解决以上两个缺陷，Vue 3.0 打算 用 Proxy 改写双向绑定的实现。

## Proxy 的优势

Proxy在ES2015规范中被正式发布,它在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写,我们可以这样认为,Proxy是Object.defineProperty的全方位加强版,具体的文档可以查看[此处](http://es6.ruanyifeng.com/#docs/proxy);

### 可以直接监听对象而非属性

接下来我们用Proxy进行实现一个极简版双向绑定

``` js
const input = document.getElementById('input');
const p = document.getElementById('p');
const obj = {};

const newObj = new Proxy(obj, {
    get: function(target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver) {
        console.log(target, key, value, receiver);
        if (key === 'text') {
            input.value = value;
            p.innerHTML = value;
        }
        return Reflect.set(target, key, value, receiver);
    },
});

input.addEventListener('keyup', function(e) {
    newObj.text = e.target.value;
});
```

我们可以看到,Proxy直接可以劫持整个对象,并返回一个新对象,不管是操作便利程度还是底层功能上都远强于Object.defineProperty。

### 可以直接监听数组的变化

当我们对数组进行操作(push、shift、splice等)时，会触发对应的方法名称和length的变化，我们可以借此进行操作,以Object.defineProperty 无法实现的列表渲染为例。

``` js
const list = document.getElementById('list');
const btn = document.getElementById('btn');

// 渲染列表
const Render = {
  // 初始化
  init: function(arr) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      const li = document.createElement('li');
      li.textContent = arr[i];
      fragment.appendChild(li);
    }
    list.appendChild(fragment);
  },
  // 我们只考虑了增加的情况,仅作为示例
  change: function(val) {
    const li = document.createElement('li');
    li.textContent = val;
    list.appendChild(li);
  },
};

// 初始数组
const arr = [1, 2, 3, 4];

// 监听数组
const newArr = new Proxy(arr, {
  get: function(target, key, receiver) {
    console.log(key);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(target, key, value, receiver);
    if (key !== 'length') {
      Render.change(value);
    }
    return Reflect.set(target, key, value, receiver);
  },
});

// 初始化
window.onload = function() {
    Render.init(arr);
}

// push数字
btn.addEventListener('click', function() {
  newArr.push(6);
});
```

很显然,Proxy不需要那么多hack（即使hack也无法完美实现监听）就可以无压力监听数组的变化,我们都知道,标准永远优先于hack。

### Proxy的其他优势

* Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的。
* Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,而Object.defineProperty只能遍历对象属性直接修改。
* Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利。

### Proxy的劣势

* Proxy的劣势就是兼容性问题,而且无法用polyfill磨平,因此Vue的作者才声明需要等到下个大版本(3.0)才能用Proxy重写。

[参考文章](https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf)

## watch 和 computed

### computed和watch区别

<h3>computed:</h3>

* computed是计算属性，也就是计算值，它更多用于计算值的场景
* computed具有缓存性，computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时才会重新调用对应的getter来计算
* computed适用于计算比较消耗性能的计算场景

<h3>watch:</h3>

* 更多的是「观察」的作用，类似于某些数据的监听回调，用于观察props $emit或者本组件的值，当数据变化时来执行回调进行后续操作
无缓存性，页面重新渲染时值不变化也会执行。

<h3>小结:</h3>

当我们要进行数值计算，而且依赖于其他数据，那么把这个数据设计为computed；
如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化。

### watch实现过程

* watch的初始化在data初始化之后（此时的data已经通过Object.defineProperty的设置成响应式）
* watch的key会在Watcher里进行值的读取，也就是立马执行get获取value（从而实现data对应的key执行getter实现对于watch的依赖收集），此时如果有immediate属性那么立马执行watch对应的回调函数
* 当data对应的key发生变化时，触发user watch实现watch回调函数的执行

### computed运行原理

拿官网简单的例子来看一下：
``` js
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>

var vm = new Vue({
    el: '#example',
    data: {
        message: 'Hello'
    },
    computed: {
            // a computed getter
        reversedMessage: function () {
            // `this` points to the vm instance
            return this.message.split('').reverse().join('')
        }
    }
})
```

Vue 里的 Computed 属性非常频繁的被使用到，但并不是很清楚它的实现原理。比如：计算属性如何与属性建立依赖关系？属性发生变化又如何通知到计算属性重新计算？

关于如何建立依赖关系，是利用 JavaScript 单线程的原理和 Vue 的 Getter 设计，通过一个简单的发布订阅，就可以在一次计算属性求值的过程中收集到相关依赖。

因此接下来的任务就是从 Vue 源码一步步分析 Computed 的实现原理。

### Action

data 属性初始化 getter setter：

``` js
// src/observer/index.js

// 这里开始转换 data 的 getter setter，原始值已存入到 __ob__ 属性中
Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: true,
  get: function reactiveGetter () {
    const value = getter ? getter.call(obj) : val
    // 判断是否处于依赖收集状态
    if (Dep.target) {
      // 建立依赖关系
      dep.depend()
      ...
    }
    return value
  },
  set: function reactiveSetter (newVal) {
    ...
    // 依赖发生变化，通知到计算属性重新计算
    dep.notify()
  }
})
```

computed 计算属性初始化：

``` js
// src/core/instance/state.js

// 初始化计算属性
function initComputed (vm: Component, computed: Object) {
  ...
  // 遍历 computed 计算属性
  for (const key in computed) {
    ...
    // 创建 Watcher 实例
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions)

    // 创建属性 vm.reversedMessage，并将提供的函数将用作属性 vm.reversedMessage 的 getter，
    // 最终 computed 与 data 会一起混合到 vm 下，所以当 computed 与 data 存在重名属性时会抛出警告
    defineComputed(vm, key, userDef)
    ...
  }
}

export function defineComputed (target: any, key: string, userDef: Object | Function) {
  ...
  // 创建 get set 方法
  sharedPropertyDefinition.get = createComputedGetter(key)
  sharedPropertyDefinition.set = noop
  ...
  // 创建属性 vm.reversedMessage，并初始化 getter setter
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        // watcher 暴露 evaluate 方法用于取值操作
        watcher.evaluate()
      }
      // 同第1步，判断是否处于依赖收集状态
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```

无论是属性还是计算属性，都会生成一个对应的 watcher 实例

``` js
// src/core/observer/watcher.js

// 当通过 vm.reversedMessage 获取计算属性时，就会进到这个 getter 方法
get () {
  // this 指的是 watcher 实例
  // 将当前 watcher 实例暂存到 Dep.target，这就表示开启了依赖收集任务
  pushTarget(this)
  let value
  const vm = this.vm
  try {
    // 在执行 vm.reversedMessage 的函调函数时，会触发属性（步骤1）和计算属性（步骤2）的 getter
    // 在这个执行过程中，就可以收集到 vm.reversedMessage 的依赖了
    value = this.getter.call(vm, vm)
  } catch (e) {
    if (this.user) {
      handleError(e, vm, `getter for watcher "${this.expression}"`)
    } else {
      throw e
    }
  } finally {
    if (this.deep) {
      traverse(value)
    }
    // 结束依赖收集任务
    popTarget()
    this.cleanupDeps()
  }
  return value
}
```

上面多出提到了 dep.depend, dep.notify, Dep.target，那么 Dep 究竟是什么呢？

Dep 的代码短小精悍，但却承担着非常重要的依赖收集环节

``` js
// src/core/observer/dep.js

export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      // 更新 watcher 的值，与 watcher.evaluate() 类似，
      // 但 update 是给依赖变化时使用的，包含对 watch 的处理
      subs[i].update()
    }
  }
}

// 当首次计算 computed 属性的值时，Dep 将会在计算期间对依赖进行收集
Dep.target = null
const targetStack = []

export function pushTarget (_target: Watcher) {
  // 在一次依赖收集期间，如果有其他依赖收集任务开始（比如：当前 computed 计算属性嵌套其他 computed 计算属性），
  // 那么将会把当前 target 暂存到 targetStack，先进行其他 target 的依赖收集，
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  // 当嵌套的依赖收集任务完成后，将 target 恢复为上一层的 Watcher，并继续做依赖收集
  Dep.target = targetStack.pop()
}
```

### 总结一下流程

* 初始化 data， 使用 Object.defineProperty 把这些属性全部转为 getter/setter。
* 初始化 computed, 遍历 computed 里的每个属性，每个 computed 属性都是一个 watch 实例。每个属性提供的函数作为属性的 getter，使用 Object.defineProperty 转化。
* Object.defineProperty getter 依赖收集。用于依赖发生变化时，触发属性重新计算。
* 若出现当前 computed 计算属性嵌套其他 computed 计算属性时，先进行其他的依赖收集。

[参考文章](https://segmentfault.com/a/1190000010408657)
