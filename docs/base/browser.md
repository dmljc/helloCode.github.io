# 浏览器篇

## 打开1个页面，有4个进程？

最初的浏览器都是单进程的（单进程浏览器是指浏览器的所有功能模块都是运行在同一个进程里），它们不稳定、不流畅且不安全，之后出现了 Chrome，创造性地引入了多进程架构，并解决了这些遗留问题。
![单进程浏览器](https://static001.geekbang.org/resource/image/6d/ca/6ddad2419b049b0eb2a8036f3dfff1ca.png)

打开一个页面需要 4 个进程是因为：打开 1 个页面至少需要 1 个网络进程、1 个浏览器进程、1 个 GPU 进程以及 1 个渲染进程，共 4 个；
如果打开的页面有运行插件的话，还需要再加上 1 个插件进程。
![多进程浏览器](https://static001.geekbang.org/resource/image/b6/fc/b61cab529fa31301bde290813b4587fc.png)

* 浏览器进程：主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。
* 渲染进程：核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下。
* GPU 进程：主要负责3D绘制。其实，Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。
* 网络进程：主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。
* 插件进程：主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。

不过凡事都有两面性，虽然多进程模型提升了浏览器的稳定性、流畅性和安全性，但同样不可避免地带来了一些问题：

* 更高的资源占用：因为每个进程都会包含公共基础结构的副本（如 JavaScript 运行环境），这就意味着浏览器会消耗更多的内存资源。
* 更复杂的体系架构：浏览器各模块之间耦合性高、扩展性差等问题，会导致现在的架构已经很难适应新的需求了。

<h3>近程 VS 线程</h3>

一个进程就是一个程序的运行实例。详细解释就是，启动一个程序的时候，操作系统会为该程序创建一块内存，用来存放代码、运行中的数据和一个执行任务的主线程，我们把这样的一个运行环境叫进程。如果把 cpu 比作一个工厂的话，进程就相当于一个个独立的车间。

线程是依附于进程的。线程是程序执行中的一个单一的顺序控制流程，说白了就相当于是车间里的每个工人，每个人都有自己的分内工作，互相协同合作完成一个程序车间的正常运行。

## TCP 保证了数据完整地传输

TCP：是一种面向连接的、可靠的、基于字节流的传输层通信协议。TCP 保证了数据完整地传输，它的连接可分为三个阶段：建立连接、传输数据和断开连接。
![一个 TCP 连接的生命周期](https://static001.geekbang.org/resource/image/44/44/440ee50de56edc27c6b3c992b3a25844.png)

* **首先，建立连接阶段。** 这个阶段是通过“三次握手”来建立客户端和服务器之间的连接。TCP 提供面向连接的通信传输。面向连接是指在数据通信开始之前先做好两端之间的准备工作。所谓三次握手，是指在建立一个 TCP 连接时，客户端和服务器总共要发送三个数据包以确认连接的建立。
* **其次，传输数据阶段。** 在该阶段，接收端需要对每个数据包进行确认操作，也就是接收端在接收到数据包之后，需要发送确认数据包给发送端。所以当发送端发送了一个数据包之后，在规定时间内没有接收到接收端反馈的确认消息，则判断为数据包丢失，并触发发送端的重发机制。同样，一个大的文件在传输过程中会被拆分成很多小的数据包，这些数据包到达接收端后，接收端会按照 TCP 头中的序号为其排序，从而保证组成完整的数据。
* **最后，断开连接阶段。** 数据传输完毕之后，就要终止连接了，涉及到最后一个阶段“四次挥手”来保证双方都能断开连接。

<h3>HTTP 协议是基于 TCP 协议的，你怎么理解 HTTP 和 TCP 的关系？</h3>

TCP 协议是传输层协议，主要解决数据如何在网络中传输，而 HTTP 是应用层协议，主要解决如何包装数据。

## 从输入 URL 到页面展示

![](https://static001.geekbang.org/resource/image/92/5d/92d73c75308e50d5c06ad44612bcb45d.png)

从上图可以看出，整个流程包含了许多步骤，其中几个核心的节点是用蓝色背景标记出来的。这个过程可以大致描述为如下：

* 首先，用户从浏览器进程里输入请求信息；
* 然后，网络进程发起 URL 请求；
* 服务器响应 URL 请求之后，浏览器进程就又要开始准备渲染进程了；
* 渲染进程准备好之后，需要先向渲染进程提交页面数据，我们称之为提交文档阶段；
* 渲染进程接收完文档信息之后，便开始解析页面和加载子资源，完成页面的渲染。
  
详细步骤如下

### 用户输入

当用户在地址栏中输入一个查询关键字时，地址栏会判断输入的关键字是搜索内容，还是请求的 URL。

* 如果是搜索内容，地址栏会使用浏览器默认的搜索引擎，来合成新的带搜索关键字的 URL。
* 如果判断输入内容符合 URL 规则，比如输入的是 zhangfangchao.com 那么地址栏会根据规则，把这段内容加上协议，合成为完整的 URL，
如 https://zhangfangchao.com

### URL 请求过程

接下来，便进入了页面资源请求过程。这时，浏览器进程会通过进程间通信（IPC）把 URL 请求发送至网络进程，网络进程接收到 URL 请求后，会在这里发起真正的 URL 请求流程。那具体流程是怎样的呢？

* 首先，网络进程会查找本地缓存是否缓存了该资源。如果有缓存资源，那么直接返回资源给浏览器进程；如果在缓存中没有查找到资源，那么直接进入网络请求流程。这请求前的第一步是要进行 DNS 解析，以获取请求域名的服务器 IP 地址。如果请求协议是 HTTPS，那么还需要建立 TLS 连接。
* 接下来就是利用 IP 地址和服务器建立 TCP 连接。连接建立之后，浏览器端会构建请求行、请求头等信息，并把和该域名相关的 Cookie 等数据附加到请求头中，然后向服务器发送构建的请求信息。
* 服务器接收到请求信息后，会根据请求信息生成响应数据（包括响应行、响应头和响应体等信息），并发给网络进程。等网络进程接收了响应行和响应头之后，就开始解析响应头的内容了。
  * **(1）重定向** 在接收到服务器返回的响应头后，网络进程开始解析响应头，如果发现返回的状态码是 301 或者 302，那么说明服务器需要浏览器重定向到其他 URL。这时网络进程会从响应头的 Location 字段里面读取重定向的地址，然后再发起新的 HTTP 或者 HTTPS 请求，一切又重头开始了。
  
  比如，我们在终端里输入以下命令：

  ``` js
  curl -I http://time.geekbang.org/
  ```
![](https://static001.geekbang.org/resource/image/65/7e/655cbf32dd4bb6f9decc5c7f9a535a7e.png)

下面我们再使用 HTTPS 协议对极客时间发起请求，看看服务器的响应头信息是什么样子的。

``` js
curl -I https://time.geekbang.org/
```
![](https://static001.geekbang.org/resource/image/0c/43/0c4987fe5d05646fa8245d8cc50d1a43.png)

* **（2）响应数据类型处理** URL 请求的数据类型，有时候是一个下载类型，有时候是正常的 HTML 页面，那么浏览器是如何区分它们呢？
  
  答案是 Content-Type。Content-Type 是 HTTP 头中一个非常重要的字段， 它告诉浏览器服务器返回的响应体数据是什么类型，然后浏览器会根据 Content-Type 的值来决定如何显示响应体的内容。(text/html 是 HTML 格式，application/octet-stream 是 字节流类型，application/json 是JSON 格式)

``` js
curl -I https://time.geekbang.org/
```
![](https://static001.geekbang.org/resource/image/89/1c/8951e161b5f44a73e52c16b631a63e1c.png)

PS：需要注意的是，如果服务器配置 Content-Type 不正确，比如将 text/html 类型配置成 application/octet-stream 类型，那么浏览器可能会曲解文件内容，比如会将一个本来是用来展示的页面，变成了一个下载文件。

### 准备渲染进程

默认情况下，Chrome 会为每个页面分配一个渲染进程，也就是说，每打开一个新页面就会配套创建一个新的渲染进程。但是，也有一些例外，在某些情况下，浏览器会让多个页面直接运行在同一个渲染进程中。

**那什么情况下多个页面会同时运行在一个渲染进程中呢？**
Chrome 的默认策略是，每个标签对应一个渲染进程。但如果从一个页面打开了另一个新页面，而新页面和当前页面属于同一站点的话，
那么新页面会复用父页面的渲染进程。

``` js
// 协议(https) 和 跟域名(geekbang.org)都相同则为同一站点，如下：
https://time.geekbang.org
https://www.geekbang.org
https://www.geekbang.org:8080
```
渲染进程准备好之后，还不能立即进入文档解析状态，因为此时的文档数据还在网络进程中，并没有提交给渲染进程，所以下一步就进入了提交文档阶段。

### 提交文档

**首先要明确一点，这里的“文档”是指 URL 请求的响应体数据。**
* “提交文档”的消息是由浏览器进程发出的，渲染进程接收到“提交文档”的消息后，会和网络进程建立传输数据的“管道”。
* 等文档数据传输完成之后，渲染进程会返回“确认提交”的消息给浏览器进程。
* 浏览器进程在收到“确认提交”的消息后，会更新浏览器界面状态，包括了安全状态、地址栏的 URL、前进后退的历史状态，并更新 Web 页面。

更新内容如下图所示：
![](https://static001.geekbang.org/resource/image/d3/b8/d3c5a6188b09b5b57af439005ae7dfb8.png)

### 渲染阶段

以下是 渲染机制 在渲染阶段 的大致流程。

* 首先，将 HTML 转换为浏览器能够理解的结构 —— DOM 树。
* 然后，把 CSS 解析器会把 CSS 转换为浏览器能够理解的样式树。
* 其次，再把 DOM 树和 CSSOM 合并成 render 树。
* 接着，根据渲染树来布局，计算每个节点的位置。
* 最后，调用 GPU 绘制，合成图层，显示在屏幕上。
  
大概流程如下图所示：
![](https://t1.picb.cc/uploads/2019/09/10/gXdyVG.png)

在构建 CSSOM 树时，会阻塞渲染，直至 CSSOM 树构建完成。并且构建 CSSOM 树是一个十分消耗性能的过程，所以应该尽量保证层级扁平，减少过度层叠，越是具体的 CSS 选择器，执行速度越慢。

当 HTML 解析到 script 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始。也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件。并且 CSS 也会影响 JS 的执行，只有当解析完样式表才会执行 JS，所以也可以认为这种情况下，CSS 也会暂停构建 DOM。

<h3>图层</h3>

一般来说，可以把普通文档流看成一个图层。特定的属性可以生成一个新的图层。**不同的图层渲染互不影响**，所以对于某些频繁需要渲染的建议单独生成一个新图层，提高性能。**但也不能生成过多的图层，会引起反作用。**

通过以下几个常用属性可以生成新图层

- 3D 变换：`translate3d`、`translateZ`
- `position: fixed`
- 通过动画实现的 `opacity` 动画转换
- `will-change`
- `video`、`iframe` 标签

<h3>重绘（Repaint）和重排（Reflow）</h3>

重绘和重排是渲染步骤中的一小节，但是这两个步骤对于性能影响很大。

- 重绘是当节点需要更改外观而不会影响布局的，比如改变 `color` 就叫称为重绘
- 重排是布局或者几何属性需要改变就称为重排。

重排必定会发生重绘，重绘不一定会引发重排。重排所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列重排。

所以以下几个动作可能会导致性能问题：

- 改变 window 大小
- 改变字体
- 添加或删除样式
- 文字改变
- 定位或者浮动
- 盒模型

很多人不知道的是，重绘和重排其实和 Event loop 有关。

* 当 Event loop 执行完 Microtasks 后，会判断 document 是否需要更新。因为浏览器是 60Hz 的刷新率，每 16ms 才会更新一次。
* 然后判断是否有 `resize` 或者 `scroll` ，有的话会去触发事件，所以 `resize` 和 `scroll` 事件也是至少 16ms 才会触发一次，并且自带节流功能。
* 判断是否触发了 media query
* 更新动画并且发送事件
* 判断是否有全屏操作事件
* 执行 `requestAnimationFrame` 回调
* 执行 `IntersectionObserver` 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
* 更新界面
* 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 `requestIdleCallback` 回调。

以上内容来自于 [HTML 文档](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

<h3>减少重绘和重排</h3>

- 使用 `translate` 替代 `top`

  ```html
  <div class="test"></div>
  <style>
  	.test {
  		position: absolute;
  		top: 10px;
  		width: 100px;
  		height: 100px;
  		background: red;
  	}
  </style>
  <script>
  	setTimeout(() => {
          // 引起重排
  		document.querySelector('.test').style.top = '100px'
  	}, 1000)
  </script>
  ```
- 使用 `visibility` 替换 `display: none` ，因为前者只会引起重绘，后者会引发重排（改变了布局）

- 把 DOM 离线后修改，比如：先把 DOM 给 `display:none` (有一次 Reflow)，然后你修改100次，然后再把它显示出来

- 不要把 DOM 结点的属性值放在一个循环里当成循环里的变量

  ```js
  for(let i = 0; i < 1000; i++) {
      // 获取 offsetTop 会导致重排，因为需要去获取正确的值
      console.log(document.querySelector('.test').style.offsetTop)
  }
  ```

- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局

- 动画实现的速度的选择，动画速度越快，重排次数越多，也可以选择使用 `requestAnimationFrame`

- CSS 选择符从右往左匹配查找，避免 DOM 深度过深

- 将频繁运行的动画变为图层，图层能够阻止该节点重排影响别的元素。比如对于 `video` 标签，浏览器会自动将该节点变为图层。

## HTTP / 1.0

HTTP / 0.9 是于 1991 年提出的，主要用于学术交流，需求很简单——用来在网络之间传递 HTML 超文本的内容，所以被称为**超文本传输协议**。整体来看，它的实现也很简单，采用了基于请求响应的模式，从客户端发出请求，服务器返回数据。

下面我们就来看看 HTTP / 0.9 的一个完整的请求流程（可参考下图）
* 因为 HTTP 都是基于 TCP 协议的，所以客户端先要根据 IP 地址、端口和服务器建立 TCP 连接，而建立连接的过程就是 TCP 协议三次握手的过程。
* 建立好连接之后，会发送一个 GET 请求行的信息，如GET /index.html用来获取 index.html。
* 服务器接收请求信息之后，读取对应的 HTML 文件，并将数据以 ASCII 字符流返回给客户端。
* HTML 文档传输完成后，断开连接。
  
![](https://static001.geekbang.org/resource/image/db/34/db1166c68c22a45c9858e88a234f1a34.png)

当时的需求很简单，就是用来传输体积很小的 HTML 文件，所以 HTTP / 0.9 的实现有以下三个特点：

*  第一个是只有一个请求行，并没有 HTTP 请求头和请求体，因为只需要一个请求行就可以完整表达客户端的需求了。
*  第二个是服务器也没有返回头信息，这是因为服务器端并不需要告诉客户端太多信息，只需要返回数据就可以了。
*  第三个是返回的文件内容是以 ASCII 字符流来传输的，因为都是 HTML 格式的文件，所以使用 ASCII 字节码来传输是最合适的。

万维网的高速发展带来了很多新的需求，而 HTTP / 0.9 已经不能适用新兴网络的发展。原因有以下几点：

* 首先在浏览器中展示的不单是 HTML 文件了，还包括了 JavaScript、CSS、图片、音频、视频等不同类型的文件。
  因此，**支持多种类型的文件下载是 HTTP / 1.0 的一个核心诉求**。
* 而且文件格式不仅仅局限于 ASCII 编码，还有很多其他类型编码的文件。

<h3>那么该如何实现多种类型文件的下载呢？</h3>

文章开头我们说过，HTTP 是浏览器和服务器之间的通信语言，不过 HTTP / 0.9 在建立好连接之后，只会发送类似GET /index.html的简单请求命令，并没有其他途径告诉服务器更多的信息，如文件编码、文件类型等。同样，服务器是直接返回数据给浏览器的，也没有其他途径告诉浏览器更多的关于服务器返回的文件信息。

这种简单的交流型形式无疑不能满足传输多种类型文件的需求，那为了让客户端和服务器能更深入地交流，HTTP / 1.0 引入了请求头和响应头，它们都是以为 Key-Value 形式保存的，在 HTTP 发送请求时，会带上请求头信息，服务器返回数据时，会先返回响应头信息。至于 HTTP / 1.0 具体的请求流程，你可以参考下图。
![](https://static001.geekbang.org/resource/image/b5/7d/b52b0d1a26ff2b8607c08e5c50ae687d.png)

<h3>HTTP / 1.0 是怎么通过请求头和响应头来支持多种不同类型的数据呢？</h3>

要支持多种类型的文件，我们就需要解决以下几个问题：

* 首先，浏览器需要知道服务器返回的数据是什么类型的，然后浏览器才能根据不同的数据类型做针对性的处理。
* 其次，由于万维网所支持的应用变得越来越广，所以单个文件的数据量也变得越来越大。为了减轻传输性能，服务器会对数据进行压缩后再传输，所以浏览器需要知道服务器压缩的方法。
* 再次，由于万维网是支持全球范围的，所以需要提供国际化的支持，服务器需要对不同的地区提供不同的语言版本，这就需要浏览器告诉服务器它想要什么语言版本的页面。
* 最后，由于增加了各种不同类型的文件，而每种文件的编码形式又可能不一样，为了能够准确地读取文件，浏览器需要知道文件的编码类型。
  
于以上问题，HTTP / 1.0 的方案是通过请求头和响应头来进行协商，在发起请求时候会通过 HTTP 请求头告诉服务器它期待服务器返回什么类型的文件、采取什么形式的压缩、提供什么语言的文件以及文件的具体编码。最终发送出来的请求头内容如下：

``` js
accept: text/html   // 期望服务器返回 html 类型的文件
accept-encoding: gzip, deflate, br  // 期望服务器可以采用 gzip、deflate 或者 br 其中的一种压缩方式
accept-Charset: ISO-8859-1,utf-8    // 期望返回的文件编码是 UTF-8 或者 ISO-8859-1
accept-language: zh-CN,zh   // 期望页面的优先语言是中文
```
HTTP / 1.0 除了对多文件提供良好的支持外，还依据当时实际的需求引入了很多其他的特性，这些特性都是通过请求头和响应头来实现的。下面我们来看看新增的几个典型的特性：

* 有的请求服务器可能无法处理，或者处理出错，这时候就需要告诉浏览器服务器最终处理该请求的情况，这就引入了状态码。状态码是通过响应行的方式来通知浏览器的。
* 为了减轻服务器的压力，在 HTTP/1.0 中提供了 Cache 机制，用来缓存已经下载过的数据。

<h3>关于HTTP / 1 的缓存这里需要着重介绍下</h3>

缓存对于前端性能优化来说是个很重要的点，良好的缓存策略可以降低资源的重复加载提高网页的整体加载速度。 通常浏览器缓存策略分为两种：强缓存 和 协商缓存（后端服务器做配置）。

<h3>强缓存（Expires 和 Cache-Control）表示在缓存期间不需要请求</h3>

``` js
Expires: Wed, 22 Oct 2018 08:41:00 GMT  
```
Expires 是 HTTP / 1.0 的产物，表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需要再次请求。 并且 Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效。

``` js
Cache-control: max-age=31536000
```
为了弥补 Expires 受限于本地时间的短板，1.1 版本中 Cache-Control 应运而生，优先级高于 Expires 。

<h3>协商缓存（Last-Modified 和 ETag）需要请求，若缓存有效会返回 304</h3>

**Last-Modified** 表示本地文件最后修改日期，If-Modified-Since 会将 Last-Modified 的值发送给服务器， 询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来。

但是，Last-Modified 存在一些弊端，这其中最常见的就是这样两个场景：

* 我们编辑了文件，但文件的内容没有改变。服务端并不清楚我们是否真正改变了文件，它仍然通过最后编辑时间进行判断。 因此这个资源在再次被请求时，会被当做新资源，进而引发一次完整的响应——不该重新请求的时候，也会重新请求。
* 当我们修改文件的速度过快时（比如花了 100ms 完成了改动），由于 If-Modified-Since 只能检查到以秒为最小计量单位的时间差， 所以它是感知不到这个改动的——该重新请求的时候，反而没有重新请求了...

这两个场景其实指向了同一个 bug——服务器并没有正确感知文件的变化。为了解决这样的问题，于是在 HTTP / 1.1 版本中 Etag 作为 Last-Modified 的补充出现了。

**Etag** 是由服务器为每个资源生成的唯一的标识字符串，这个标识字符串是基于文件内容编码的，只要文件内容不同， 它们对应的 Etag 就是不同的，反之亦然。因此 Etag 能够精准地感知文件的变化 。

ETag 和 Last-Modified 类似，If-None-Match 会将当前 ETag 发送给服务器，询问该资源 ETag 是否变动， 有变动的话就将新的资源发送回来。并且 ETag 优先级比 Last-Modified 高。

## HTTP / 1.1

不过随着技术的继续发展，需求也在不断迭代更新，很快 HTTP / 1.0 也不能满足需求了，所以 HTTP / 1.1 又在 HTTP / 1.0 的基础之上做了大量的更新。接下来我们来看看 HTTP / 1.0 遇到了哪些主要的问题，以及 HTTP / 1.1 又是如何改进的。

<h3>改进持久连接</h3>

HTTP / 1.0 每进行一次 HTTP 通信，都需要经历建立 TCP 连接、传输 HTTP 数据和断开 TCP 连接三个阶段（如下图）

![](https://static001.geekbang.org/resource/image/cc/7d/cccc9faf6d0addea8e1bf307cd7d8d7d.png)

在当时，由于通信的文件比较小，而且每个页面的引用也不多，所以这种传输形式没什么大问题。但是随着浏览器普及，单个页面中的图片文件越来越多，有时候一个页面可能包含了几百个外部引用的资源文件，如果在下载每个文件的时候，都需要经历建立 TCP 连接、传输数据和断开连接这样的步骤，无疑会增加大量无谓的开销。

**为了解决这个问题，HTTP/1.1 中增加了持久连接的方法，它的特点是在一个 TCP 连接上可以传输多个 HTTP 请求，只要浏览器或者服务器没有明确断开连接，那么该 TCP 连接会一直保持。**
![](https://static001.geekbang.org/resource/image/80/1a/80b57830e15faa17631bea74054a0e1a.png)

从上图可以看出，HTTP 的持久连接可以有效减少 TCP 建立连接和断开连接的次数，这样的好处是减少了服务器额外的负担，并提升整体 HTTP 的请求时长。

持久连接在 HTTP / 1.1 中是默认开启的 Connection: keep-alive，所以你不需要专门为了持久连接去 HTTP 请求头设置信息，如果你不想要采用持久连接，可以在 HTTP 请求头中加上Connection: close。目前浏览器中对于同一个域名，默认允许同时建立 6 个 TCP 持久连接。

<h3>不成熟的 HTTP 管线化</h3>

持久连接虽然能减少 TCP 的建立和断开次数，但是它需要等待前面的请求返回之后，才能进行下一次请求。如果 TCP 通道中的某个请求因为某些原因没有及时返回，那么就会阻塞后面的所有请求，这就是著名的 **队头阻塞**的问题。

HTTP / 1.1 中试图通过管线化的技术来解决队头阻塞的问题。HTTP / 1.1 中的管线化是指将多个 HTTP 请求整批提交给服务器的技术，虽然可以整批发送请求，不过服务器依然需要根据请求顺序来回复浏览器的请求。

FireFox、Chrome 都做过管线化的试验，但是由于各种原因，它们最终都放弃了管线化技术。

<h3>提供虚拟主机的支持</h3>

在 HTTP / 1.0 中，每个域名绑定了一个唯一的 IP 地址，因此一个服务器只能支持一个域名。但是随着虚拟主机技术的发展，需要实现在一台物理主机上绑定多个虚拟主机，每个虚拟主机都有自己的单独的域名，这些单独的域名都公用同一个 IP 地址。

因此，HTTP / 1.1 的请求头中增加了 **Host 字段**，用来表示当前的域名地址，这样服务器就可以根据不同的 Host 值做不同的处理

<h3>客户端 Cookie、安全机制</h3>

由客户端 Cookie、安全机制 引发一个问题：**登录状态是如何保持的？**

简单地说，如果服务器端发送的响应头内有 Set-Cookie 的字段，那么浏览器就会将该字段的内容保持到本地。当下次客户端再往该服务器发送请求时，客户端会自动在请求头中加入 Cookie 值后再发送出去。服务器端发现客户端发送过来的 Cookie 后，会去检查究竟是从哪一个客户端发来的连接请求，然后对比服务器上的记录，最后得到该用户的状态信息。

![](https://static001.geekbang.org/resource/image/d9/b3/d9d6cefe8d3d6d84a37a626687c6ecb3.png)

## HTTP / 2.0

虽然 HTTP / 1.1 采取了很多优化资源加载速度的策略。但是 **HTTP / 1.1 对带宽的利用率却并不理想**，这也是 HTTP / 1.1 的一个核心问题。
带宽 是指每秒最大能发送或者接收的字节数。

之所以说 HTTP / 1.1 对带宽的利用率不理想，是因为 HTTP / 1.1 很难将带宽用满。比如我们常说的 100M 带宽，实际的下载速度能达到 12.5M/S，而采用 HTTP / 1.1 时，也许在加载页面资源时最大只能使用到 2.5M/S，很难将 12.5M 全部用满。

之所以会出现这个问题，主要是由以下三个原因导致的：

* 第一个原因，TCP 的慢启动：
  
  一旦一个 TCP 连接建立之后，就进入了发送数据状态，刚开始 TCP 协议会采用一个非常慢的速度去发送数据，然后慢慢加快发送数据的速度，直到发送数据的速度达到一个理想状态，我们把这个过程称为慢启动。
  
  之所以说慢启动会带来性能问题，是因为页面中常用的一些关键资源文件本来就不大，如 HTML 文件、CSS 文件和 JavaScript 文件，通常这些文件在 TCP 连接建立之后就要发起请求，但这个过程是慢启动，所以耗费的时间比正常的时间要多很多，这样就推迟了宝贵的首次渲染页面的时长了。

* 第二个原因，同时开启了多条 TCP 连接，这些连接会竞争固定的带宽：
  
  假如系统同时建立了多条 TCP 连接，当带宽充足时，每条连接发送或者接收速度会慢慢向上增加；而一旦带宽不足时，这些 TCP 连接又会减慢发送或者接收的速度。

  这样就会出现一个问题，因为有的 TCP 连接下载的是一些关键资源，如 CSS 文件、JavaScript 文件等，而有的 TCP 连接下载的是图片、视频等普通的资源文件，但是多条 TCP 连接之间又不能协商让哪些关键资源优先下载，这样就有可能影响那些关键资源的下载速度了。

* 第三个原因，HTTP / 1.1 队头阻塞的问题：

  在 HTTP / 1.1 中使用持久连接时，虽然能公用一个 TCP 管道，但是在一个管道中同一时刻只能处理一个请求，在当前的请求没有结束之前，其他的请求只能处于 阻塞的状态。这意味着我们不能随意在一个管道中发送请求和接收内容。

  这是一个很严重的问题，因为阻塞请求的因素有很多，并且都是一些不确定性的因素，假如有的请求被阻塞了 5 秒，那么后续排队的请求都要延迟等待 5 秒，在这个等待的过程中，带宽、CPU 都被白白浪费了。

  队头阻塞使得数据不能并行请求，所以队头阻塞是很不利于浏览器优化的。

针对以上问题，解决方案是 HTTP / 2.0 多路复用。

<h3>多路复用</h3>

HTTP / 2.0 使用了多路复用技术，可以将请求分成一帧一帧的数据去传输，这样带来了一个额外的好处，就是当收到一个优先级高的请求时，比如接收到 JavaScript 或者 CSS 关键资源的请求，服务器可以暂停之前的请求来优先处理关键资源的请求。

![](https://static001.geekbang.org/resource/image/86/6a/86cdf01a3af7f4f755d28917e58aae6a.png)

从上面的流程可以看出，**多路复用是 HTTP/2 的最核心功能，它能实现资源的并行传输。通过引入二进制分帧层，就实现了 HTTP 的多路复用技术。**

<h3>头部压缩</h3>

无论是 HTTP / 1.1 还是 HTTP / 2.0，它们都有请求头和响应头，这是浏览器和服务器的通信语言。HTTP / 2.0 对请求头和响应头进行了压缩，你可能觉得一个 HTTP 的头文件没有多大，压不压缩可能关系不大，但你这样想一下，在浏览器发送请求的时候，基本上都是发送 HTTP 请求头，很少有请求体的发送，通常情况下页面也有 100 个左右的资源，如果将这 100 个请求头的数据压缩为原来的 20%，那么传输效率肯定能得到大幅提升。

::: warning
虽然 HTTP / 2。0 解决了 HTTP / 1.1 中的队头阻塞问题，但是 HTTP / 2.0 依然是基于 TCP 协议的，而 TCP 协议依然存在数据包级别的队头阻塞问题。
:::

## HTTP / 3.0

<h3>TCP 的队头阻塞</h3>

在 TCP 传输过程中，由于单个数据包的丢失而造成的阻塞称为 TCP 上的队头阻塞，如下如所示：

![](https://static001.geekbang.org/resource/image/33/96/33d2b4c14a7a2f19ef6677696b67de96.png)

<h3>TCP 建立连接的延时</h3>

除了 TCP 队头阻塞之外，TCP 的握手过程也是影响传输效率的一个重要因素:
![](https://static001.geekbang.org/resource/image/e9/4f/e98927e19b20349815fb8f499067cb4f.png)

<h3>TCP 协议僵化</h3>

知道了 TCP 协议存在队头阻塞和建立连接延迟等缺点，是否可以通过改进 TCP 协议来解决这些问题呢？

答案是：非常困难。之所以这样，主要有两个原因：

* **第一个 中间设备的僵化**。为了能够保障互联网的正常工作，我们需要在互联网的各处搭建各种设备，这些设备就被称为中间设备，包括了路由器、防火墙、交换机等。
  
    所以，如果我们在客户端升级了 TCP 协议，但是当新协议的数据包经过这些中间设备时，它们可能不理解包的内容，于是这些数据就会被丢弃掉。这就是中间设备僵化，它是阻碍 TCP 更新的一大障碍。

* **第二 操作系统也是导致 TCP 协议僵化的另外一个原因**。因为 TCP 协议都是通过操作系统内核来实现的，应用程序只能使用不能修改。通常操作系统的更新都滞后于软件的更新，因此要想自由地更新内核中的 TCP 协议也是非常困难的。
  
<h3>QUIC 协议</h3>

HTTP / 2.0 存在一些比较严重的与 TCP 协议相关的缺陷，但由于 TCP 协议僵化，我们几乎不可能通过修改 TCP 协议自身来解决这些问题，那么解决问题的思路是绕过 TCP 协议，发明一个 TCP 和 UDP 之外的新的传输协议。但是这也面临着和修改 TCP 一样的挑战，因为中间设备的僵化，这些设备只认 TCP 和 UDP，如果采用了新的协议，新协议在这些设备同样不被很好地支持。

因此，HTTP / 3.0 选择了一个折衷的方法——UDP 协议，基于 UDP 实现了类似于 TCP 的多路数据流、传输可靠性等功能，我们把这套功能称为 QUIC 协议。关于 HTTP / 2.0 和 HTTP / 3.0 协议栈的比较，你可以参考下图：
![](https://static001.geekbang.org/resource/image/0b/c6/0bae470bb49747b9a59f9f4bb496a9c6.png)

通过上图我们可以看出，HTTP/3 中的 QUIC 协议集合了以下几点功能:

* **实现了类似 TCP 的流量控制、传输可靠性的功能**。虽然 UDP 不提供可靠性的传输，但 QUIC 在 UDP 的基础之上增加了一层来保证数据可靠性传输。它提供了数据包重传、拥塞控制以及其他一些 TCP 中存在的特性。
* **集成了 TLS 加密功能**。目前 QUIC 使用的是 TLS1.3，相较于早期版本 TLS1.3 有更多的优点，其中最重要的一点是减少了握手所花费的 RTT 个数。
* **实现了 HTTP/2 中的多路复用功能**。和 TCP 不同，QUIC 实现了在同一物理连接上可以有多个独立的逻辑数据流（如下图）。实现了数据流的单独传输，就解决了 TCP 中队头阻塞的问题。
* **实现了快速握手功能**。由于 QUIC 是基于 UDP 的，所以 QUIC 可以实现使用 0-RTT 或者 1-RTT 来建立连接，这意味着 QUIC 可以用最快的速度来发送和接收数据，这样可以大大提升首次打开页面的速度

<h3>HTTP / 3.0 的挑战</h3>

通过上面的分析，我们相信在技术层面，HTTP / 3.0 是个完美的协议。不过要将 HTTP / 3.0 应用到实际环境中依然面临着诸多严峻的挑战，这些挑战主要来自于以下三个方面。

* **第一 从目前的情况来看，服务器和浏览器端都没有对 HTTP/3 提供比较完整的支持**。Chrome 虽然在数年前就开始支持 Google 版本的 QUIC，但是这个版本的 QUIC 和官方的 QUIC 存在着非常大的差异
* **第二 部署 HTTP/3 也存在着非常大的问题**。因为系统内核对 UDP 的优化远远没有达到 TCP 的优化程度，这也是阻碍 QUIC 的一个重要原因。
* **第三 中间设备僵化的问题**。这些设备对 UDP 的优化程度远远低于 TCP，据统计使用 QUIC 协议时，大约有 3%～7% 的丢包率。

关于 HTTP / 3.0 的未来，我有下面两点判断：
* 从标准制定到实践再到协议优化还需要走很长一段路；
* 因为动了底层协议，所以 HTTP/3 的增长会比较缓慢，这和 HTTP/2 有着本质的区别。

## 事件机制

<h3>事件触发三阶段</h3>

- `window` 往事件触发处传播，遇到注册的捕获事件会触发
- 传播到事件触发处时触发注册的事件
- 从事件触发处往 `window` 传播，遇到注册的冒泡事件会触发

事件触发一般来说会按照上面的顺序进行，但是也有特例，如果给一个目标节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行。

```js
// 以下会先打印冒泡然后是捕获
node.addEventListener('click',(event) =>{
	console.log('冒泡')
},false);
node.addEventListener('click',(event) =>{
	console.log('捕获 ')
},true)
```

<h3>注册事件</h3>

通常我们使用 `addEventListener` 注册事件，该函数的第三个参数可以是布尔值，也可以是对象。对于布尔值 `useCapture` 参数来说，该参数默认值为 `false` 。`useCapture` 决定了注册的事件是捕获事件还是冒泡事件。对于对象参数来说，可以使用以下几个属性

- `capture`，布尔值，和 `useCapture` 作用一样
- `once`，布尔值，值为 `true` 表示该回调只会调用一次，调用后会移除监听
- `passive`，布尔值，表示永远不会调用 `preventDefault` 

一般来说，我们只希望事件只触发在目标上，这时候可以使用 `stopPropagation` 来阻止事件的进一步传播。通常我们认为 `stopPropagation` 是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。`stopImmediatePropagation` 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。

```js
node.addEventListener('click',(event) =>{
	event.stopImmediatePropagation()
	console.log('冒泡')
},false);
// 点击 node 只会执行上面的函数，该函数不会执行
node.addEventListener('click',(event) => {
	console.log('捕获 ')
},true)
```

<h3>事件代理</h3>

如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话应该注册在父节点上

```html
<ul id="ul">
	<li>1</li>
    <li>2</li>
	<li>3</li>
	<li>4</li>
	<li>5</li>
</ul>
<script>
	let ul = document.querySelector('#ul')
	ul.addEventListener('click', (event) => {
		console.log(event.target);
	})
</script>
```

事件代理的方式相对于直接给目标注册事件来说，有以下优点

- 节省内存
- 不需要给子节点注销事件

## 跨域

因为浏览器出于安全考虑，有同源策略。也就是说，如果协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败。

![](https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3601471790,1944560704&fm=26&gp=0.jpg)

<h3>JSONP</h3>

JSONP 的原理很简单，就是利用 `<script>` 标签没有跨域限制的漏洞。通过 `<script>` 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时。

```js
<script src="http://domain/api?param1=a&param2=b&callback=jsonp"></script>
<script>
function jsonp(data) {
    console.log(data)
}
</script>    
```

JSONP 使用简单且兼容性不错，但是只限于 `get` 请求。

<!-- 在开发中可能会遇到多个 JSONP 请求的回调函数名是相同的，这时候就需要自己封装一个 JSONP，以下是简单实现

```js
function jsonp(url, jsonpCallback, success) {
    let script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.type = "text/javascript";
    window[jsonpCallback] = function(data) {
        success && success(data);
    };
    document.body.appendChild(script);
}
jsonp(
    "http://xxx",
    "callback",
    function(value) {
        console.log(value);
    }
);
``` -->

<h3>CORS</h3>

CORS （跨域资源共享）需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，
代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信。

<h3>两种请求</h3>

请求分为简单请求和非简单请求，非简单请求会先进行一次OPTION方法进行预检，看是否允许当前跨域请求。

<h3>简单请求</h3>

只要同时满足以下两大条件，就属于简单请求。

``` js
// 1、请求方法是以下三种方法之一：

* HEAD
* GET
* POST

// 2、HTTP的请求头信息不超出以下几种字段：

* Accept
* Accept-Language
* Content-Language
* Last-Event-ID
* Content-Type：
    // 只限于以下三个值
    * application/x-www-form-urlencoded、// 表单默认的提交数据的格式
    * multipart/form-data、 // 文件上传的格式
    * text/plain            // 纯文本格式
```
凡是不同时满足上面两个条件，就属于非简单请求。

简单请求的基本流程：

对于简单请求，浏览器直接发出 CORS 请求。会自动在头信息之中，添加一个 Origin 字段。

``` js{2}
GET /cors HTTP/1.1
Origin: http://api.bob.com 
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
Origin 字段用来说明，请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

如果 Origin 指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

``` js
Access-Control-Allow-Origin: http://api.bob.com
// 该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示接受任意域名的请求。

Access-Control-Allow-Credentials: true
// 该字段可选。它的值是一个布尔值，表示是否允许发送 Cookie。默认情况下，
// Cookie 不包括在 CORS 请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，

Access-Control-Expose-Headers: FooBar
// 该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
// Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。
// 如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，
// getResponseHeader('FooBar')可以返回FooBar字段的值。

Content-Type: text/html; charset=utf-8
```

如果 Origin 指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包含 
Access-Control-Allow-Origin 字段（详见下文），就知道出错了，从而抛出一个错误，被 XMLHttpRequest 的 onerror 回调函数捕获。
注意，这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是200。

<h3>非简单请求</h3>

**非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求。**

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 动词和头信息字段。
只有得到肯定答复，浏览器才会发出正式的 XMLHttpRequest 请求，否则就报错。

服务器收到"预检"请求以后，检查了 Origin、Access-Control-Request-Method  和 Access-Control-Request-Headers
字段以后，确认允许跨源请求，就可以做出回应。

``` js{4,5,6}
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
```
<h3>nginx 反向代理</h3>

通过 nginx 配置一个代理服务器（域名与domain1 相同，端口不同）做跳板机，反向代理访问 domain2 接口，
并且可以顺便修改 cookie 中 domain 信息，方便当前域 cookie 写入，实现跨域登录。

在 vue 工程中，我们一般会通过代理的方式解决 开发环境 中的跨域问题；生产环境 中的跨域需要后端同学配置 nginx。

``` js
proxyTable: {
    // 用‘/api’开头，代理所有请求到目标服务器
    '/api': {
        target: 'http://localhost:8090/',//设置你调用的接口域名和端口号
        changeOrigin: true, // 是否启用跨域
        pathRewrite: {
            '^/api': ''
            // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
            // 比如我要调用'http://localhost:8090/users'，直接写‘/api/users’即可
    }
}
```
注意：配置好后一定要关闭原来的server，重新npm run dev启动项目。不然无效。

生产环境配置如下：先下载 nginx，然后将 nginx 目录下的 nginx.conf 修改如下:

``` js
// proxy服务器
server {
    listen       81;
    server_name  www.domain1.com;
    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```

::: tip 总结
解决跨域的方式有很多。但是，在实际的项目中最常用的还是 CORS 和 nginx。
:::

## Event loop

众所周知 JS 是门非阻塞单线程语言，因为在最初 JS 就是为了和浏览器交互而诞生的。如果 JS 是门多线程的语言话，我们在多个线程中处理 DOM 就可能会发生问题（一个线程中新加节点，另一个线程中删除节点），当然可以引入读写锁解决这个问题。

JS 在执行的过程中会产生执行环境，这些执行环境会被顺序的加入到执行栈中。如果遇到异步的代码，会被挂起并加入到 Task（有多种 task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为。

```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

console.log('script end');
```

以上代码虽然 `setTimeout` 延时为 0，其实还是异步。这是因为 HTML5 标准规定这个函数第二个参数不得小于 4 毫秒，不足会自动增加。所以 `setTimeout` 还是会在 `script end` 之后打印。

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 微任务（microtask） 和 宏任务（macrotask）。在 ES6 规范中，microtask 称为 `jobs`，macrotask 称为 `task`。

```js
console.log('script start');  // 1

setTimeout(function() {
    console.log('setTimeout'); // 6
}, 0);

new Promise((resolve) => {
    console.log('Promise');  // 2
    resolve();
}).then(function() {
    console.log('promise1');  // 4
}).then(function() {
    console.log('promise2');  // 5
});

console.log('script end');  // 3
// script start => Promise => script end => promise1 => promise2 => setTimeout
```

以上代码虽然 `setTimeout` 写在 `Promise` 之前，但是因为 `Promise` 属于微任务而 `setTimeout` 属于宏任务，所以会有以上的打印。

微任务包括 `process.nextTick` ，`promise` ，`Object.observe` ，`MutationObserver`

宏任务包括 `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`

很多人有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 `script` ，浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务。

所以正确的一次 Event loop 顺序是这样的

1. 执行同步代码，这属于宏任务
2. 执行栈为空，查询是否有微任务需要执行
3. 执行所有微任务
4. 必要的话渲染 UI
5. 然后开始下一轮 Event loop，执行宏任务中的异步代码

``` js
async function async1(){
    console.log('async1 start');  // 2
    await async2();
    console.log('async1 end');  // 5
}

async function async2(){
    console.log('async2');  // 3
}

console.log('script start');  // 1

async1();

console.log('script end'); // 4

// script start -> async1 start -> async2 -> script end -> async1 end
```
对于以上代码：async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，
再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。所以，async await 的输出顺序：script start->async1 start->async2->script end->async1 end。
[参考文章](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/33)

通过上述的  Event loop 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 DOM 的话，为了更快的 界面响应，我们可以把操作 DOM 放入微任务中。

<h3>Node 中的 Event loop</h3>

Node 中的 Event loop 和浏览器中的不相同。

Node 的 Event loop 分为6个阶段，它们会按照顺序反复运行

```
┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<──connections───     │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

<h3>timer</h3>

timers 阶段会执行 `setTimeout` 和 `setInterval`

一个 `timer` 指定的时间并不是准确时间，而是在达到这个时间后尽快执行回调，可能会因为系统正在执行别的事务而延迟。

下限的时间有一个范围：`[1, 2147483647]` ，如果设定的时间不在这个范围，将被设置为1。

<h3>I/O </h3>

I/O 阶段会执行除了 close 事件，定时器和 `setImmediate` 的回调

<h3> idle, prepare </h3>

idle, prepare 阶段内部实现

<h3>poll</h3>

poll 阶段很重要，这一阶段中，系统会做两件事情

1. 执行到点的定时器
2. 执行 poll 队列中的事件

并且当 poll 中没有定时器的情况下，会发现以下两件事情

- 如果 poll 队列不为空，会遍历回调队列并同步执行，直到队列为空或者系统限制
- 如果 poll 队列为空，会有两件事发生
  - 如果有 `setImmediate` 需要执行，poll 阶段会停止并且进入到 check 阶段执行 `setImmediate`
  - 如果没有 `setImmediate` 需要执行，会等待回调被加入到队列中并立即执行回调

如果有别的定时器需要被执行，会回到 timer 阶段执行回调。

<h3>check</h3>

check 阶段执行 `setImmediate` 

<h3>close callbacks</h3>

close callbacks 阶段执行 close 事件

并且在 Node 中，有些情况下的定时器执行顺序是随机的

```js
setTimeout(() => {
    console.log('setTimeout');
}, 0);
setImmediate(() => {
    console.log('setImmediate');
})
// 这里可能会输出 setTimeout，setImmediate
// 可能也会相反的输出，这取决于性能
// 因为可能进入 event loop 用了不到 1 毫秒，这时候会执行 setImmediate
// 否则会执行 setTimeout
```

当然在这种情况下，执行顺序是相同的

```js
var fs = require('fs')

fs.readFile(__filename, () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0);
    setImmediate(() => {
        console.log('immediate');
    });
});
// 因为 readFile 的回调在 poll 中执行
// 发现有 setImmediate ，所以会立即跳到 check 阶段执行回调
// 再去 timer 阶段执行 setTimeout
// 所以以上输出一定是 setImmediate，setTimeout
```

上面介绍的都是 macrotask 的执行情况，microtask 会在以上每个阶段完成后立即执行。

```js
setTimeout(()=>{
    console.log('timer1')

    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)

setTimeout(()=>{
    console.log('timer2')

    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)

// 以上代码在浏览器和 node 中打印情况是不同的
// 浏览器中一定打印 timer1, promise1, timer2, promise2
// node 中可能打印 timer1, timer2, promise1, promise2
// 也可能打印 timer1, promise1, timer2, promise2
```

Node 中的 `process.nextTick` 会先于其他 microtask 执行。

 ```js
setTimeout(() => {
  console.log("timer1");

  Promise.resolve().then(function() {
    console.log("promise1");
  });
}, 0);

process.nextTick(() => {
  console.log("nextTick");
});
// nextTick, timer1, promise1
```

## 存储

<h3>cookie，localStorage，sessionStorage，indexDB</h3>

|     特性     |                   cookie                   |       localStorage       | sessionStorage |         indexDB          |
| :----------: | :----------------------------------------: | :----------------------: | :------------: | :----------------------: |
| 数据生命周期 |     一般由服务器生成，可以设置过期时间     | 除非被清理，否则一直存在 | 页面关闭就清理 | 除非被清理，否则一直存在 |
| 数据存储大小 |                     4K                     |            5M            |       5M       |           无限           |
| 与服务端通信 | 每次都会携带在 header 中，对于请求性能影响 |          不参与          |     不参与     |          不参与          |

`cookie` 通常用于存储用户身份，登录状态等。从上表可以看到，已经不建议用于存储，。如果没有大量数据存储需求的话，可以使用 `localStorage` 和 `sessionStorage` 。对于不怎么改变的数据尽量使用 `localStorage` 存储，否则可以用 `sessionStorage` 存储。

对于 `cookie`，我们还需要注意安全性。

|   属性    |                             作用                             |
| :-------: | :----------------------------------------------------------: |
|   value   | 如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识 |
| http-only |            不能通过 JS 访问 Cookie，减少 XSS 攻击            |
|  secure   |               只能在协议为 HTTPS 的请求中携带                |
| same-site |    规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击     |

## V8垃圾回收机制

垃圾回收: 将内存中不再使用的数据进行清理，释放出内存空间。V8 将内存分成 新生代空间 和 老生代空间。

* 新生代空间: 用于存活较短的对象
    * 又分成两个空间: from 空间 与 to 空间
    * Scavenge GC算法: 当 from 空间被占满时，启动 GC 算法
        * 存活的对象从 from space 转移到 to space
        * 清空 from space
        * from space 与 to space 互换
        * 完成一次新生代GC

* 老生代空间: 用于存活时间较长的对象
    * 从 新生代空间 转移到 老生代空间 的条件
        * 经历过一次以上 Scavenge GC 的对象
        * 当 to space 体积超过25%
    * 标记清除算法: 标记存活的对象，未被标记的则被释放
        * 增量标记: 小模块标记，在代码执行间隙执，GC 会影响性能
        * 并发标记(最新技术): 不阻塞 js 执行
    * 压缩算法: 将内存中清除后导致的碎片化对象往内存堆的一端移动，解决 内存的碎片化
