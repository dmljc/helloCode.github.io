# Webpack

## Webpack 是什么？

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

![](https://t1.picb.cc/uploads/2019/09/09/gXSVgg.png)

<h3>基本的概念</h3>

<h3>mode 开发模式</h3>

webpack 提供 2种 mode 配置：开发模式（development）和生产模式（production）。

``` js
// webpack.production.config.js

module.exports = {
*  mode: 'production'
}
```

<h3>入口文件(entry)</h3>

入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

可以在 webpack 的配置文件中配置入口，配置节点为： `entry` , 当然可以配置一个入口，也可以配置多个。

<h3>输出(output)</h3>

output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。

``` js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};
```

<h3>loader</h3>

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

<h3>插件(plugins)</h3>

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

## CSS 相关处理

webpack 最出色的功能之一就是，除了 JavaScript，还可以通过 loader 引入任何其他类型的文件

### 加载 CSS

* 第一步： 安装 css 和 style 模块解析的依赖 `style-loader` 和 `css-loader` 

``` js
npm install --save-dev style-loader css-loader
```

* 第二步： 添加 css 解析的 loader

``` js
// webpack.config.js
......
module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']   // loader 从右往左依次执行
    }]
}
```

* `css-loader` ： 辅助解析 js 中的 `import './style.css'` 
* `style-loader` : 把 js 中引入的 css 内容 注入到 html 标签中，并添加 style 标签. 依赖 `css-loader` 

第三步： 编写 css 文件和修改 js 文件

在 src 目录中添加 `style.css` 文件

``` js
 webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
*   |- style.css
    |- index.js
  |- /node_modules
```

src/style.css

``` js
.hello {
    color: red;
}
```

修改 js 文件

``` js
  import _ from 'lodash';
* import './style.css';

function createDomElement() {
    let dom = document.createElement('div');
    dom.innerHTML = _.join(['欢迎', '来到', 'webpack'], '');
*   dom.className = 'hello';
    return dom;
}

document.body.appendChild(createDomElement());
```

### 加载 Sass

加载 Sass 文件 需要 `sass-loader、node-sass` 。

``` js
npm install sass-loader node-sass webpack --save-dev
```

``` js
// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"    // loader 执行顺序是从下往上依次执行
            }, {
                loader: "sass-loader"
            }]
        }]
    }
};
```

### CSS SourceMap

`css-loader` 和 `sass-loader` 都可以通过该 options 设置启用 sourcemap。

``` js
// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                    sourceMap: true
                }
            }, {
                loader: "sass-loader",
                options: {
                    sourceMap: true
                }
            }]
        }]
    }
};
```

### CSS3属性加前缀

[PostCSS](https://postcss.org/)是一个 CSS 的预处理工具，可以帮助我们：给 CSS3 的属性添加前缀，
解决CSS3属性浏览器的兼容性问题。


``` js
npm i postcss-loader autoprefixer -D
```

``` js
...
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',    // 表示下面的插件是对 postcss 使用的
                        sourceMap: true,
                        plugins: loader => [
                            require('autoprefixer')({
                                browsers: ['> 0.15% in CN']
                            }) // 添加前缀
                        ]
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }]
    }
};
```

注意：打包后的css文件内容应该是去除掉空格和换行符的，这里为了方便查看CSS3新属性添加前缀的需求而有所调整。

执行打包命令：

<!-- <img :src="$withBase('/webkit.jpg')"/> -->

![](https://t1.picb.cc/uploads/2019/09/09/gX0NAs.jpg)

### CSS 样式表抽离

样式表抽离成专门的单独文件并且设置版本号。

webpack4 开始使用： `mini-css-extract-plugin` 插件, 1-3 的版本可以用： `extract-text-webpack-plugin` 


与 `extract-text-webpack-plugin` 相比：

* 异步加载
* 没有重复的编译（性能）
* 更容易使用
* 特定于CSS


``` js
npm install --save-dev mini-css-extract-plugin
```

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
                MiniCssExtractPlugin.loader,  // 抽取了样式，就不能再用 `style-loader` 注入到 html 中了。
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

再次运行打包：

``` js{3}
                Asset       Size  Chunks             Chunk Names
            bundle.js   70.8 KiB       0  [emitted]  main
css/main.5d2df023.css   19 bytes       0  [emitted]  main   
// CSS被抽离到dist/css文件夹
```
### CSS 压缩

webpack5 貌似会内置 css 的压缩，webpack4 可以自己设置一个插件即可。

压缩 css 插件： `optimize-css-assets-webpack-plugin` 

``` js
npm install -D optimize-css-assets-webpack-plugin
```

``` js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'production',
    ...
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    }
};
```

再次运行打包

``` js{3}
               Asset       Size  Chunks                    Chunk Names
            bundle.js    534 KiB       0  [emitted]  [big]  main
css/main.cd13cb32.css   17 bytes       0  [emitted]         main    
// 相比没压缩之前的19b，压缩到了17b（因为我的style.css 文件属性较少，所以，压缩率不是很明显）。
```

### CSS、JS 文件哈希变化问题

`HtmlWebpackPlugin` 插件，可以把打包后的 CSS 或者 JS 文件引用直接注入到 HTML 模板中，这样就不用每次手动修改文件引用了。

``` js
npm install --save-dev html-webpack-plugin
```

``` js
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        })
    ]
};
```

再次运行打包，HtmlWebpackPlugin 插件，已经把打包后的 CSS 引用直接注入到 HTML 模板中。
但是，同一个css文件在执行多次打包之后，生成了多个不同hash值 但是内容一致的css文件。都是缓存在作怪，
接下来我们需要在打包之前，把dist目录清理下。接下来到 `clean-webpack-plugin` 表现的时候了！！！

## 清理 dist 目录

每次构建，我们的 `/dist` 文件夹都会保存生成的文件，然后就会非常杂乱。

通常，在每次构建前清理 `/dist` 文件夹，是比较推荐的做法

`clean-webpack-plugin` 是一个比较普及的管理插件，让我们安装和配置下。

``` js
npm install clean-webpack-plugin --save-dev
```

webpack.config.js

``` js
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new CleanWebpackPlugin()
    ]
    ...
};
```


现在执行 `npm run build` ，再检查 `/dist` 文件夹。如果一切顺利，你现在应该不会再看到旧的文件，只有构建后生成的文件！

::: warning 注意：
*由于最新版本变化@2.0.1*之前的写法已经不能使用： `const CleanWebpackPlugin = require('clean-webpack-plugin')` 。
参考如下格式： 
`const { CleanWebpackPlugin } = require('clean-webpack-plugin')` 
:::

## 图片与字体处理

在 css 文件或者 sass 文件中添加如下代码

``` js
.hello {
    color: red;
    transform:rotate(30deg);
    background: url(../static/webpack.jpg);
}
```

运行打包发现如下错误：

``` js
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type, 
currently no loaders are configured to process this file. 
```

解决方案： `file-loader` 处理文件的导入

``` js
npm install --save-dev file-loader
```

webpack.config.js

``` js
module.exports = {
    module: {
        rules: [
            {
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'img/[name].[ext]',  // 图片打包到dist/img/下
						}
					}
				]
			}	
        ]
    }
};
```

``` js
               Asset       Size  Chunks                    Chunk Names
css/main.4955d306.css  133 bytes       0  [emitted]         main
      img/webpack.jpg   11.7 KiB          [emitted]         
           index.html  359 bytes          [emitted]         
```

此时运行打包，发现 dist 目录多了一个img文件夹，里边有一张打包后的图片，另外报错不再出现。

那更进一步，图片如何进行优化呢？

`image-webpack-loader` 可以帮助我们对图片进行压缩和优化。

``` js
npm install image-webpack-loader --save-dev
```

使用：webpack.config.js

``` js

module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            // 压缩JPEG图像
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // 压缩PNG图像
                            optipng: {
                                enabled: false,
                            },
                            // 压缩PNG图像
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            // 压缩GIF图像
                            gifsicle: {
                                interlaced: false,
                            },
                            // 将JPG和PNG图像压缩为WEBP
                            webp: {
                                quality: 15
                            }
                        }
                    }
                ]
            }
        ]
    }
};
```

``` js
                               Asset       Size  Chunks                    Chunk Names
4b634b71580c9f3bb0127acf1250751a.jpg   3.07 KiB          [emitted]   
// 如果把 quality 设置为15的话，可以从 11.7kb 压缩到 3.07可kb，压缩的结果喜人。
// 但是，暂时不能把设置图片打包后的文件路径，只能打包到dist目录下。
```

此时在运行 npm run build，发现会 生成的图片的大小会被压缩很多。

### 更进一步处理图片成 base64

`url-loader` 功能类似于 file-loader，可以把 url 地址对应的文件，打包成 base64 的 DataURL，提高访问的效率。


``` js
npm install --save-dev url-loader
```

webpack.config.js

``` js
module.exports = {
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
            use: [{
                    loader: 'url-loader', // 根据图片大小，把图片优化成base64
                    options: {
                        limit: 10000   // 当文件小于10kb时候，转化为base64格式
                    }
                }
            ]
        }]
    }
};
```

### 字体的处理（同图片）

由于 css 中可能引用到自定义的字体，处理也是跟图片一致。

``` js
module.exports = {
    module: {
        rules: [{
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        }]
    }
};
```

* 当我执行完 `npm run build` 之后，发现控制台报了下图所示的黄色警告，：

<!-- <img :src="$withBase('/limit.jpg')"/> -->

![](https://t1.picb.cc/uploads/2019/09/09/gXjePa.jpg)

官网的解释是 [性能(performance)](https://webpack.docschina.org/configuration/performance/#src/components/Sidebar/Sidebar.jsx),
出于性能的考虑，webpack 限制了入口文件的大小。

解决方案如下：

``` js
module.exports = {
    //...
    performance: {
        hints: false,       // 1、关闭限制
        maxEntrypointSize: 4000000, // 2、对于所有资源，增加最大体积限制
        maxAssetSize: 1000000   // 3、对于单个资源，增加最大体积限制
    }
};
```

* 当我执行完 `npm run build` 之后，发现控制台报了下图所示的错误，：

<!-- <img :src="$withBase('/brower.jpg')"/> -->
<!-- 大图展示 -->
![](https://t1.picb.cc/uploads/2019/09/09/gXbFLR.jpg)

后来查到了原因：[原因是版本高了，引用有修改](https://github.com/ng-packagr/ng-packagr/issues/1310)。
把  `browers` 改为 `overrideBrowserslist` 即可。

## JS 相关处理

### JS  压缩

压缩需要一个插件： `uglifyjs-webpack-plugin` , 此插件需要一个前提就是： `mode: 'production'` .


``` js
npm i -D uglifyjs-webpack-plugin
```

``` js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    ...
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

``` js
                Asset       Size  Chunks             Chunk Names

js/bundle.9df11e3e.js    534 KiB       0  [emitted]  [big]  main

// 压缩后

js/bundle.e4f2fec1.js   70.4 KiB       0  [emitted]  main   
```


### JS 使用 source map

当 webpack 打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。例如，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。

使用 `inline-source-map` 选项，这有助于解释说明 js 原始出错的位置。（不要用于生产环境）：

webpack.config.js

``` js
module.exports = {
    ...
    devtool: 'inline-source-map'
};
```

![inline-source-map](http://i2.tiimg.com/698361/696d3406150c10e4.jpg)


### 监控文件变化，自动编译

每次修改完毕后，都手动编译异常痛苦。最简单解决的办法就是启动 `watch` 。

``` js
npx webpack --watch
```

当然可以添加到 npm 的 script 中

package.json

``` js
{
    ...
    "scripts": {
        "watch": "npx webpack --watch",
    }
  }
```

但是有个 bug，就是每次我们修改 js 或者 css 文件后，要看到修改后的 html 的变化，需要我自己重新刷新页面。

如何能不刷新页面，自动更新变化呢？

### webpack-dev-server 和 模块热替换

webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。


``` js
npm install --save-dev webpack-dev-server
```

webpack.config.js

``` js
module.exports = {
    ...
    devServer: {
        contentBase: './dist'
    }
};
```

启动此 webserver：

``` js
webpack-dev-server --open
```

当然，为了方便我们通常会添加到package.json 文件中

package.json

``` js
{
    ...
    "scripts": {
        "dev": "webpack-dev-server --open"
    }
  }
```

[官网其他配置](https://webpack.docschina.org/configuration/dev-server/)：

``` js
devServer: {
    clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
    hot: true, // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
    contentBase: path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
    compress: true, // 一切服务都启用gzip 压缩
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
    port: 8080, // 端口
    open: true, // 是否打开浏览器
    overlay: { // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
        warnings: true,
        errors: true
    },
    publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
    proxy: { // 设置代理
        "/api": { // 访问api开头的请求，会跳转到  下面的target配置
            target: "http://192.168.0.102:8080",
            pathRewrite: {
                "^/api": "/mockjsdata/5/api"
            }
        }
    },
    quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: { // 监视文件相关的控制选项
        poll: true, // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
        ignored: /node_modules/, // 忽略监控的文件夹，正则
        aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
    }
}
```

<h3>什么是模块热替换呢</h3>

 DevServer 还支持一种叫做模块热替换（ Hot Module Replacement ）的技术，可在不刷新整个网页的情况下做到超灵敏实时预览。原理是在一个源码发生变化时，只需重新编译发生变化的模块，再用新输出的模块替换掉浏览器中对应的老模块 。模块热替换技术在很大程度上提升了开发效率和体验 。 

webpack.config.js

``` js
const webpack = require('webpack');

module.exports = {
    ...
    devServer: {
        contentBase: './dist',
        hot: true   // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
    },
    plugins: [
        new webpack.NamedModulesPlugin(),  // 更容易查看(patch)的依赖
        new webpack.HotModuleReplacementPlugin()  // 替换插件
    ]
};
```

### JS启用babel转码

虽然现代的浏览器已经兼容了96%以上的ES6的语法了，但是为了兼容老式的浏览器（IE8、9）我们需要把最新的ES6的语法转成ES5的。那么 `babel` 的loader就出场了。


``` js
npm i -D babel-loader babel-core babel-preset-env
```

在webpack的配置文件中，添加js的处理模块。

``` js
module: {
    rules: [{
        test: /\.js$/,
        include: /src/,          // 只转化src目录下的js
        exclude: /(node_modules)/, // 加快编译速度，不包含node_modules文件夹内容
        use: {
            loader: 'babel-loader'
        }
    }]
}
```

然后，在项目根目录下，添加babel的配置文件 `.babelrc` .

`.babelrc` 文件如下：

``` json
{
  "presets": ["env"]
}
```

最后，在入口js文件同目录添加babel.js 文件，添加ES6的❤新语法：

``` js
let b = [1, 2, 3].map((n) => n + 1);

export default b;
```

记得：在index.js 文件中引用babel.js文件


最终打包后的js代码：

``` js
[1, 2, 3].map(function (n) {
    return n + 1
})
```

### Babel优化

babel-loader可以配置如下几个options：

* `cacheDirectory` ：默认值为 false。当有设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)。如果设置了一个空值 (loader: 'babel-loader?cacheDirectory') 或者 true (loader: babel-loader?cacheDirectory=true)，loader 将使用默认的缓存目录 node_modules/.cache/babel-loader，如果在任何根目录下都没有找到 node_modules 目录，将会降级回退到操作系统默认的临时文件目录。

* `cacheIdentifier` ：默认是一个由 babel-core 版本号，babel-loader 版本号，.babelrc 文件内容（存在的情况下），环境变量 BABEL_ENV 的值（没有时降级到 NODE_ENV）组成的字符串。可以设置为一个自定义的值，在 identifier 改变后，强制缓存失效。

* `forceEnv` ：默认将解析 BABEL_ENV 然后是 NODE_ENV。允许你在 loader 级别上覆盖 BABEL_ENV/NODE_ENV。对有不同 babel 配置的，客户端和服务端同构应用非常有用。

> 注意：sourceMap 选项是被忽略的。当 webpack 配置了 sourceMap 时（通过 devtool 配置选项），将会自动生成 sourceMap。

babel 在每个文件都插入了辅助代码，使代码体积过大.babel 对一些公共方法使用了非常小的辅助代码，比如 _extend。 默认情况下会被添加到每一个需要它的文件中。你可以引入 `babel runtime` 作为一个独立模块，来避免重复引入。

安装：

``` js
npm install @babel/plugin-transform-runtime --save-dev
npm install @babel/runtime --save
npm install --save-dev @babel/plugin-proposal-class-properties // class 类的属性
```

配置：

webpack.config.js

``` js
rules: [
    // 'transform-runtime' 插件告诉 babel 要引用 runtime 来代替注入。
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
        }
    }
]
```

修改 `.babelrc` 

``` json
{
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties"]
}
```


babel 最新版本 打包遇到的问题，因为 babel 最新版本问题导致。

![Markdown](http://i2.tiimg.com/698361/8d830ce9f1176618.jpg)


解决方案是删除 node_modules 重新安装

``` js
rm -rf node_modules
npm i
```



此时，webpack打包的时候，会自动优化重复引入公共方法的问题。

### ESLint校验代码格式规范

安装

``` js
npm install eslint --save-dev
npm install eslint-loader --save-dev

// 以下是用到的额外的需要安装的eslint的解释器、校验规则等
npm i -D babel-eslint standard
```

使用

``` js
// webpack.config.js
module.exports = {
    // ...
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
            options: {
                // eslint options (if necessary)
                fix: true
            }
        }, ],
    },
    // ...
}
```

eslint配置可以直接放到webpack的配置文件中，也可以直接放到项目根目录的 `.eslintrc` 中[文档](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)。

``` js
// .eslintrc.js
// https://eslint.org/docs/user-guide/configuring
module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true
    },
    extends: [
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    globals: {
        NODE_ENV: false
    },
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 添加，分号必须
        semi: ['error', 'always'],
        'no-unexpected-multiline': 'off',
        'space-before-function-paren': ['error', 'never'],
        // 'quotes': ["error", "double", { "avoidEscape": true }]
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true
            }
        ],
        "indent": ["error", 4]  // 缩进为4个空格
    }
};
```

此时eslint的配置就结束了。


## 合并两个webpack的js配置文件

开发环境(development)和生产环境(production)配置文件有很多不同点，但是也有一部分是相同的配置内容，如果在两个配置文件中都添加相同的配置节点，
就非常不爽。

`webpack-merge` 的工具可以实现两个配置文件进合并，这样我们就可以把 开发环境和生产环境的公共配置抽取到一个公共的配置文件中。


``` js
npm install --save-dev webpack-merge
```


project

``` js
  webpack-demo
  |- package.json

* |- webpack.common.js
* |- webpack.dev.js
* |- webpack.prod.js

  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

webpack.common.js

``` js

* const path = require('path');
* const CleanWebpackPlugin = require('clean-webpack-plugin');
* const HtmlWebpackPlugin = require('html-webpack-plugin');

+

* module.exports = {
*   entry: {
*     app: './src/index.js'
*   },
*   plugins: [
*     new CleanWebpackPlugin(['dist']),
*     new HtmlWebpackPlugin({
*       title: 'Production'
*     })
*   ],
*   output: {
*     filename: '[name].bundle.js',
*     path: path.resolve(__dirname, 'dist')
*   }
* };

```

webpack.dev.js

``` js

* const merge = require('webpack-merge');
* const common = require('./webpack.common.js');

+

* module.exports = merge(common, {
*   devtool: 'inline-source-map',
*   devServer: {
*     contentBase: './dist'
*   }
* });

```

webpack.prod.js

``` js

* const merge = require('webpack-merge');
* const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
* const common = require('./webpack.common.js');

+

* module.exports = merge(common, {
*   plugins: [
*     new UglifyJSPlugin()
*   ]
* });

```

## module.noParse 

noParse 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析和处理，这样做的好处是能提高构建性能。 原因是一些库例如 jQuery 、ChartJS 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。

``` js
module: {
    // 不去解析jquery的依赖关系
    noParse: /jquery/
}
```

## 解析(resolve)

配置模块如何解析。比如： `import _ from 'lodash'` , 其实是加载解析了lodash.js文件。此配置就是设置加载和解析的方式。

* `resolve.alias` 

创建 import 或 require 的别名，来确保模块引入变得更简单。例如，一些位于 src/ 文件夹下的常用模块：
**配置别名可以加快webpack查找模块的速度。**

``` js
// webpack.config.js
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, './dist')
    },

  * resolve: {
  *     alias: {
  *         vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
  *        '@': path.resolve(__dirname, 'src/')
  *     }
  * }

  ...
}

// index.js
// 在我们的index.js文件中，就可以直接import
import vue from 'vue';
// 等价于
import vue from  'src/lib/vue/dist/vue.esm.js';

```

* `resolve.extensions` 的应用

自动解析确定的扩展。

``` js
// webpack.config.js
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        alias: {
          vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
          '@': path.resolve(__dirname, 'src/')
        },

    *   extensions: [".js", ".vue",".json"]   // 默认值: [".js",".json"] 
                // extensions => import 导入文件时候可以省略掉文件后缀

    }
    ...
}
```

> 给定对象的键后的末尾添加 $，以表示精准匹配

## 外部扩展(externals)

> 作用：只引入外部拓展的第三方库，而不打包，从而优化打包速率！！！！！

例如，从 CDN 引入 jQuery，而不是把它打包：

index.html

``` html
<script src="https://code.jquery.com/jquery-3.1.0.js" integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk=" crossorigin="anonymous"></script>       
```

webpack.config.js

``` js{15-17}
// webpack.config.js
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.[hash].js',
        path: path.resolve(__dirname, './dist')
    },
    alias: {
        extensions: [".js", ".vue",".json"]   // 默认值: [".js",".json"]
        vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
        '@': path.resolve(__dirname, 'src/')
    },

  * externals: {
  *     jquery: 'jQuery'  // 仅在项目中使用，不打包此外部拓展
  * },

    ...
}
```

## Code Splitting

code splitting 是webpack打包时用到的重要的优化特性之一、此特性能够把代码分离到不同的bundle中，然后可以按需加载或者并行加载这些文件，代码分离可以用于获取更小的bundle，以及控制资源加载优先级，如果能够合理的使用能够极大影响加载时间。

三种常见的代码分离方法

* 入口起点：使用entry配置，手动的分离代码
* 防止重复：使用 SplitChunksPlugin 去重和分离 chunk
* [动态导入：通过模块的内联函数调用来分离代码](https://webpack.js.org/guides/code-splitting/#root)
  

入口点：

这是迄今为止最简单，最直观的分割代码的方法。但是，它更加手动，并且有一些陷阱我们将会讨论。我们来看看如何从主包中拆分另一个模块：

``` js
webpack-demo
|- package.json
|- webpack.config.js
|- /dist
|- /src
  |- index.js
+ |- babel.js
|- /node_modules
```

webpack.common.js
``` js
module.exports = {
    ...
    entry: {
        index: './src/index.js',
    +   babel: './src/babel.js' // 手动的分离代码
    }
}
```

这将产生以下构建结果：
``` js
                          Asset       Size  Chunks             Chunk Names
         css/index.b84b4b2d.css  139 bytes    1, 0  [emitted]  index
                     index.html  436 bytes          [emitted]  
    js/babel.bundle.b84b4b2d.js   1.03 KiB       0  [emitted]  babel
js/babel.bundle.b84b4b2d.js.map    1.8 KiB       0  [emitted]  babel
    js/index.bundle.b84b4b2d.js   1.39 KiB    1, 0  [emitted]  index
js/index.bundle.b84b4b2d.js.map   5.76 KiB    1, 0  [emitted]  index
```

如上所述，这种方法存在一些缺陷：

* 如果输入块之间存在任何重复的模块，则它们将包含在两个包中。 (使用SplitChunksPlugin，删除重复)
* 它不够灵活，不能用于使用核心应用程序逻辑动态分割代码。

### 防止重复

SplitChunksPlugin 允许我们共同的依赖提取到一个现有的条目块或一个全新的块。

webpack.common.js
``` js
module.exports = {
    ...
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}

// 注意： 要把生产环境配置的 externals 去掉， 因为不去掉的话，不会打包 loadsh
// externals: {
//     lodash: {
//         commonjs: 'lodash',
//         amd: 'lodash',
//         root: '_' // 指向全局变量
//     }
// }
```

有了optimization.splitChunks配置选项，我们现在应该看到从我们的index.bundle.js和中删除了重复的依赖项babel.bundle.js。该插件应该注意到我们已经分离lodash出一个单独的块并从我们的主包中移除了自重。我们npm run build来看看它是否有效：

``` js{9}
                                        Asset       Size  Chunks             Chunk Names
                       css/index.a0702ea1.css  139 bytes    2, 1  [emitted]  index
                                   index.html  520 bytes          [emitted]  
                  js/babel.bundle.a0702ea1.js   1.69 KiB       1  [emitted]  babel
              js/babel.bundle.a0702ea1.js.map   8.51 KiB       1  [emitted]  babel
                  js/index.bundle.a0702ea1.js   2.01 KiB    2, 1  [emitted]  index
              js/index.bundle.a0702ea1.js.map   9.42 KiB    2, 1  [emitted]  index
    js/vendors~babel~index.bundle.a0702ea1.js   69.4 KiB       0  [emitted]  vendors~babel~index
js/vendors~babel~index.bundle.a0702ea1.js.map    672 KiB       0  [emitted]  vendors~babel~index
```

## Tree Shaking

### JS Tree Shaking

App往往有一个入口文件，相当于一棵树的主干，入口文件有很多依赖的模块，相当于树枝。实际情况中，虽然依赖了某个模块，但其实只使用其中的某些功能。通过Tree shaking，将没有使用的模块摇掉，这样来达到删除无用代码的目的。

webpack.common.js
``` js
module.exports = {
    ...
    // 注意：把代码分离的逻辑去掉
    // splitChunks: {
    //     chunks: 'all'
    // },
    // 开启 tree shaking
    optimization: {
        usedExports: true
    }
}
```

现在让我们把babel.js 中 loadsh 的使用注释掉。这样 第一行代码就成了无用的代码，就会被 tree shaking 移除掉。

``` js
import _ from 'lodash';

// console.log(_.join(['Another', 'module', 'loaded!'], ' '));

const b = [1, 2, 3].map((n) => n + 1);

export default b;
```
执行打包命令之后：

``` js{6,14}
// before
                          Asset       Size  Chunks             Chunk Names
         css/index.597c257a.css  139 bytes       0  [emitted]  index
                     index.html  366 bytes          [emitted]  
    js/index.bundle.597c257a.js   70.7 KiB       0  [emitted]  index
js/index.bundle.597c257a.js.map    132 KiB       0  [emitted]  index

// after
                          Asset       Size  Chunks             Chunk Names
         css/index.55c34997.css  139 bytes       0  [emitted]  index
                     index.html  366 bytes          [emitted]  
    js/index.bundle.55c34997.js   70.6 KiB       0  [emitted]  index
js/index.bundle.55c34997.js.map    678 KiB       0  [emitted]  index
```
对比 之前的 70.7 KiB 移除无用的代码之后减少为 70.6 KiB。因为就一行无用的代码，所以，打包后的 size 不是很明显。
但是，至少说明了 tree shaking 是 成功的。

### CSS Tree Shaking

``` js
npm i glob-all purify-css purifycss-webpack --save-dev
 
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
...
plugins:[
    // 清除无用 css
    new PurifyCSS({
        paths: glob.sync([
            // 要做 CSS Tree Shaking 的路径文件
            path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
            path.resolve(__dirname, './src/*.js')
        ])
    })
]
```

为了验证 css tree shaking 是否能删除无用的 css 我们在 style.css 文件中添加了 .tree .shaking 两个多余的样式。
然后，对比 css 打包前后的 size 大小。

``` js{3,10}
// before
                          Asset       Size  Chunks             Chunk Names
         css/index.c79df2c9.css  252 bytes       0  [emitted]  index
                     index.html  366 bytes          [emitted]  
    js/index.bundle.c79df2c9.js   70.6 KiB       0  [emitted]  index
js/index.bundle.c79df2c9.js.map    132 KiB       0  [emitted]  index

// after
                          Asset       Size  Chunks             Chunk Names
         css/index.7392300a.css  139 bytes       0  [emitted]  index
                     index.html  366 bytes          [emitted]  
    js/index.bundle.7392300a.js   70.7 KiB       0  [emitted]  index
js/index.bundle.7392300a.js.map    132 KiB       0  [emitted]  index
```
从上图 3，10 两行代码可以明显的看到。打包之前 css 文件的 size 为 252 bytes，打包之后的 size 为139 bytes。
从而可以证实，css tree shaking 是可以实现 剔除无用代码的，并且效果很明显。

## DefinePlugin 定义环境变量

``` js
import webpack from 'webpack';

// 如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH = process.env.ASSET_PATH || '/';

export default {
    ...
    output: {
        publicPath: ASSET_PATH
    },
    plugins: [
        // 该插件帮助我们安心地使用环境变量
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
        })
    ]
};
```

## 打包分析优化

`webpack-bundle-analyzer` 插件可以帮助我们分析打包后的图形化的报表 (注意：`仅仅在开发环境使用`)。


``` js
npm install --save-dev webpack-bundle-analyzer
```

``` js
* const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    ...
    plugins: [
*     new BundleAnalyzerPlugin()
    ]
}
```

执行 `npm run build` 后生成分析报告，自动生成一个网页报表，如下所示：

![img](https://haitao.nos.netease.com/a3e45e1b-3ea0-46d9-9132-22ffd4dbbc91_908_547.gif)

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

### [webpack-dashboard](https://www.npmjs.com/package/webpack-dashboard)

当然，如果你对 webpack 原始的构建输出不满意的话，也可以使用这样一款 Plugin 来优化你的输出界面。

``` js
npm install webpack-dashboard -D

// webpack.prod.js
// 导入dashboard和其对应的插件，并创建一个dashboard的实例：
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

...
new DashboardPlugin(dashboard.setData)

"scripts": {
  "dev": "webpack-dev-server --quiet"
}
```
效果请看下图：

![gFDXAa.jpg](https://t1.picb.cc/uploads/2019/09/18/gFDXAa.jpg)

**注意：上图是 npm run dev 时候的效果。**

## 完整 webpack 配置

webpack.common.js
``` js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 打包生成的css直接注入到html文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离css
const autoprefixer = require('autoprefixer'); // css3 属性添加前缀
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); // 清理dist目录
const PurifyCSS = require('purifycss-webpack'); // css tree shaking
const glob = require('glob-all'); // css tree shaking

module.exports = {
    entry: {
        index: './src/index.js',
        babel: './src/babel.js' // 手动的分离代码
    },
    output: {
        filename: 'js/[name].bundle.[hash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: loader => [autoprefixer({
                            // browsers: ['> 0.15% in CN']
                            overrideBrowserslist: ['> 0.15% in CN']
                        })]
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 默认值： 'index.html'
            template: path.resolve(__dirname, 'src/index.html'),
            minify: {
                collapseWhitespace: true, // 删除空白符和换行符
                removeComments: true, // 移除注释
                removeAttributeQuotes: true // 移除属性的引号
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css', // 设置最终输出到dist/css文件夹
            chunkFilename: '[id].[hash:8].css'
        }),
        // 清除无用 css
        new PurifyCSS({
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
                path.resolve(__dirname, './src/*.js')
            ])
        })
    ],
    // 性能
    performance: {
        hints: false
    },
    optimization: {
        // 代码分割
        splitChunks: {
            chunks: 'all'
        },
        // tree shaking
        usedExports: true
    }
};
```

webpack.dev.js
``` js
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 1234,
        contentBase: './dist',
        hot: true // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
    },
    module: {
        noParse: /jquery/, // 不去解析jquery的依赖关系
        rules: [
            {
                enforce: 'pre', // 前置，先执行eslint-loader，在执行babel-loader
                test: /\.js$/,
                include: /src/, // 只转化src目录下的js
                exclude: /node_modules/, // 加快编译速度，不包含node_modules文件夹内容
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg|ico|woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'image-webpack-loader', // 图片优化
                        options: {
                            // 将JPG和PNG图像压缩为WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                    {
                        loader: 'url-loader', // 根据图片大小，把图片优化成base64
                        options: {
                            limit: 1000 // 当文件小于10kb时候，转化为base64格式
                        }
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]' // 图片打包到dist/img/下
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(), // 更容易查看(patch)的依赖
        new webpack.HotModuleReplacementPlugin() // 热替换插件
    ]
});
```

webpack.prod.js
``` js
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 压缩js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 在终端显示构建进度
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 打包成功之后右上角信息提示
// 以下三行是 npm run dev 控制台显示优化
// const Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const dashboard = new Dashboard();

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.(png|svg|jpg|gif|jpeg)$/,
            use: [{
                loader: 'image-webpack-loader', // 图片优化
                options: {
                    // 将JPG和PNG图像压缩为WEBP
                    webp: {
                        quality: 75
                    }
                }
            },
            {
                loader: 'url-loader', // 根据图片大小，把图片优化成base64
                options: {
                    limit: 1000 // 当文件小于10kb时候，转化为base64格式
                }
            },
            {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]' // 图片打包到dist/img/下
                }
            }
            ]
        }]
    },
    plugins: [
        new BundleAnalyzerPlugin(), // 分析打包后的图形化的报表
        // 在终端显示构建进度
        new ProgressBarPlugin(),
        // 打包成功之后右上角信息提示
        new WebpackBuildNotifierPlugin({
            title: '张芳朝 请注意 打包',
            logo: path.resolve('./static/test.jpg'),
            suppressSuccess: true
        })
        // npm run dev 控制台显示优化 package.json 文件script要配置  "dev": "xxxxxx --quiet"
        // new DashboardPlugin(dashboard.setData)
    ],
    // externals: {
    //     lodash: {
    //         commonjs: 'lodash',
    //         amd: 'lodash',
    //         root: '_' // 指向全局变量
    //     }
    // },
    // 优化
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
            new UglifyJsPlugin({
                cache: true, // 启用 缓存
                parallel: true, // 启用 多进程并行运行。
                sourceMap: true // 使用源映射将错误消息位置映射到模块。主要用来定位bug。
            })
        ]
    }
});
```
## 总结

本次 webpack 配置的demo已经上传到 [github](https://github.com/dmljc/webpack-demo) 感兴趣的可以看下。部分配置可能相对于上诉文档有微小调整，请知悉。
