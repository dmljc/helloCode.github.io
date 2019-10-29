# Node模块

## 介绍

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。


> I / O (即是 Input / Output) 指的是系统对磁盘的读写操作。

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



			
			
			
			
			
			
		
		
		