# Node模块

## 介绍

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

> I / O (即是 Input / Output) 指的是系统对磁盘的读写操作。

## HTTP URL

<h3>创建服务器</h3>

接下来我们使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据。

``` js
const http = require('http');

const server = http.createServer((req, res) => {

    // 设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf8
    res.writeHead(200, {
        'Content-Type': 'text/html, charset=utf-8'
    });

    // end() 方法使 Web 服务器停止处理脚本并返回当前结果
    res.end('zfc');
});

server.listen(8989);
```

<h3>获取 get 请求参数</h3>

``` js
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url); // 解析 URL 
    const query = urlObj.query;
    const queryObj = querystring.parse(query);
    const jsonQuery = JSON.stringify(queryObj);

    res.end(jsonQuery);
});

server.listen(8989);

// {"name": "zfc", "age": 18}
```

url.parse() 解析 URL

url.format(urlObject) 是上面 url.parse() 操作的逆向操作

url.resolve(from, to) 添加或者替换地址

<h3>获取 post 请求参数</h3>

``` js
const server = http.createServer((req, res) => {
    const body = ''; // 创建空字符叠加数据片段

    req.on('data', (chunk) => { // 注册 data 事件接收数据
        body += thunk; // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
    });

    req.on('end', () => {
        data = decodeURI(data); // url会对中文进行编码
        const dataObject = querystring.parse(data); // 使用 querystring 对 url 进行反序列化（拆分成键值对）
        res.end(body);
    });

    res.writeHead(200, {
        'Content-Type': 'text/html, charset=utf-8'
    });
});

server.listen(8989);

// name=zfc&age=18
```

## nodemon

Nodejs 自启动工具 nodemon。nodemon 会不停的 watch 你应用下面的所有文件，发现有文件被修改，就重新载入程序文件这样就实现了部署，修
改了程序文件后马上就能看到变更后的结果。麻麻再也不用担心我的重启 nodejs 了!  [安装](https://github.com/remy/nodemon)

``` js
// 安装
npm install - g nodemon

// 启动node服务， 相当于node server.js
nodemon server.js
```

## CommonJs

CommonJs 规范的提出，主要是为了弥补当前 JavaScript 没有标准的缺陷。CommonJS 就是模块化的标准，nodejs 就是 CommonJS(模块化)的实现。

在 Node 中，模块分为两类: 一类是 Node 提供的模块，称为核心模块；另一类是用户编写的模块，称为文件模块。

* 核心模块部分在 Node 源代码的编译过程中，编译进了二进制执行文件。在 Node 进 程启动时，部分核心模块就被直接加载进内存中，所以这部分核心模块引入时，文件定位和 编译执行这两个步骤可以省略掉，并且在路径分析中优先判断，所以它的加载速度是最快的。 如: HTTP 模块 、URL 模块、FS 模块都是 nodejs 内置的核心模块，可以直接引入使用。

* 文件模块则是在运行时动态加载，需要完整的路径分析、文件定位、编译执行过程、 速度相比核心模块稍微慢一些，但是用的非常多。这些模块需要我们自己定义。接下来我 们看一下 nodejs 中的自定义模块。

CommonJS(Nodejs)中自定义模块的规定:

* 我们可以把公共的功能抽离成为一个单独的 js 文件作为一个模块，默认情况下面这 个模块里面的方法或者属性，外面是没法访问的。如果要让外部可以访问模块里面的方法或 者属性，就必须在模块里面通过 exports 或者 module.exports 暴露属性或者方法。
  
  exports = module.exports = {}; 他们之间的关系如下图，都指向一块{}内存区域。

![exports](https://user-gold-cdn.xitu.io/2017/7/31/6227d4e0917f4af649d9f9e750eddb09?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

* 在需要使用这些模块的文件中，通过 require 的方式引入这个模块。这个时候就可以 使用模块里面暴露的属性和方法。
  
``` js
// 定义一个 tools.js 的模块 
const tools = {
    sayHello() {
        return 'hello NodeJS';
    },
    add(x, y) {
        return x + y;
    }
};

// exports 可以有多个，暴露的是对象里的属性和方法
exports.sayHello = tools.sayHello;
exports.add = tools.add;

// module.exports 只能有一个，暴露的是对象
// module.exports = tools; 

// 引入自定义的 tools.js 模块
const tools = require('./tools');
tools.sayHello(); //使用模块
```

## FS

<h3>1、fs.stat 检测是文件还是目录</h3>

``` js
// 异步检测
fs.stat('./index.js', (err, stats) => {
    // 回调有两个参数 (err, stats)，其中 stats 是一个 fs.stats 对象。
    if (err) throw err;

    console.log( `文件: ${stats.isFile()}` ); // 文件: true
    console.log( `目录: ${stats.isDirectory()}` ); // 目录: false
});

// 同步检测
try {
    const stat = fs.statSync('./async.mkdir/index.txt');
    console.log('stat.size:', stat.size);
} catch (error) {
    throw error;
}
```

异步方法的错误是在回调函数中捕获，同步方法的错误则是在 try catch 中捕获。以下会省略同步方法的异常捕获。

<h3>2.fs.mkdir 创建目录</h3>

``` js
// 异步创建
fs.mkdir('./mkdir', (err) => {
    if (err) throw err;

    console.log('目录 async.mkdir 异步创建成功');
});

// 同步创建
fs.mkdirSync('./sync.mkdir');
console.log('同步创建目录成功');
```

<h3>3.fs.writeFile 创建写入文件</h3>

``` js
fs.writeFile('./mkdir/index.txt', 'hello world！', 'utf8', (err) => {
    if (err) throw err;

    console.log('文件异步写入成功');
});

// 同步
fs.writeFileSync('./sync.mkdir/index.txt', '你好世界！', 'utf8');
console.log('文件同步创建成功');
```

<h3>4.fs.appendFile 追加文件</h3>

``` js
fs.appendFile('./async.mkdir/index.txt', 'fs.appendFile 追加文件 \n', 'utf8', (err) => {
    if (err) throw err;

    console.log('文件异步追加成功');
});

// 同步追加文件
fs.appendFileSync('./sync.mkdir/index.txt', '同步追加文件 \n', 'utf8');
console.log('文件同步追加成功');
```

<h3>5.fs.readFile 异步读取文件</h3>

``` js
fs.readFile('./sync.mkdir/index.txt', (err, data) => {
    if (err) throw err;

    console.log('data:', data.toString());
});

// 同步读取文件
const data = fs.readFileSync('./sync.mkdir/index.txt', 'utf8');
console.log('data:', data);
```

<h3>6.fs.readdir 读取目录</h3>

``` js
fs.readdir('./async.mkdir/index.txt', (files, err) => {
    if (err) throw err;

    console.log('files:', files);
});

// 同步读取文件目录
const files = fs.readdirSync('./');
console.log('files:', files);
```

<h3>7.fs.rename 重命名</h3>

``` js
fs.rename('./async.mkdir/new.txt', './async.mkdir/index.txt', (err) => {
    if (err) throw err;

    console.log('rename success');
});

// 同步重命名
fs.renameSync('./sync.mkdir/rename1.txt', './sync.mkdir/rename.txt');
console.log('同步命名成功');
```
<h3>8. fs.rmdir 删除目录</h3>

``` js
fs.rmdir('../index', (err) => {
    if (err) throw err;

    console.log('目录删除成功');
});

// 同步删除目录
fs.rmdirSync('../index/');
console.log('同步删除成功');
```
<h3>9. fs.unlink 删除文件</h3>

``` js
fs.unlink('./../index.js', (err) => {
    if (err) throw err;

    console.log('删除成功');
});

// 同步删除文件
fs.unlinkSync('./../index.html');
console.log('同步删除成功');
```
<h3>10. fs.createReadStream 从文件流中读取数据（适合读取大文件）</h3>

``` js
const readStream = fs.createReadStream('./async.mkdir/index.txt');

readStream
    .on('data', (thunk) => {
        console.log('data', thunk);
    })
    .on('error', (err) => {
        console.log('err:', err);
    })
    .on('end', (err) => {
        console.log('end:', 'end 没有数据了');
    })
    .on('close', () => {
        console.log('close: 已经关闭了');
    });
```

<h3>11. fs.createWriteStream 写入文件</h3>

``` js
const data = '我是要写入的数据';
const writeStream = fs.createWriteStream('data.txt', 'utf8');

writeStream
    .on('finish', () => {
        console.log('写入完成 finish');
    })
    .on('close', () => {
        console.log('写入成功 close');
    })
    .on('error', () => {
        console.log('error', error);
    })

writeStream.write(data, 'utf8');
writeStream.end('');
    console.log('程序执行完毕');
```
<h3>12. 管道流</h3>

管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另一个流中。
![](http://images2.10qianwan.com/10qianwan/20180607/b_0_201806071425418178.jpg)

如上面的图片所示，我们把文件比作装水的桶，而水就是文件里的内容 ，我们用一根管子 (pipe) 连接两个桶使得水从一个桶流入另一个桶，
这样就慢慢的实现了大文件的复制过程。

以下实例我们通过读取一个文件内容并将内容写入到另外一个文件中

``` js
// 创建可读流
const readStream = fs.createReadStream('./input.txt');

// 创建可写流
const writeStream = fs.createWriteStream('./output.txt');

// 管道读写操作：读取 input.txt 文件里的内容，并将内容写入到 output.txt 文件中

readStream.pipe(writeStream);
```




## Buffer

Buffer (缓冲区) 是 node 的核心模块，可以用它来处理二进制数据，比如文件流的读写、网络请求数据的处理等。
Buffer 的 API 非常多，本文仅挑选 比较常用/容易理解 的API进行讲解，
包括Buffer实例的创建、比较、连接、拷贝、查找、遍历、类型转换、截取、编码转换等。

<h3>创建</h3>

在 6.0.0 之前的 Node.js 版本中， Buffer 实例是使用 Buffer 构造函数创建的，该函数根据提供的参数以不同方式分配返回 Buffer。
但是，从 Node.js 8.0.0 开始 Buffer 的创建开始摒弃构造函数创建，原因是：

在 Node.js 8.0.0 之前，为此类 Buffer 实例分配的内存是未初始化的，并且可能包含敏感数据。
由于 new Buffer() 的行为因第一个参数的类型而异，因此当未执行参数验证或 Buffer 初始化时，可能会无意中将安全性和可靠性问题引入应用程序。
为了使 Buffer 实例的创建更可靠且更不容易出错，各种形式的 new Buffer() 构造函数都已被弃用，且改为单独的 Buffer.from()，Buffer.alloc() 和 Buffer.allocUnsafe() 方法。

``` js
// buffer 是以2进制存储，以16进制显示

new Buffer(array)

Buffer.alloc(length)
Buffer.allocUnsafe(length)
Buffer.from(array)
```

``` js
Buffer.alloc(size[, fill[, encoding]])
```

## 整理中... 

			
			
			
			
			
			
		
		
		

