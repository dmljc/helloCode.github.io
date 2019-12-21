# 性能优化

## 一、代码层面的优化

### 1.1 v-if 和 v-show

v-if 是 真正 的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

v-show 就简单得多， 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 display 属性进行切换。

所以，v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。

### 1.2 computed 和 watch

computed： 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值；

watch： 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；

运用场景：

当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；

当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

### 1.3 v-for 绑定 key

v-for 遍历必须为 item 添加 key 在列表数据进行遍历渲染时，需要为每一项 item 设置唯一 key 值，方便 Vue.js 内部机制精准找到该条列表数据。当 state 更新时，新的状态值和旧的状态值对比，较快地定位到 diff 。

v-for 遍历避免同时使用 v-if

v-for 比 v-if 优先级高，如果每一次都需要遍历整个数组，将会影响速度，尤其是当之需要渲染很小一部分的时候，必要情况下应该替换成 computed 属性。

### 1.4 Object.freeze()提升性能

Object.freeze() 可以冻结一个对象，冻结之后不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。

当你把一个普通的 JavaScript 对象传给 Vue 实例的  data  选项，Vue 将遍历此对象所有的属性，并使用  Object.defineProperty  把这些属性全部转为 getter/setter，这些 getter/setter 对用户来说是不可见的，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。

但 Vue 在遇到像 Object.freeze() 这样被设置为不可配置之后的对象属性时，不会为对象加上 setter getter 等数据劫持的方法。

[Object.freeze()](https://cn.vuejs.org/v2/guide/instance.html#%E6%95%B0%E6%8D%AE%E4%B8%8E%E6%96%B9%E6%B3%95)

### 1.5 长列表性能优化

如果你的应用存在非常长或者无限滚动的列表，那么采用 窗口化 的技术来优化性能，只需要渲染少部分区域的内容，减少重新渲染组件和创建 dom 节点的时间。

[vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list) 和 [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller) 都是解决这类问题的开源项目。你也可以参考 Google 工程师的文章[Complexities of an Infinite Scroller](https://developers.google.com/web/updates/2016/07/infinite-scroller) 来尝试自己实现一个虚拟的滚动列表来优化性能，主要使用到的技术是 DOM 回收、墓碑元素和滚动锚定。

### 1.6 图片资源懒加载

对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。这样对于页面加载性能上会有很大的提升，也提高了用户体验。我们在项目中使用 Vue 的 [vue-lazyload](https://github.com/hilongjw/vue-lazyload) 插件：

``` js
// 在入口文件 man.js 中引入并使用
import VueLazyload from 'vue-lazyload'

// 然后再 vue 中直接使用
Vue.use(VueLazyload)

// 或者添加自定义选项
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    attempt: 1
})
```
在 vue 文件中将 img 标签的 src 属性直接改为 v-lazy ，从而将图片显示方式更改为懒加载显示：

``` js
<ul>
    <li v-for="img in list">
        <img v-lazy="img.src" >
    </li>
</ul>
```
### 1.7 路由懒加载

Vue 是单页面应用，可能会有很多的路由引入 ，这样使用 webpcak 打包后的文件很大，当进入首页时，加载的资源过多，页面会出现白屏的情况，不利于用户体验。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的组件，这样就更加高效了。这样会大大提高首屏显示的速度，但是可能其他的页面的速度就会降下来。

``` js
const router = new VueRouter({
    routes: [
        { path: '/foo', component: () => import(/* webpackChunkName: 'foo' */ '@/pages/foo') }
    ]
})
```

### 1.8 防抖和节流

你是否在日常开发中遇到一个问题，在滚动事件中需要做个复杂计算或者实现一个按钮的防二次点击操作。

这些需求都可以通过函数防抖动来实现。尤其是第一个需求，如果在频繁的事件回调中做复杂计算，很有可能导致页面卡顿，不如将多次计算合并为一次计算，只在一个精确点做操作。

PS：防抖和节流的作用都是防止函数多次调用。区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于wait，防抖的情况下只会调用一次，而节流的 情况会每隔一定时间（参数wait）调用函数。

``` js
// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function debounce(fn, delay) {
    let timer = null; // 定时器
    return () => { // 将debounce处理结果当作函数返回
        let context = this; // 保留调用时的this上下文
        let args = arguments; // 保留调用时传入的参数
        if (timer) clearTimeout(timer);  // 每次事件被触发时，都去清除之前的旧定时器
        timer = setTimeout(() => { // 设立新定时器
            fn.apply(context, args);
        }, delay);
    }
}

// 用debounce来包装scroll的回调
document.addEventListener('scroll', debounce(() => console.log('触发了滚动事件'), 1000));
```  

节流和防抖动本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。

``` js
// fn是我们需要包装的事件回调, interval是时间间隔的阈值
function throttle(fn, interval) {
    let last = 0 // last为上一次触发回调的时间
    return () => { // 将throttle处理结果当作函数返回
        let context = this; // 保留调用时的this上下文
        let args = arguments; // 保留调用时传入的参数
        let now = +new Date(); // 记录本次触发回调的时间
        if (now - last >= interval) { // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
            last = now; // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
            fn.apply(context, args);
        }
    }
}

// 用throttle来包装scroll的回调
document.addEventListener('scroll', throttle(() => console.log('触发了滚动事件'), 1000));
```    
### 1.9 合理使用 async await

async 和 await 相比直接使用 Promise 来说，优势在于处理 then 的调用链，能够更清晰准确的写出代码。缺点在于滥用 await 可能会导致性能问题，因为 await 会阻塞代码，也许之后的异步代码并不依赖于前者，但仍然需要等待前者完成，导致代码失去了并发性。

### 1.10 事件的销毁

Vue 组件销毁时，会自动清理它与其它实例的连接，解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。 如果在 js 内使用 addEventListene 等方式是不会自动销毁的，我们需要在组件销毁时手动移除这些事件的监听，以免造成内存泄露，如：

``` js
created() {
  addEventListener('click', this.click, false)
}, 
beforeDestroy() {
  removeEventListener('click', this.click, false)
}
```

### 1.11 第三方插件的按需引入

我们在项目中经常会需要引入第三方插件，如果我们直接引入整个插件，会导致项目的体积太大，我们可以借助 babel-plugin-component ， 然后可以只引入需要的组件，以达到减小项目体积的目的。以下为项目中引入 element-ui 组件库为例：

首先，安装 babel-plugin-component：

``` js
npm install babel-plugin-component -D
```

然后，将 .babelrc 修改为：

``` js
{

    "presets": [["es2015", { "modules": false }]],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
```
如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

``` js
import Vue from 'vue'; 
import { Button, Select } from 'element-ui'; 

Vue.use(Button)
Vue.use(Select)
```
[element 官网](https://element.eleme.cn/#/zh-CN/component/quickstart)

### 1.12 服务端渲染 SSR or 预渲染

服务端渲染是指 Vue 在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的 html 片段直接返回给客户端这个过程就叫做服务端渲染。

（1）服务端渲染的优点：

更好的 SEO： 因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容，所以在 SPA 中是抓取不到页面通过 Ajax 获取到的内容；而 SSR 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面；

更快的内容到达时间（首屏加载更快）： SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间；

（2）服务端渲染的缺点：

更多的开发条件限制： 例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；

更多的服务器负载：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用CPU 资源，因此如果你预料在高流量环境下使用，请准备相应的服务器负载，并明智地采用缓存策略。

## 二、Webpack 层面的优化

### 2.1 alias对文件路径优化

* alias: 配置别名可以加快webpack查找模块的速度
* extension: 指定 extension 之后可以不用在 require 或是 import 的时候加文件扩展名，会依次尝试添加扩展名进行匹配
  
``` js
resolve: {
    extension: ["", ".js", ".jsx"],
    alias: {
      "@": path.join(__dirname, "src"),
      pages: path.join(__dirname, "src/pages"),
      router: path.join(__dirname, "src/router")
    }
}
```
[resolve.alias、extension](http://zhangfangchao.com/base/webpack.html#%E5%87%8F%E5%B0%91%E6%96%87%E4%BB%B6%E6%90%9C%E7%B4%A2%E8%8C%83%E5%9B%B4)

### 2.2 对图片进行压缩

在 vue 项目中除了可以在 webpack.base.conf.js 中 url-loader 中设置 limit 大小来对图片处理，对小于 limit 的图片转化为 base64 格式，其余的不做操作。所以对有些较大的图片资源，在请求资源的时候，加载会很慢，我们可以用 image-webpack-loader来压缩图片：

``` js
npm install image-webpack-loader --save-dev

{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use:[{
        loader: 'url-loader',
        options: {
            limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        },
        {
            loader: 'image-webpack-loader',
            options: {
                bypassOnDebug: true,
            }
        }]
}
```
[图片处理图片成 base64](http://zhangfangchao.com/base/webpack.html#%E5%9B%BE%E7%89%87%E5%8E%8B%E7%BC%A9)

### 2.3 CSS 抽离

如果不做配置，我们的css是直接打包进js里面的，我们希望能单独生成css文件。 因为单独生成css,css可以和js并行下载，提高页面加载效率

``` js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'; // 判断当前环境是开发环境还是 部署环境，主要是 mode属性的设置值。

module.exports = {
    mode: 'development',
    ...
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader',
                'postcss-loader',
                'sass-loader'
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css', // 设置最终输出的文件名
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        })
    ]
};
```

### 2.4 代码分割按需加载、提取公共代码

为什么要实现按需加载？

我们现在看到，打包完后，所有页面只生成了一个bundle.js,当我们首屏加载的时候，就会很慢。因为他也下载了别的页面的js了,也就是说，执行完毕之前，页面是 完！全！空！白！的！。 如果每个页面单独打包自己的js，就可以在进入页面时候再加载自己 的js，首屏加载就可以快很多

``` js
optimization: {
    splitChunks: {
      chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    }
}
```
[Code Splitting](http://zhangfangchao.com/base/webpack.html#code-splitting)

### 2.5 减少 ES6 转为 ES5 的冗余代码

Babel 插件会在将 ES6 代码转换成 ES5 代码时会注入一些辅助函数，例如下面的 ES6 代码：

``` js
class HelloWebpack extends Component{...}
```

这段代码再被转换成能正常运行的 ES5 代码时需要以下两个辅助函数：

``` js
babel-runtime/helpers/createClass  // 用于实现 class 语法
babel-runtime/helpers/inherits  // 用于实现 extends 语法    
```

在默认情况下， Babel 会在每个输出文件中内嵌这些依赖的辅助函数代码，如果多个源代码文件都依赖这些辅助函数，那么这些辅助函数的代码将会出现很多次，造成代码冗余。为了不让这些辅助函数的代码重复出现，可以在依赖它们时通过 require('babel-runtime/helpers/createClass') 的方式导入，这样就能做到只让它们出现一次。babel-plugin-transform-runtime 插件就是用来实现这个作用的，将相关辅助函数进行替换成导入语句，从而减小 babel 编译出来的代码的文件大小。

修改 .babelrc 配置文件为：

``` js
npm install babel-plugin-transform-runtime --save-dev

"plugins": [
    "transform-runtime"
]
```

### 2.6 HTML CSS JS 压缩

``` js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    ...
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 默认值： 'index.html'
            template: path.resolve(__dirname, 'src/index.html'),
            minify: {
                collapseWhitespace: true,   // 删除空白符和换行符
                removeComments: true,   // 移除注释
                removeAttributeQuotes: true // 移除属性的引号
            }
        }),
        new OptimizeCssAssetsPlugin();
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,      // 启用 缓存
                parallel: true,   // 启用 多进程并行运行。
                sourceMap: true   // 使用源映射将错误消息位置映射到模块。主要用来定位bug。
            })
        ]
    }
};
```

### 2.7 清理 dist 目录

每次构建，我们的 `/dist` 文件夹都会保存生成的文件，然后就会非常杂乱。

通常，在每次构建前清理 `/dist` 文件夹，是比较推荐的做法

`clean-webpack-plugin` 是一个比较普及的管理插件，让我们安装和配置下。

``` js
npm install clean-webpack-plugin --save-dev

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new CleanWebpackPlugin()
    ]
};
```

### 2.8 Tree Shaking

App往往有一个入口文件，相当于一棵树的主干，入口文件有很多依赖的模块，相当于树枝。实际情况中，虽然依赖了某个模块，但其实只使用其中的某些功能。通过Tree shaking，将没有使用的模块摇掉，这样来达到删除无用代码的目的。

``` js
// css tree shaking
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')

module.exports = {
    plugins:[
        // css tree shaking 清除无用 css
        new PurifyCSS({
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
                path.resolve(__dirname, './src/*.js')
            ])
        })
    ],
    ...
    // js 开启 tree shaking
    optimization: {
        usedExports: true
    }
}
```
[Tree Shaking](http://zhangfangchao.com/base/webpack.html#tree-shaking)

### 2.9 合并两个webpack的js配置文件

开发环境(development)和生产环境(production)配置文件有很多不同点，但是也有一部分是相同的配置内容，如果在两个配置文件中都添加相同的配置节点，
就非常不爽。

`webpack-merge` 的工具可以实现两个配置文件进合并，这样我们就可以把 开发环境和生产环境的公共配置抽取到一个公共的配置文件中。

### 2.10 JS 使用 source map

当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。

使用 `inline-source-map` 选项，这有助于解释说明 js 原始出错的位置。（不要用于生产环境）：


``` js
module.exports = {
    ...
    devtool: 'inline-source-map'
};

// CSS 也可以开启source map
```

### 2.11 构建结果输出分析

Webpack 输出的代码可读性非常差而且文件非常大，让我们非常头疼。为了更简单、直观地分析输出结果，社区中出现了许多可视化分析工具。 这些工具以图形的方式将结果更直观地展示出来，让我们快速了解问题所在。接下来讲解我们在 Vue 项目中用到的分析工具：webpack-bundle-analyzer 。

``` js
npm install --save-dev webpack-bundle-analyzer

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer'). BundleAnalyzerPlugin; 

module.exports = {
    ···
    plugins: [
        new BundleAnalyzerPlugin()
    ]
}
```
执行 $ npm run build 后生成分析报告如下：

![webpack-bundle-analyzer](https://haitao.nos.netease.com/a3e45e1b-3ea0-46d9-9132-22ffd4dbbc91_908_547.gif)

## 三、基础的 Web 技术优化

### 3.1 开启 gzip 压缩

gzip 是 GNUzip 的缩写，最早用于 UNIX 系统的文件压缩。HTTP 协议上的 gzip 编码是一种用来改进 web 应用程序性能的技术，web 服务器和客户端（浏览器）必须共同支持 gzip。目前主流的浏览器，Chrome，firefox，IE等都支持该协议。常见的服务器如 Apache，Nginx，IIS 同样支持，gzip 压缩效率非常高，通常可以达到 70% 的压缩率，也就是说，如果你的网页有 10K，压缩之后就变成了 3K 左右

以下我们以服务端使用我们熟悉的 express 为例，开启 gzip 非常简单，相关步骤如下：

``` js
npm install compression --save
```

添加代码逻辑：

``` js
var compression = require('compression'); 
var app = express(); 
app.use(compression())
```

### 3.2 HTTP缓存

缓存对于前端性能优化来说是个很重要的点，良好的缓存策略可以降低资源的重复加载提高网页的整体加载速度。
通常浏览器缓存策略分为两种：**强缓存** 和 **协商缓存**（后端配置）。

<h3>强缓存（Expires 和 Cache-Control）</h3>

实现强缓存可以通过两种响应头实现：Expires 和 Cache-Control 。强缓存表示在缓存期间不需要请求，state code 为 200

``` js
Expires: Wed, 22 Oct 2018 08:41:00 GMT
```

Expires 是 HTTP / 1.0 的产物，表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需要再次请求。 并且 Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效。

``` js
Cache-control: max-age=31536000
// 该属性表示资源会在 31536000 秒后过期，需要再次请求
```

为了弥补 Expires 受限于本地时间的短板，1.1 版本中 Cache-Control 应运而生，优先级高于 Expires 。

<h3>协商缓存（Last-Modified 和 ETag）</h3>

如果缓存过期了，我们就可以使用协商缓存来解决问题。协商缓存需要请求，如果缓存有效会返回 304。

1、Last-Modified 表示本地文件最后修改日期，If-Modified-Since 会将 Last-Modified 的值发送给服务器， 询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来。

但是，Last-Modified 存在一些弊端，这其中最常见的就是这样两个场景：

  * 我们编辑了文件，但文件的内容没有改变。服务端并不清楚我们是否真正改变了文件，它仍然通过最后编辑时间进行判断。 因此这个资源在再次被请求时，会被当做新资源，进而引发一次完整的响应——不该重新请求的时候，也会重新请求。

  * 当我们修改文件的速度过快时（比如花了 100ms 完成了改动），由于 If-Modified-Since 只能检查到以秒为最小计量单位的时间差， 所以它是感知不到这个改动的——该重新请求的时候，反而没有重新请求了...

这两个场景其实指向了同一个 bug——服务器并没有正确感知文件的变化。为了解决这样的问题，于是在 HTTP / 1.1 版本中 Etag 作为 Last-Modified 的补充出现了。

2、Etag 是由服务器为每个资源生成的唯一的标识字符串，这个标识字符串是基于文件内容编码的，只要文件内容不同， 它们对应的 Etag 就是不同的，反之亦然。因此 Etag 能够精准地感知文件的变化 。

ETag 和 Last-Modified 类似，If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动， 有变动的话就将新的资源发送回来。并且 ETag 优先级比 Last-Modified 高。

<h3>选择合适的缓存策略</h3>

对于大部分的场景都可以使用强缓存配合协商缓存解决，但是在一些特殊的地方可能需要选择特殊的缓存策略：

* 对于某些不需要缓存的资源，可以使用 Cache-control: no-store ，表示该资源不需要缓存；

* 对于频繁变动的资源，可以使用 Cache-Control: no-cache 并配合 ETag 使用，表示该资源已被缓存， 但是每次都会发送请求询问资源是否更新；

* 对于代码文件来说，通常使用 Cache-Control: max-age=31536000 并配合策略缓存使用，然后对文件进行指纹处理， 一旦文件名变动就会立刻下载新的文件；

<h3>使用 HTTP / 2.0</h3>

因为浏览器会有并发请求限制，在 HTTP / 1.1 时代，每个请求都需要建立和断开，消耗了好几个 RTT 时间，并且由于 TCP 慢启动的原因， 加载体积大的文件会需要更多的时间。

在 HTTP / 2.0 中引入了多路复用，能够让多个请求使用同一个 TCP 链接，极大的加快了网页的加载速度。并且还支持 Header 压缩， 进一步的减少了请求的数据大小。

<h2>版本间的区别</h2>

<h3>相对于 HTTP / 1.0，HTTP / 1.1的优化</h3>

* 缓存处理：多了Cache-control，Etag 等缓存信息（1.0：Expires,Last-Modified）
* 带宽优化及网络连接的使用
* 错误通知的管理
* Host头处理
* 改进持久连接：1.1中默认开启Connection：keep-alive，弥补了1.0每次请求都要创建连接的缺点

<h3>相对于 HTTP / 1.1，HTTP / 2.0的优化</h3>

* 2.0 支持多路复用，能够让多个请求使用同一个 TCP 链接，极大的加快了网页的加载速度
* 2.0 还支持 Header 压缩， 进一步的减少了请求的数据大小
* 2.0 支持二进制传送（实现方便且健壮），HTTP1.x是字符串传送
* 2.0 支持服务端推送

### 3.3 网络相关

CDN
浏览器从服务器上下载 CSS、js 和图片等文件时都要和服务器连接，而大部分服务器的带宽有限，如果超过限制，网页就半天反应不过来。 而 CDN 可以通过不同的域名来加载文件，从而使下载文件的并发连接数大大增加，且CDN 具有更好的可用性，更低的网络延迟和丢包率 。

DNS 预解析
DNS 解析也是需要时间的，可以通过预解析的方式来预先获得域名所对应的 IP。

``` js
<link rel="dns-prefetch" href="http://example.com">
```

预加载
在开发中，可能会遇到这样的情况。有些资源不需要马上用到，但是希望尽早获取，这时候就可以使用预加载。

预加载其实是声明式的 fetch ，强制浏览器请求资源，并且不会阻塞 onload 事件，可以使用以下代码开启预加载

``` js
<link rel="preload" href="http://example.com">
```

预加载可以一定程度上降低首屏的加载时间，因为可以将一些不影响首屏但重要的文件延后加载，唯一缺点就是兼容性不好。

预渲染
可以通过预渲染将下载的文件预先在后台渲染，可以使用以下代码开启预渲染

``` js
<link rel="prerender" href="http://example.com">
```

预渲染虽然可以提高页面的加载速度，但是要确保该页面百分百会被用户在之后打开，否则就白白浪费资源去渲染

### 3.4 Chrome Performance

Chrome 的 Performance 面板可以录制一段时间内的 js 执行细节及时间。使用 Chrome 开发者工具分析页面性能的步骤如下。

打开 Chrome 开发者工具，切换到 Performance 面板
点击 Record 开始录制
刷新页面或展开某个节点
点击 Stop 停止录制

![gBwRad.jpg](https://t1.picb.cc/uploads/2019/09/11/gBwRad.jpg)

[更多关于 Performance 的内容可以点击这里查看](https://www.cnblogs.com/xiaohuochai/p/9182710.html)

## 总结

本文通过以下三部分组成：Vue 代码层面的优化、webpack 配置层面的优化、基础的 Web 技术层面的优化；来介绍怎么去优化 Vue 项目的性能。 希望对读完本文的你有帮助、有启发，如果有不足之处，欢迎批评指正交流！

