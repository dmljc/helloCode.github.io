# Webpack

## 基础篇章

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

![](https://t1.picb.cc/uploads/2019/09/09/gXSVgg.png)

<h3>优势</h3>

* 社区生态丰富
* 配置灵活和插件化扩展
* 官方更新迭代速度快
  
``` js
// webpack 配置组成
module.exports = {
    entry: './src/index.js',    // 打包的⼊入⼝口⽂文件
    output: './dist/main.js',   // 打包输出
    mode: 'production',     // 环境
    module: {
        rules: [{
            test: /\.txt$/,     // loader 配置
            use: 'raw-loader'
        }]
    },
    plugins: [
        new HtmlwebpackPlugin({     // 插件配置
            template: './src/index.html'
        })
    ]
};
```
webpack 安装过程省略，请自行 chrome。

### Entry

Entry⽤来指定webpack的打包⼊口。对于非代码比如图片、字体依赖也会不断加⼊到依赖图中。

``` js
// 单⼊口：entry是⼀个字符串
module.exports = {
    entry: './path/to/my/entry/file.js'
}

// 多⼊口：entry是⼀个对象
module.exports = {
    entry: {
        app: './src/app.js',
        adminApp: './src/adminApp.js'
    }
};
```

### Output

Output ⽤来告诉 webpack 如何将编译后的⽂件输出到磁盘。

``` js
// 单⼊口配置
module.exports = {
    entry: './path/to/my/entry/file.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    }
};

// 多入口配置
module.exports = {
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',    // 通过占位符确保文件名称的唯⼀
        path: __dirname + '/dist'
    }
};
```

### Loaders

Webpack 开箱即用只支持 JS 和 JSON 两种文件类型，通过 Loaders 去支持其它文件类型并且把它们转化成有效的模块，
并且可以添加到依赖图中。本身是一个函数，接受源文件作为参数，返回转换的结果。


| 名称           | 描述  |
| ---------- | :-----|
| babel-loader       | 转换 ES6、ES7 等 JS 新特性语法 |
| css-loader     |   支持 .css 文件的加载和解析 |
| style-loader     |   把 js 中引入的 css 内容 注入到 html 标签中，并添加 style 标签. 依赖 css-loader |
| less-loader    |  将 less 文件转换为 css 文件  |
| file-loader     |   图片，字体的转换 |
| url-loader     |  类似于 file-loader，能把 url 地址对应的文件，打包成 base64 格式，提高访问效率 |
| thread-loader      |   多进程打包 js 和 css    |

<h3>Loaders的⽤用法</h3>

``` js
const path = require('path');

module.exports = {
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { 
                test: /\.txt$/,     // test 指定匹配规则 use 指定使用的loader名称
                use: 'raw-loader' 
            }
        ]
    }
};
```
### Plugins

插件⽤于 bundle ⽂件的优化，资源管理和环境变量注入，作用于整个构建过程。

<h3>常见的Plugins有哪些？</h3>

| 名称           | 描述  |
| ---------- | :-----|
| SplitChunksPlugin       | 将 chunks 相同的模块代码提取为公共的js |
| CleanWebpackPlugin     |   清理构建目录 |
| MiniCssExtractPlugin    |  将 css 从 bundle 文件提取为独立的 css文件 |
| HtmlWebpackPlugin     |   创建 html 文件 并自动把打包后的 CSS 或者JS 文件直接注入到 HTML 模板中 |
| UglifyjsWebpackPlugin     |   压缩 js    |
| ZipWebpackPlugin     |   把打包出的资源压缩为 .zip 文件 |

<h3>Plugins的⽤用法</h3>

``` js
const path = require('path');
module.exports = {
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'    // 放到 plugins 数组里
        })   
    ]
};
```
### Mode

通过 **process.env.NODE_ENV** 来指定当前的构建环境是：production、development 还是 none，默认值为 production。

### 解析ES6

使⽤ babel-loader， babel 的配置⽂件是：.babelrc
``` js
module: {    
    rules: [
        {
            test: /\.js$/,
            use: 'babel-loader'
        }
    ]
}; 

// .babelrc 文件
{
    "presets": [
        "@babel/preset-env",     // 此行为增加 ES6 的babel preset 配置
        "@babel/preset-react"    // 解析React JSX 增加 React 的babel preset 配置
    ],
    "plugins": [
        "@babel/proposal-class-properties"
    ]
}
```
### 解析 CSS Less Sass

css-loader ⽤于加载 .css 文件，并且转换成 commonjs 对象，style-loader 将样式通过 `<style>` 标签插⼊到 head 中。

``` js
rules: [
    {
        test: /\.css$/,
        // test: /\.less$/,    // 解析 less 时候匹配 
        use: [
            'style-loader',
            'css-loader',
            'less-loader'
        ]
    }
]
```
### 解析图片 字体

``` js
rules: [
    {
        test: /\.(png|jpg|jpeg|gif|svg｜woff|woff2|eot|ttf|otf)$/, 
        // use: [
        //     'file-loader'
        // ],
        use: [
            {
                loader: 'url-loader',   // url-loader 也可以处理图片和字体，可以设置较小资源为 base64 格式
                options: {
                    limit: 1024  // 单位字节 B，1KB = 1024B
                }
            }
        ]
    }
]
```
### 文件监听

文件监听是发现源码变化时，自动重新构建出新的输出⽂件。webpack 开启监听模式，有两种⽅式：
* package.json 文件的 script 中添加 "watch": "wabpack --watch"
* 在配置 webpack.config.js 中设置 watch: true

<h3>文件监听原理分析</h3>

轮询判断文件的最后编辑时间是否变化，某个文件发生了变化，并不会⽴刻告诉监听者，而是先缓存起来，等aggregateTimeout。
``` js
module.export = {
    // 默认false，也就是不开启
    watch: true,
    // 只有开启监听模式时，watchOptions才有意义
    wathcOptions: {
        // 默认为空，不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行，默认300ms
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
        poll: 1000
    }
}
```
**唯一缺陷：每次需要手动刷新浏览器器。当然，可以通过 webpack-dev-server 不刷新页面而自动构建。**

### 热更新 WDS

``` js
// package.json
"script" : {
    "dev": "webpack-dev-server --open"
}
```
* WDS 热更新 不刷新浏览器
* WDS 不输出文件，⽽是放在内存中使用 HotModuleReplacementPlugin 插件

### 热更新 WDM

WDM (webpack-dev-middleware) 将 webpack 输出的文件传输给服务器，适用于灵活的定制场景。

``` js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});
```
热更新的原理分析:
* Webpack Compile: 将 JS 编译成 Bundle
* HMR Server: 将热更新的文件输出给 HMR Rumtime
* Bundle server: 提供文件在浏览器的访问
* HMR Rumtime: 会被注入到浏览器，更新文件的变化
* bundle.js: 构建输出的⽂件

### 文件指纹

打包后输出的文件名的后缀（hash，默认是由 md5 生成）。

<h3>文件指纹如何生成？</h3>

* Hash：和整个项目的构建相关，只要项目文件有修改，整个项⽬构建的 hash 值就会更改；
* Chunkhash：和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值；
* Contenthash：根据文件内容来定义 hash ，文件内容不变，则 contenthash 不变；
  
<h3>文件指纹的设置：</h3>

``` js
// JS 的文件指纹设置 output 的 filename，使用 [chunkhash]
output: {
    filename: '[name][chunkhash:8].js',
    path: __dirname + '/dist'
}

// CSS的文件指纹设置 MiniCssExtractPlugin 的 filename，使用 [contenthash]
plugins: [
    new MiniCssExtractPlugin({
        filename: [name][contenthash:8].css
    });
]

// 图片的⽂件指纹设置 设置file-loader 的name，使用 [hash]
rules: [
    {
        test: /\.(png|jpg|jpeg|gig|svg).$/,
        use: {
            loader: "file-loader",
            options: {
                name: "img/[name][hash:8].[ext]"
            }
        }
    }
]
```
### JS 文件压缩

Webpack4 内置了 uglifyjs-webpack-plugin 插件。但是，我们可以根据官方提供的参数优化 JS 压缩。

``` js
optimization: {
    minimizer: [
        new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,  // 测试匹配文件
            include: /\/includes/,  // 包含哪些文件
            excluce: /\/excludes/,  // 不包含哪些文件

            // 允许过滤哪些块应该被 uglified（默认情况下，所有块都是 uglified）。 
            // 返回 true 以 uglify 块，否则返回 false。
            chunkFilter: (chunk) => {
                // `vendor` 模块不压缩
                if (chunk.name === 'vendor') {
                    return false;
                }
                    return true;
                }
        }),
    
        cache: true,   // 是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
        parallel: 4,  // 使用多进程并行运行来提高构建速度，强烈建议使用
        sourceMap: true  // 使用源映射将错误消息位置映射到模块（这会减慢编译速度）
    ]
}
```
### CSS⽂件压缩

使用 optimize-css-assets-webpack-plugin 同时使用 cssnano优化器。

``` js
plugins: [
    new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano')
    })
]
```
### Html 文件压缩

修改 html-webpack-plugin，设置压缩参数。

``` js
new HtmlWebpackPlugin({
    template: path.join(__dirname, 'src/search.html'),
    filename: 'search.html',+chunks: ['search'],
    inject: true,
    minify: {
        html5: true,
        removeComments: true,       // 移除HTML中的注释
        removeAttributeQuotes: true, //是否移除属性的引号 默认false
        collapseWhitespace: true,   // 删除空白符与换行符
        minifyCSS: true,            // 压缩内联css
        minifyJS: true,             // 是否压缩html里的js（使用uglify-js进行的压缩）
        removeEmptyAttributes: true, //是否删除空属性，默认false
    }
})
```

## 进阶一篇

### 构建的问题

每次构建的时候不会清理⽬录，造成构建的输出目录 output 文件越来越多。

常用解决方案无非以下两种：
* 通过 npm scripts 清理构建⽬录
  * rm -rf./dist && webpack
  * rimraf./dist && webpack
  
* ⾃动清理构建⽬录 clean-webpack-plugin 

``` js
plugins: [
    new CleanWebpackPlugin();   // 每次构建时候 默认会先删除 output 指定的输出目录
]
```
### autoprefixer

因为各大浏览器的标准不一致，导致 CSS3 新增属性要添加前缀才能解决 CSS 兼容性问题。

``` js
// 在自动化工具没出来之前，大家都是手动的添加 CSS 前缀 耗时有费力
.box {
    -moz-border-radius: 10px;    // 火狐浏览器
    -webkit-border-radius: 10px;    // chrome
    -o-border-radius: 10px;     // 欧朋浏览器
    border-radius: 10px;
}
```
现在 可以使用 PostCSS 插件 autoprefixer ⾃动补齐 CSS3 前缀。

``` js
rules: [
    {
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            'less-loader',
            {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [
                        require('autoprefixer')({
                            browsers: ["last 2 version", "> 1%",  "iOS 7"]
                        })
                    ]
                }
            }
        ]
    }
]
```
### CSS3 响应式布局

起初，我们都是通过 CSS 媒体查询实现响应式布局。缺陷：需要写多套适配样式代码。如下所示：

``` js
@media screen and (max-width: 980px) {
    .header {
        width: 900px;
    }
}
@media screen and (max-width: 480px) {
    .header {
        height: 400px;
    }
}
@media screen and (max-width: 350px) {
    .header {
        height: 300px;
    }
}
```
为了弥补 @media 的缺陷，rem 布局应运而生。

rem 和 px 的对⽐：
* rem 是相对单位，相对于跟元素 html
* px 是绝对单位 （如果css里面没有设定 html 的 font-size，则默认浏览器以 1rem = 16px 来换算）

但是，使用了 rem 布局之后，css 就需要 px 转为 rem 单位了。我们需要手动的把 px 转为 rem，无形之中影响了开发效率。
伟大的天朝人民从来不让人失望，px2rem-loader 的问世，解决了这个问题。它可以在⻚面渲染时计算根元素的 font-size 值。

``` js
rules: [
    {
        test: /\.less$/,   
        use: [
            'style-loader',
            'css-loader',
            'less-loader'
            {
                loader: "px2rem-loader",
                options: {
                    remUnit: 75,    // remUnit 为 1rem = 75px，
                    remPrecision: 8   // remPrecision 为转化后小数点后位数
                }
            }
        ]
    }
]
```
### 内联

``` html
raw-loader 内联html
<script>${require(' raw-loader!babel-loader!. /meta.html')}</script>

raw-loader 内联JS
<script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>
```
css 内联

* 借助 style-loader
* html-inline-css-webpack-plugin

``` js
{
    loader: 'style-loader',
    options: {
        insertAt: 'top', // 样式插入到<head>
        singleton: true, // 将所有的style标签合并成一个
    }
}
```
### 多页打包通用方案

思路：利用 glob.sync，动态获取 entry 和设置 html-webpack-plugin 数量。

``` js
'use strict';

const glob = require('glob');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];

            entry[pageName] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    inlineSource: '.css$',
                    template: path.join(__dirname, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['vendors', pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: false,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false
                    }
                })
            );
        });

    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    plugins: [].concat(htmlWebpackPlugins)
};
```
### 基础库分离 externals

* 如果我们想引用一个库，但是又不想让 webpack 打包，并且又不影响我们在项目中使用,可以配置 Externals 解决。
* 使用 html-webpack-externals-plugin
  
``` js
new HtmlWebpackExternalsPlugin({
    externals: [
        {
            module: 'react',
            entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
            global: 'React',
        },
        {
            module: 'react-dom',
            entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
            global: 'ReactDOM',
        }
    ]
})
```
### Code Splitting

对于⼤的Web应用来讲，将所有的代码都放在一个⽂件中显然是不够有效的，特别是当你的某些代码块是在某些特殊的时候才会被使⽤到。
webpack 的 code splitting 的功能就是将你的代码库分割成 chunks（语块），当代码运行到需要它们的时候再进⾏加载。

三种常见的代码分离方法：
* 入口起点：使用entry配置，手动的分离代码
* 防止重复：使用 SplitChunksPlugin 去重和分离 chunk
* [动态导入：通过模块的内联函数调用来分离代码](https://webpack.js.org/guides/code-splitting/#root)
  
如上所述，方法一存在缺陷：
* 如果输入块之间存在任何重复的模块，则它们将包含在两个包中。
* 它不够灵活，不能用于使用核心应用程序逻辑动态分割代码。
  
PS：为了解决上述缺陷，我么使用 SplitChunksPlugin 删除重复。

该插件在 Webpack4 已经内置，用来替代 CommonsChunkPlugin 插件。

chunks参数说明：
* async 异步引入的库进行分离(默认)
* initial 同步引⼊的库进行分离
* all 所有引⼊的库进行分离(推荐)

``` js
optimization: {
    splitChunks: {
        chunks: 'all', 
        minSize: 30000, // 表示在压缩前的最小模块大小，默认为30000
        minChunks: 1,   // 表示被引用次数，默认为1
        maxAsyncRequests: 5,   // 按需加载时候最大的并行请求数，默认为5
        maxInitialRequests: 3,  // 一个入口最大的并行请求数，默认为3
        automaticNameDelimiter: '~',   // 命名连接符
        name: true,     // 拆分出来块的名字，默认由块名和hash值自动生成
        cacheGroups: {} // 缓存组的属性 reuseExistingChunk 
                        // 如果当前代码块包含的模块已经有了，就不在产生一个新的代码块
    }
}
```
### Tree Shaking

App 往往有一个入口文件，相当于一棵树的主干，入口文件有很多依赖的模块，相当于树枝。实际情况中，虽然依赖了某个模块，
但其实只使用其中的某些功能。通过 Tree shaking，将没有使用的模块摇掉，这样来达到删除无用代码的目的。

> 这里单独提一下tree-shaking,是因为这里有个坑。tree-shaking的主要作用是用来清除代码中无用的部分。目前在webpack4 我们设置mode为production的时候已经自动开启了tree-shaking。但是要想使其生效，生成的代码必须是ES6模块。不能使用其它类型的模块如CommonJS之流。如果使用Babel的话，这里有一个小问题，因为Babel的预案（preset）默认会将任何模块类型都转译成CommonJS类型，这样会导致tree-shaking失效。修正这个问题也很简单，在.babelrc文件或在webpack.config.js文件中设置modules：false  就好了。

``` js
// .babelrc
{
    "presets": [
        ["@babel/preset-env",
            {
                "modules": false
            }
        ]
    ]
}
```
或者：

``` js
// webpack.config.js
module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', { modules: false }]
                }
            }，
            exclude: /(node_modules)/
        }
    ]
}
```

Tree-shaking 原理：

利⽤ ES6 模块的特点:
* 只能作为模块顶层的语句出现
* import 的模块名只能是字符串常量
* import binding 是 immutable的

注意：冗余代码是在 uglify 阶段删除的。

### 懒加载 JS

* CommonJS：require.ensure
* ES6 动态 import（⽬前还没有原生⽀持，需要babel转换，如下）

``` js
{
    "plugins": [
        "@babel/plugin-syntax-dynamic-import"
    ]
}
```
### Eslint

Eslint 帮助保持团队的代码⻛格统一。但是，不建议造轮子，可以直接引用 [腾讯团队 eslint 规范](https://github.com/AlloyTeam/eslint-config-alloy)。

<h3>方案一：本地开发阶段增加 precommit 钩⼦</h3>

``` js
// 安装 husky npm install husky --save-dev
// 增加 npm script，通过 lint-staged 增量检查修改的文件 

"scripts": {
    "precommit": "lint-staged"
},
"lint-staged": {
    "linters": {
        "*.{js,scss}": [
            "eslint --fix", 
            "git add"
        ]
    }
}
```
<h3>方案⼆：webpack 与 ESLint集成</h3>

``` js
rules: [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
            "babel-loader", // 用eslint-loader，构建时检查JS规范
            "eslint-loader"
        ]
    }
]
```
### 优化命令行的构建⽇志

使⽤ friendly-errors-webpack-plugin，stats 设置成errors-only。
* success: 构建成功的日志提示
* warning: 构建警告的⽇志提示
* error: 构建报错的日志提示（报错信息定位很准）

## 进阶二篇

### 速度分析

使用 speed-measure-webpack-plugin 可以看到每个 loader 和插件执行耗时，以有利于我们针对打包速度去做优化。

``` js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
 
const webpackConfig = smp.wrap({
    plugins: [
        new MyPlugin(),
        new MyOtherPlugin()
    ]
});
```
[具体优化方案请参考官方](https://github.com/stephencookdev/speed-measure-webpack-plugin)

### 分析体积

使用 webpack-bundle-analyzer 分析体积，达到针对性优化的目的(注意：`仅在开发环境使用`)。

可以具体分析哪些问题？

* 依赖的第三方模块文件大小
* 业务里面的组件代码大小

### 使用高版本 webpack 和 Node

因为高版本的 webpack 和 node 内部性能提升，对 webpack 的构建效率有很大提升。

### 多进程 HappyPack

原理:每次 webapck 解析一个模块，HappyPack 会将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间。

``` js
exports.plugins = [
    new HappyPack({
        id: 'jsx',
        threads: 4,
        loaders: [ 'babel-loader' ]
    }),
    
    new HappyPack({
        id: 'styles',
        threads: 2,
        loaders: [ 'style-loader', 'css-loader', 'less-loader' ]
    })
];
 
exports.module.rules = [
    {
        test: /\.js$/,
        use: 'happypack/loader?id=jsx'
    },
    
    {
        test: /\.less$/,
        use: 'happypack/loader?id=styles'
    }
]
```
### 多进程 thread-loader

原理：每次 webpack 解析一个模块，thread- loader 会将它及它的依赖分配给 worker 线程中。

``` js
rules: [
    {
        test: /\.js$/,
        include: path.resolve("src"),
        use: [
            {
                "thread-loader",
                options: {
                    workers: 3
                }
            },
            "babel-loader"
        ]
    }
]
```
### 多进程 并行压缩

方法一：uglifyjs-webpack-plugin 开启 parallel 参数。

``` js
optimization: {
    minimizer: [
        new UglifyJsPlugin({
            cache: true,      // 启用 缓存
            parallel: true,   // 启用 多进程并行运行。
            sourceMap: true   // 使用源映射将错误消息位置映射到模块。主要用来定位bug。
        })
    ]
}
```
方法二： terser-webpack-plugin 开启 parallel 参数。

``` js
optimization: {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            parallel: 4  // 平行4个进程
        })
    ]
}
```
### 抽离第三方模块

对于开发项目中不经常会变更的第三方模块。类似于我们的 elementUi、vue 全家桶等等。因为很少会变更，所以我们不希望这些依赖要被集成到每一次的构建逻辑中去。 这样做的好处是每次更改我本地代码的文件的时候，webpack 只需要打包我项目本身的文件代码，而不会再去编译第三方库。以后只要我们不升级第三方包，那么webpack 就不会对这些库去打包，这样可以快速的提高打包的速度。

使用 webpack 内置的 DllPlugin、DllReferencePlugin 进行抽离。在与 webpack 配置文件同级目录下新建 webpack.dll.config.js 代码如下：

``` js{7}
// webpack.dll.config.js
const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        vendor: ['vue', 'vuex', 'vue-router', 'element-ui']  // 想要打包的模块
    },
    output: {
        path: path.resolve(__dirname, 'static/js'), // 打包后文件输出的位置
        filename: '[name].dll.js',
        library: '[name]_library' 
        // 这里需要和 webpack.DllPlugin 中的 `name: '[name]_library',` 保持一致。
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '[name]-manifest.json'),
            name: '[name]_library', 
            context: __dirname
        })
    ]
};
```
在 package.json 中配置如下命令:

``` js
"dll": "webpack --config build/webpack.dll.config.js"
```

接下来在 webpack.config.js 中增加以下代码:

``` js
module.exports = {
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./vendor-manifest.json')
        }),
        new CopyWebpackPlugin([  // 拷贝生成的文件到dist目录 这样每次不必手动去cv
            { from: 'static', to:'static' }
        ])
    ]
};
```
执行:

``` js
npm run dll
```
生成了集合第三地方代码的 vendor.dll.js。但是，需要在 html 文件中手动引入这个js文件:

``` js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>老yuan</title>
    <script src="static/js/vendor.dll.js"></script>   // 手动引入这个js文件
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

如果我们没有更新第三方依赖包，就不必 npm run dll。直接执行 npm run dev、 npm run build 的时候打包速度明显有提升。
因为我们已经通过 dllPlugin 将第三方依赖包抽离出来了。

### 缓存

目的：提升二次构建速度。

缓存思路:
* babel-loader 开启缓存
* terser-webpack-plugin 开启缓存
* 使用 cache-loader 或者 hard-source-webpack-plugin

### 缩小构建目标

目的：尽可能的少构建模块。

比如 babel-loader 通过 exclude 不解析 node_modules。

### 减少文件搜索范围

alias：配置别名可以加快webpack查找模块的速度。

extension：指定 extension 之后可以不用在 require 或是 import 的时候加文件扩展名，会依次尝试添加扩展名进行匹配。

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
### 图片压缩

使用：image-webpack-loader。

优点：有很多定制选项，可以引入更多第三方优化插件，例如pngquant，可以处理多种图片格式。

``` js
rules: [{
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [
        'file-loader',
            {
            loader: 'image-webpack-loader',
            options: {
                mozjpeg: {
                    progressive: true,
                    quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                    enabled: false,
                },
                pngquant: {
                    quality: [0.65, 0.90],
                    speed: 4
                },
                gifsicle: {
                    interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                    quality: 75
                }
            }
        }
    ]
}]
```
## 提升体验

这里主要是介绍几款 webpack 插件来帮助大家提升构建体验，虽然说它们在提升构建效率上对你没有什么太大的帮助，但能让你在等待构建完成的过程中更加舒服。

### [progress-bar-webpack-plugin](https://www.npmjs.com/package/progress-bar-webpack-plugin)

``` js
npm i -D progress-bar-webpack-plugin

// webpack.prod.js
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
 
...
plugins: [
    new ProgressBarPlugin()
]
```

效果如下图所示：

![gFD34t.jpg](https://t1.picb.cc/uploads/2019/09/18/gFD34t.jpg)

### [webpack-build-notifier](https://www.npmjs.com/package/webpack-build-notifier)

这是一款在你构建完成时，能够像微信、Lark这样的APP弹出消息的方式，提示你构建已经完成了。也就是说，当你启动构建时，就可以隐藏控制台面板，专心去做其他事情啦，到“点”了自然会来叫你，它的效果就是下面这样，同时还有提示音噢～

``` js
npm install webpack-build-notifier -D

// webpack.prod.js
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
 
module.exports = {
    ... 
    plugins: [
        new WebpackBuildNotifierPlugin({
            title: '张芳朝 请注意 打包', // 提示信息
            logo: path.resolve('./static/test.jpg'), // 提示图片
            suppressSuccess: true
        })
    ]
}
```

效果如下图所示：

![gFDblJ.jpg](https://t1.picb.cc/uploads/2019/09/18/gFDblJ.jpg)

## 总结

革命尚未成功，同志仍需努力。
