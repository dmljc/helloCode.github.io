# Linux 是什么

![linux](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592302227034&di=b65ada6c29629f59b61ab52a4d1ae2c9&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180125%2F441073a2188841b09d7092316906c586.jpeg)

> Linux 是服务端最流行的操作系统。

## 目录介绍

* `/root` 该目录为系统管理员，也称作超级权限者的用户主目录。
* `/bin` Binary 的缩写, 这个目录存放着最经常使用的命令。
* `/dev` Device(设备)的缩写, 该目录下存放的是Linux的外部设备。
* `/home` 用户的家目录，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的。
* `/lib` 该目录里存放着系统最基本的动态连接共享库，其作用类似于Windows里的DLL文件。
* `/mnt` 临时挂载别的文件系统，可以将光驱挂载在/mnt/上，进入该目录就可以查看光驱里的内容。
* `/proc` 临时文件系统，存储系统启动以来的信息。重启时，目录下的文件应该被删掉或清除。
* `/srv` 该目录存放一些服务启动之后需要提取的数据。
  
* `/tmp` 这个目录是用来存放一些临时文件的。
* `/var` 存放着经常被修改的目录，包括各种日志文件。
* `/boot` 存放的是启动Linux时使用的一些核心文件，包括一些连接文件以及镜像文件。
* `/etc` 用来存放所有的系统管理所需要的配置文件和子目录。
* `/media` 系统会自动识别一些设备，如U盘、光驱。识别后，linux会把识别的设备挂载到此目录下。
* `/sbin` s就是Super User的意思，这里存放的是系统管理员使用的系统管理程序。
* `/sys` 该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。
* `/usr` 这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下。
* `/usr/bin` 系统用户使用的应用程序。
* `/usr/sbin` 超级用户使用的比较高级的管理程序和系统守护程序。

<!-- ## 操作篇章

### man、help、info

man、help、info 都是帮助命令。man 是 manual 的缩写，也是使用相对较多的命令。info 比 help 更详细，作为 help 的补充。

<h3>格式</h3>

``` js
man(选项)(参数)
```

<h3>选项</h3>

``` js
-a：在所有的man帮助手册中搜索；
-M：指定man手册搜索的路径。
```

<h3>参数中的数字代表内容</h3>

``` js
1：用户在shell环境可操作的命令或执行文件；
2：系统内核可调用的函数与工具等
3：一些常用的函数(function)与函数库(library)，大部分为C的函数库(libc)
4：设备文件说明，通常在/dev下的文件
5：配置文件或某些文件格式
6：游戏(games)
7：惯例与协议等，如Linux文件系统，网络协议，ASCII code等说明
8：系统管理员可用的管理命令
9：跟kernel有关的文件
```

<h3>实例</h3>

``` js
man 3 sleep // 指定从第三本man手册中搜索帮助；
```

<h3>help</h3>

help 只能显示bash内建命令的帮助信息，而对于外部命令的帮助信息只能使用man或者info命令查看。

<h3>格式</h3>

``` js
help(选项)(参数)   // 内部命令使用 help 

(参数) --help     // 外部命令使用 help 

type (参数)       // 区分内外部命令
```

info 比 help 更详细，作为 help 的补充。但是，info 帮助都是英文版的。

``` js
info (参数)
```

### 登录、退出

<h3>登录</h3>

``` js
init 3
```

<h3>退出</h3>

``` js
exit
```

<h3>关机</h3>

``` js
shutdown -p now     // 立马关机
shutdown –h 20:25   // 在今天20:25关机
shutdown –h +10     // 十分钟后关机

halt -p  
reboot -p 
poweroff
```

<h3>取消关机</h3>

``` js
shutdown -c
```

<h3>重启</h3>

``` js
shutdown –r now     // 系统立马重启
shutdown –r +10     // 系统十分钟后重启

poweroff --reboot
reboot
```

### 用户管理、切换

``` js
useradd (name)  // 新建用户
userdel (name)  // 删除用户

id (name)       // 检查都是新增和删除成功

passwd (name)   // 修改用户的密码
usermod (name)  // 修改用户的基本信息（如家目录，用户组）
change (name)   // 修改用户的基本信息(如密码过期时间)
```

### 组管理

``` js
groupadd (name) // 新建用户组
groupdel (name) // 删除用户组

su (name)       // 切换用户账号以及环境
sudo (name)     // 以其他用户身份执行命令(如执行root用户授权的命令) 
``` -->

## 文本处理
>awk、col、colrm、comm、csplit、ed、egrep、ex、fgrep、fmt、fold、grep、ispell、jed、joe、join、look、mtype、pico、rgrep、sed、sort、spell、tr、uniq、vi、wc

### tr

将字符进行替换、压缩、删除。

<h3>格式</h3>

``` js
tr [选项] [参数]
```

<h3>选项</h3>

``` js
-c    // 或 ——complerment：取代所有不属于第一字符集的字符；
-d    // 或——delete：删除所有属于第一字符集的字符；
-s    // 或--squeeze-repeats：把连续重复的字符以单独一个字符表示；
-t    // 或--truncate-set1：先删除第一字符集较第二字符集多出的字符。
-n    // 换行处理
```

<h3>案例</h3>

将输入字符由大写转换为小写：

``` js
echo "HELLO WORLD" | tr 'A-Z' 'a-z'   // hello world
cat tr.txt | tr 'A-Z' 'a-z' 
```

用-s压缩字符，可以压缩输入中重复的字符（可以理解为去重）

``` js
echo "thissss is      a text linnnnnnne." | tr -s ' sn'  // this is a text line.
cat tr.txt  | tr -s '1'  // 对字符串1做去重处理
```

使用tr删除字符：

``` js
echo "hello 123 world 456" | tr -d '0-9' // hello  world 
cat tr.txt | tr -d  '456' 
```

### wc

依次统计文件的 行数、字数、字节数。

<h3>格式</h3>

``` js
wc [选项] [参数]
```

<h3>选项</h3>

``` js
-l 或--lines             // 只显示行数。
-w 或--words             // 只显示字数。(以空格为分隔符区分的字数)
-c 或--bytes或--chars    // 只显示Bytes数（字节数）。
```

<h3>案例</h3>

``` js
wc -l *                 // 统计当前目录下的所有文件(非文件夹)行数及总计行数。
wc -l *.js              // 统计当前目录下的所有 .js 后缀的文件行数及总计行数。
find  . * | xargs wc -l // 当前目录以及子目录的所有文件行数及总计行数。
```

### xargs

给命令传递参数的一个过滤器，也是组合多个命令的一个工具。

<h3>格式</h3>

``` js
somecommand | xargs [选项] [参数]
```

<h3>选项</h3>

``` js
-n  // 多行输出
-d  // 分割输入
```

<h3>案例</h3>

``` js
cat xargs.txt | xargs                   // 多行输入单行输出
cat xargs.txt | xargs -n3               // 使用 -n 进行多行输出(3表示3列)
```

### sed

一种流编辑器，它是文本处理中非常重要的工具。一般用于对文本内容做替换(s)、删除(d)等。

<h3>格式</h3>

``` js
sed [选项] 's/old/new/g' [参数]
```

<h3>选项</h3>

``` js
-e       // 使用多个指令
-i       // 插入文本。注意：mac 环境演示不生效
```

<h3>案例</h3>

``` js
sed 's/book/books/g' test.txt   // 全局替换test.txt 文件中的book为books文本 

sed '2,5d' sed.txt 

sed '2d' test.txt               // 删除文件的第2行
sed '/^$/d' test.txt            // 删除test.txt文件中的空白行
sed '/^test/d' test.txt         // 删除test.txt文件中所有开头是test的行
sed -e '/^hello/d' -e '/^$/' test.txt // 删除以hello 开头的行和空白行
```

### awk

对sed的一种补充，一般用于对文本内容进行统计，按照需要的格式输出。一个awk脚本通常由：BEGIN语句块、能够使用模式匹配的通用语句块、END语句块3部分组成，这三个部分是可选的，如果没有提供pattern语句块，则默认执行{ print }。

<h3>格式</h3>

``` js
awk [选项] 'script' var=value (参数)
awk [选项] -f scriptfile var=value (参数)
```

<h3>选项</h3>

``` js
-v   // var=value 赋值一个用户定义变量，将外部变量传递给awk。

NR   // 表示记录数，在执行过程中对应于当前的行号。
```

<h3>案例</h3>

``` js
// 在第一行前添加Start，在第二行后添加End 。(echo 输出指定的字符串或者变量，-e 激活转义字符)。

cat wc.txt | awk 'BEGIN{ print "Start" } { print } END{ print "End" }'  

awk 'END{ print NR }' filename              // 统计文件中的行数          

val=10000
echo | awk -v myVal=$val '{ print myVal }'   // 将外部值 10000 传递给awk
```

条件判断语句

``` js
if(表达式)
  语句1
else
  语句2

案例：

awk 'BEGIN{
    test=100;
    if(test>90){
        print "very good";
    }else if(test>60){
        print "good";
    }else{
        print "no pass";
    }
}'
````

for循环

``` js
for(变量 in 数组)
  {语句}

awk 'BEGIN{
    for(k in ENVIRON){
        print k"="ENVIRON[k];   
    }
}'

// ENVIRON指系统环境变量
```

### uniq

显示或忽略相邻的重复行。

<h3>格式</h3>

``` js
uniq [选项] [参数]
```

<h3>选项</h3>

``` js
-c  // count 在每列旁边显示该行重复出现的次数。
-d  // repeated 仅显示重复出现的行列。
-u  // unique 打印非邻近的重复行。
```

<h3>案例</h3>

``` js
uniq uniq.txt // 相邻行的去重。
uniq -u uniq.txt   // 显示相邻行出现一次的文本。
``` 

### sort

将所有输入文件的内容排序后并输出。

<h3>格式</h3>

``` js
sort [选项] [参数]
```

<h3>选项</h3>

``` js
-r 或者 --reverse // 以相反顺序。
-u 或者 --unique  // 输出排序后去重的结果。
-n 或者 --numeric-sort   // 按照数字大小排序。
-k  // 通过一个key排序；KEYDEF给出位置和类型。
```

<h3>案例</h3>

``` js
sort -nrk 2 sort.txt // 按照大小、反序、指定第二行排序
```

### grep

是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。用于过滤/搜索的特定字符。

<h3>格式</h3>

``` js
grep "string" [选项] [参数]
```

<h3>选项</h3>

``` js
-i 或者 --ignore-case	// 忽略大小写
-v 或者 --revert-match	// 排除指定字符串  
-c 或者 --count         // 统计文件或者文本中包含匹配字符串的行数。   
```

<h3>案例</h3>

``` js
grep 'hello' -i test.txt  // 在test.txt文件中忽略大小写搜索出文本hello
grep 'hello' -v test.txt  // 在test.txt文件中搜索出排除hello的文本

grep 'hello' -ic grep.txt grep2.txt // 在多个文件中查找文本'hello'
```

### echo

输出指定的字符串或者变量。

<h3>格式</h3>

``` js
echo [选项] [参数]
```

<h3>选项</h3>

``` js
-n // 不换行
>  // 大于号，显示结果定向输出至文件
-e // 激活转义字符。
```

<h3>案例</h3>

文字闪动

``` js
echo 'hello\nworld'   //换行显示hello world，引号可以省略

echo '你很美' > echo.txt   // 把文本‘你很美’输出至 echo.txt 文件

echo -e "\033[37;31;5m愿以吾辈之青春，护佑这盛世之中华...\033[39;49;0m"
```

颜色码：重置=0，黑色=30，红色=31，绿色=32，黄色=33，蓝色=34，洋红=35，青色=36，白色=37
红色数字处还有其他数字参数：0 关闭所有属性、1 设置高亮度（加粗）、4 下划线、5 闪烁、7 反显、8 消隐

## 文件管理

### cp

将源文件或目录复制到目标文件或目录中。

<h3>格式</h3>

``` js
cp [选项] [参数]
```

<h3>选项</h3>

``` js
-f：  // 强行复制文件或目录，不论目标文件或目录是否已存在；
-i：  // 覆盖既有文件之前先询问用户；
-R/r：// 递归处理，将指定目录下的所有文件与子目录一并处理；
-u：  // 使用这项参数后只会在源文件的更改时间较目标文件更新时或是名称相互对应的目标文件并不存在时，才复制文件；
-v：  // 详细显示命令执行的操作
```

<h3>案例</h3>

``` js
cp -rv dir1 dir        // 把dir1文件夹以及其子目录文件递归copy到dir文件夹下，并显示copy过程
cp -rv dir1/ dir       // dir1后边的/表示不会copy最外层文件夹dir1
cp -rv dir1 ./dir/dir2 //  把dir1文件夹以及子文件copy到dir文件夹下，并重命名为dir2
```

### mv

用来对文件或目录重新命名，或者将文件从一个目录移到另一个目录中。如果将一个文件移到一个已经存在的目标文件中，则目标文件的内容将被覆盖。

<h3>格式</h3>

``` js
mv [选项] [参数]
```

<h3>选项</h3>

| 命令格式           | 运行结果  |
| ---------- | :-----|
| mv 文件名 文件名     | 将源文件名 `重命名` 为目标文件名 |
| mv 文件名 目录名     | 将文件 `移动` 到目标目录 |
| mv 目录名 目录名     | 目标目录已存在，将源目录`移动`到目标目录；目标目录不存在则 `重命名` |
| mv 目录名 文件名     | 出错 |

<h3>案例</h3>

``` js
mv sort.txt sortNew.txt   // 把sort.txt 文件重命名问sortNew.txt
mv more.txt ../dir        // 把more.txt 文件移动到../dir 目录
mv dir1 dir2              // 若dir2已存在，则dir1移动到dir2；若dir2不存在则重命名为dir2
```

### cut

用来显示行中的指定部分，删除文件中指定字段。

<h3>格式</h3>

``` js
cut [选项] [参数]
```

<h3>选项</h3>

``` js
-f： // 显示指定字段的内容；
-d： // 指定字段的分隔符，默认的字段分隔符为“TAB”；
-c   // 表示字符；
```

<h3>案例</h3>

使用 -f 选项提取指定字段（这里的 f 参数可以简单记忆为 --fields的缩写）

``` js
[root@localhost text]# cut -f2 -d";" cut.txt
Name
tom
jack
alex

cut -f-2 -d';' cut.txt    // 打印第2列及以前所有列
cut -f2 -d';' cut.txt    // 打印第2列
cut -f2- -d';' cut.txt   // 打印第2列及以后列
cut -f2-3 -d';' cut.txt  // 打印第2列及第3列

cut -c-2 cut.txt     // 打印第2个字符以及以前的字符
cut -c2 cut.txt     // 打印第2个字符
cut -c2- cut.txt    // 打印从第2个字符开始到结尾
cut -c2-7 cut.txt   // 打印第2个到第7个字符
```

### rm

用于删除给定的文件和目录。

注意：使用rm命令要格外小心。因为一旦删除了一个文件，就无法再恢复它。

<h3>格式</h3>

``` js
rm [选项] [参数]
```

<h3>选项</h3>

``` js
-f  // 强制删除文件或目录；
-i  // 删除已有文件或目录之前先询问用户；
-r或-R  // 递归处理，将指定目录下的所有文件与子目录一并处理；
--preserve-root  // 不对根目录进行递归操作；
-v       // 显示删除的过程
```

### head

显示文件的开头部分。

<h3>格式</h3>

``` js
head [选项] [参数]
```

<h3>选项</h3>

``` js
-n      // 指定默认行，可以省略，直接写数字
```

<h3>案例</h3>

``` js
head -3 head.txt          // 展示head.txt 文件的前三行
head -3 head.txt sort.txt // 展示head.txt 和 sort.txt 文件的前三行
```

### tail

在屏幕上显示指定文件的末尾若干行。

<h3>格式</h3>

``` js
tail [选项] [参数]
```

<h3>选项</h3>

``` js
-c  // 输出文件尾部的N（N为整数）个字节内容；
-f  //显示文件最新追加的内容。“name”表示以文件名的方式监视文件的变化。“-f”与“-fdescriptor”等效；
-F  // 连用时功能相同；
```

<h3>案例</h3>

``` js
tail tail.txt        // 默认显示tail.txt 文件的后10行
tail -4 tail.txt     // 显示tail.txt 文件的后4行
tail +20 tail.txt    // 从第20行至文件末尾
tail -c 10 tail.txt  // 显示文件file的最后10个字符
```

### file

用来探测给定文件的类型。

<h3>格式</h3>

``` js
file [选项] [参数]
```

<h3>选项</h3>

``` js
-b：   // 列出辨识结果时，不显示文件名称；
-c：   // 详细显示指令执行过程，便于排错或分析程序执行的情形；
-f：   // 指定名称文件，其内容有一个或多个文件名称时，让file依序辨识这些文件，格式为每列一个文件名称；
-i     // 显示MIME类别。
-L：   // 直接显示符号连接所指向的文件类别；
-m：   // 指定魔法数字文件；
-v：   // 显示版本信息；
-z：   // 尝试去解读压缩文件的内容。
```

<h3>案例</h3>

``` js
file wc.txt     // wc.txt: ASCII text
file -b wc.txt  // ASCII text
file -i wc.txt  // wc.txt: regular file 普通文件
```

### diff

比较2个文件的差异。

<h3>格式</h3>

``` js
diff [选项] [参数]
```

<h3>选项</h3>

``` js
-y 或 --side-by-side   // 以并列的方式显示文件的异同之处。
-W 或 --width 　       // 在使用-y参数时，指定栏宽。
-u 或 -unified         // 以合并的方式来显示文件内容的不同。
```

<h3>案例</h3>

``` js
diff -y test.txt index.txt           // 以并列的形式对比两个文件的不同
diff -y -W 50 test.txt index.txt     // 以并列并且指定行宽为50的形式对比两个文件的不同
diff -u test.txt index.txt           // 以合并的方式来显示文件内容的不同
```

### find

用来在指定目录下查找文件。

<h3>格式</h3>

``` js
find [选项] [参数]
```

<h3>选项</h3>

``` js
-name                // 按照文件名查找
-o 或 or             // 或者
-i 或 igonre         // 忽略大小消息
!                    // 否定参数

-size<文件大小>        // 查找符合指定的文件大小的文件
    文件大小单元：
    * b —— 块（512字节）
    * c —— 字节
    * w —— 字（2字节）
    * k —— 千字节
    * M —— 兆字节
    * G —— 吉字节

-mtime<24小时数>      // 查找在指定时间曾被更改过的文件或目录，单位以24小时计算；

-type<文件类型>       // 只寻找符合指定的文件类型的文件
    文件类型:
    * f 普通文件
    * d 目录
    * l 符号连接
    * c 字符设备
    * b 块设备
    * s 套接字
    * p Fifo
```

<h3>案例</h3>

``` js
find . -name "*.txt"                   // 在当前目录下查找以.txt结尾的文件名
find . -iname 'WC*'                    // 在当前目录下忽略大小写查找以WC开头的文件
find . -name "*.txt" -o -name "*.js"   // 当前目录及子目录下查找所有以.txt和.pdf结尾的文件
find . ! -name "*.txt"                 // 在当前目录下查找不是以.txt结尾的文件

find . -size +1k            // 搜索大于1KB的文件
find . -size  1k            // 搜索等于于1KB的文件
find . -size -1k            // 搜索小于1KB的文件

find . -mtime -2             // 查找最近2天内被修改过的所有文件
find . -mtime 2              // 查找恰好在2天前被修改过的所有文件 
find . -mtime +2             // 查找超过2天内被修改过的所有文件 

find . -type f              // 查找当前目录下文件类型是普通文件的所有文件
find . -type d              // 查找当前目录下文件类型是目录的所有文件
```

### less

分屏上下翻页浏览文件内容。

<h3>格式</h3>

``` js
less [选项] [参数]
```

<h3>选项</h3>

``` js
-e    // 文件内容显示完毕后，自动退出；
-N    // 每一行行首显示行号；
-s    // 将连续多个空行压缩成一行显示；
-S    // 在单行显示较长的内容，而不换行显示，多出文本的被隐藏；
```

<h3>案例</h3>

``` js
less -N sort.txt    // 在每一行行首显示行号
```

### more

显示文件内容，每次显示一屏。

<h3>格式</h3>

``` js
more [选项] [参数]
```

<h3>选项</h3>

``` js
按 Space 键：显示文本的下一屏内容。
按 Enter 键：只显示文本的下一行内容。
```

## 备份压缩
>ar、bunzip2、bzip2、bzip2recover、compress、cpio、dump、gunzip、gzexe、gzip、lha、restore、tar、unarj、unzip、zip、zipinfo


### tar

该格式仅打包，不压缩；想要既打包又压缩需配置压缩的格式：-z：有gzip属性；-j：有bz2属性的。

首先要弄清两个概念：`打包` 和 `压缩`:

* 打包是指将一大堆文件或目录变成一个总的文件；
* 压缩则是将一个大的文件通过一些压缩算法变成一个小文件。
  
为什么要区分这两个概念呢？

这源于Linux中很多压缩程序只能针对一个文件进行压缩，这样当你想要压缩一大堆文件时，
你得先将这一大堆文件先打成一个包（tar命令），然后再用压缩程序进行压缩（gzip bzip2命令）。

<h3>格式</h3>

``` js
tar [选项] [参数]
```

<h3>选项</h3>

``` js
-c 或 --create     // 打包，创建一个新归档
-x 或 --extract    // 解包
-f 或 --file       // 指定操作类型的文件(必须参数)
-t 或 --list       // 列出文件
-v 或 --verbose    // 详细地列出处理的文件
-r 或 --append     // 是表示增加文件的意思
-u 或 --update     // 是表示更新文件的意思
```

<h3>案例</h3>

压缩方式总的说是2大类：第一种是 tar 方式压缩；

``` js
-z：有gzip属性
-j：有bz2属性
-J：有xz属性

// 仅打包，不压缩
tar -cvf test.tar awk.txt awkcp.txt    // 把 awk.txt 和 awkcp.txt 文件打成一个 test.tar 包
tar -tvf test.tar                      // 查看 test.tar 包都包含哪些文件
tar -xvf test.tar                      // 解压 test.tar 压缩包

// 打包后压缩
tar -zcvf test.tar.gz test.txt       // 把 test.txt文件，打成 test.tar.gz 包后，以 gzip 格式压缩
tar -jcvf test.tar.bz2 test.txt      // 把 test.txt文件，打成 test.tar.bz2 包后，以 bzip2 格式压缩
```

::: tip tar -cvf 与 tar cvf 有什么区别?
这两个命令是等效的。- 的应用范围是参数分开使用的情况，连续无分隔参数可以不使用 -。
:::

第二种是非 tar 方式压缩，是根据各种格式压缩。压缩文件格式有很多种：.zip、.gz、.bz2、.xz、.jar .....

### zip

用来解压缩文件，或者对文件进行打包操作。zip是个使用广泛的压缩程序，文件经它压缩后会另外产生具有“.zip”扩展名的压缩文件。

<h3>格式</h3>

``` js
zip [选项] [目标文件名].zip [原文件/目录名]
```

<h3>选项</h3>

```js
-r  // 递归处理
-q  // 不显示指令执行过程
-u  // 更换较新的文件到压缩文件内
```

<h3>格式</h3>

``` js
unzip [选项] [原文件名].zip
```

<h3>选项</h3>

```js
-l  // 查看压缩包都包含哪些文件
```

### gzip

用来压缩文件。gzip是个使用广泛的压缩程序，文件经它压缩过后，其名称后面会多处“.gz”扩展名。

压缩

```js
gzip [原文件名]

// 压缩之后，源文件被删除了
```

解压缩

```js
gunzip [原文件名].tar.gz

// 解压之后原压缩包被删除了
```

<h3>选项</h3>

```js
-l  // 查看压缩包都包含哪些文件
```

### bzip2

用于创建和管理（包括解压缩）“.bz2”格式的压缩包（利用已经打包好的tar文件，直接执行压缩命令)。

压缩

```js
bzip2 [原文件名]

// 压缩之后，源文件被删除了
```

解压

```js
bunzip2 [原文件名].tar.bz2

// 解压之后原压缩包被删除了
```

### jar

用于创建和管理（包括解压缩）.jar格式的压缩包。

压缩

```js
jar cvf [目标文件名].jar [原文件名/目录名]
```

解压

```js
jar xvf [原文件名].jar

// 解压之后会生成 META-INF 文件夹
```

## 磁盘管理
>cd、df、dirs、du、edquota、eject、lndir、ls、mcd、mdeltree、mdu、mkdir、mlabel、mmd、mmount、mrd、mzip、pwd、quota、quotacheck、quotaoff、quotaon、repquota、rmdir、rmt、stat、tree、umount

### stat

用于显示文件的状态信息(显示inode内容)。stat命令的输出信息比ls命令的输出信息要更详细。

> 索引节点（index inode简称为“inode”）是Linux中一个特殊的概念，具有相同的索引节点号的两个文本本质上是同一个文件（除文件名不同外）

<h3>格式</h3>

``` js
stat [选项] [参数]
```

<h3>选项</h3>

``` js
-L   // 支持符号连接；
-f   // 显示文件系统状态而非文件状态；
-t   // 以简洁方式输出信息；
--help   // 显示指令的帮助信息；
--version   // 显示指令的版本信息。
```

<h3>案例</h3>

``` js
# stat testfile         // 输入命令

  File: `testfile'
  Size: 102             Blocks: 8          IO Block: 4096   regular file
Device: 807h/2055d      Inode: 1265161     Links: 1
Access: (0644/-rw-r--r--)  Uid: (    0/    root)   Gid: (    0/    root)
Access: 2014-08-13 14:07:20.000000000 +0800
Modify: 2014-08-13 14:07:07.000000000 +0800
Change: 2014-08-13 14:07:07.000000000 +0800

// 与 mac 终端显示内容有出入
```

### ls 

显示目录内容列表。

<h3>格式</h3>

``` js
ls [选项] [文件名...]
```

<h3>选项</h3>

``` js
-a 或 --all             // 列出所有文件，包括隐藏文件。
-1 或 --format=single-column   // 长格式显示文件
-t 或 --sort=time       // 按时间顺序显示
-r 或 -reverse          // 逆序显示
-R 或 -recursive        // 递归显示
-m 或 --format=commas    // 水平列出文件，每行尽可能多，相互用逗号和一个空格分隔。
-hl                     // 列出详细信息并以可读大小显示文件大小
```

### df

df命令 用于显示磁盘分区上的可使用的磁盘空间。默认显示单位为KB。可以利用该命令来获取硬盘被占用了多少空间，目前还剩下多少空间等信息。

<h3>格式</h3>

``` js
df [选项] [参数]
```

<h3>选项</h3>

``` js
-a          // 包含全部的文件系统；
-b          // 以指定的区块大小来显示区块数目；
-h          // 以可读性较高的方式来显示信息；
```

<h3>案例</h3>

``` js
df
Filesystem                      512-blocks      Used Available Capacity iused      ifree %iused  Mounted on
/dev/disk1s5                        489620264  21762448 199648696    10%  487453 2447613867    0%   /
devfs                                   377       377         0   100%     654          0  100%   /dev
/dev/disk1s1                        489620264 264647960 199648696    57% 2736183 2445365137    0%   /System/Volumes/Data
/dev/disk1s4                     489620264   2097192 199648696     2%       1 2448101319    0%   /private/var/vm
map auto_home                               0         0         0   100%       0          0  100%   /


df -h
Filesystem                          Size   Used  Avail Capacity iused      ifree %iused  Mounted on
/dev/disk1s5                        233Gi   10Gi   95Gi    10%  487453 2447613867    0%   /
devfs                               188Ki  188Ki    0Bi   100%     650          0  100%   /dev
/dev/disk1s1                        233Gi  126Gi   95Gi    58% 2736792 2445364528    0%   /System/Volumes/Data
/dev/disk1s4                        233Gi  1.0Gi   95Gi     2%       1 2448101319    0%   /private/var/vm
map auto_home                        0Bi    0Bi    0Bi   100%       0          0  100%   /System/Volumes/Data/home

df -a
Filesystem                 512-blocks      Used Available Capacity iused      ifree %iused  Mounted on
/dev/disk1s5                489620264  21762448 199614504    10%  487453 2447613867    0%   /
devfs                             375       375         0   100%     650          0  100%   /dev
/dev/disk1s1                489620264 264682152 199614504    58% 2736912 2445364408    0%   /System/Volumes/Data
/dev/disk1s4                489620264   2097192 199614504     2%       1 2448101319    0%   /private/var/vm
map auto_home                       0         0         0   100%       0          0  100%   /System/Volumes/Data/home

df .    // 显示当前目录中的可用空间量
Filesystem   512-blocks      Used Available Capacity iused      ifree %iused  Mounted on
/dev/disk1s1  489620264 264689784 199606872    58% 2736946 2445364374    0%   /System/Volumes/Data
```

### du

du命令 也是查看使用空间的，但是与df命令不同的是 du命令是对文件和目录磁盘使用的空间的查看。

<h3>格式</h3>

``` js
du [选项] [参数]
```

<h3>选项</h3>

``` js
-a或-all       // 显示目录中个别文件的大小。
-s或--summarize    // 仅显示总计，只列出最后加总的值。
-h或--human-readable // 以K，M，G为单位，提高信息的可读性。
-b或-bytes     // 显示目录或文件大小时，以byte为单位。
-c或--total     // 除了显示个别目录或文件的大小外，同时也显示所有目录或文件的总和。
-k或--kilobytes    // 以KB(1024bytes)为单位输出。
-m或--megabytes    // 以MB为单位输出。
```

<h3>案例</h3>

``` js
du test.txt             // 显示指定文件所占空间
du test.txt index.txt   // 显示多个文件所占空间
du -ah .                // 高可读性显示当前目录的信息
```

### ulmit

用来限制系统用户对shell资源的访问。

<h3>格式</h3>

``` js
ulimit [选项] 
```

<h3>选项</h3>

``` js
-a： // 显示目前资源限制的设定；
-c <core文件上限>： // 设定core文件的最大值，单位为区块；
-d <数据节区大小>： // 程序数据节区的最大值，单位为KB；
-e  // 默认进程优先级, 值越小优先级越高
-f <文件大小>： // shell所能建立的最大文件，单位为区块；
-H： // 设定资源的硬性限制，也就是管理员所设下的限制；
-m <内存大小>： // 指定可使用内存的上限，单位为KB；
-n <文件数目>： // 指定同一时间最多可开启的文件数；
```

<h3>案例</h3>

``` js
ulimit -a

core file size          (blocks, -c) 0           // core文件的最大值为100 blocks。
data seg size           (kbytes, -d) unlimited   // 进程的数据段可以任意大。
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited   // 文件可以任意大。
pending signals                 (-i) 98304       // 最多有98304个待处理的信号。
max locked memory       (kbytes, -l) 32          // 一个任务锁住的物理内存的最大值为32KB。
max memory size         (kbytes, -m) unlimited   // 一个任务的常驻物理内存的最大值。
open files                      (-n) 1024        // 一个任务最多可以同时打开1024的文件。
pipe size            (512 bytes, -p) 8           // 管道的最大空间为4096字节。
POSIX message queues     (bytes, -q) 819200      // POSIX的消息队列的最大值为819200字节。
real-time priority              (-r) 0
stack size              (kbytes, -s) 10240       // 进程的栈的最大值为10240字节。
cpu time               (seconds, -t) unlimited   // 进程使用的CPU时间。
max user processes              (-u) 98304       // 当前用户同时打开的进程（包括线程）的最大个数为98304。
virtual memory          (kbytes, -v) unlimited   // 没有限制进程的最大地址空间。
file locks                      (-x) unlimited   // 所能锁住的文件的最大个数没有限制。

```

## 系统管理
>adduser、chfn、chsh、date、exit、finger、free、fwhois、gitps、groupdel、groupmod、halt、id、kill、last、lastb、login、logname、logout、logrotate、newgrp、nice、procinfo、ps、pstree、reboot、renice、rlogin、rsh、rwho、screen、shutdown、sliplogin、su、sudo、suspend、swatch、tload、top、uname、useradd、userconf、userdel、usermod、vlock、w、who、whoami、whois

### who

显示目前登录系统的用户信息。

<h3>格式</h3>

``` js
who [选项] [参数]
```

<h3>选项</h3>

``` js
-H   // 或--heading：显示各栏位的标题信息列；(重要)
-q   // 或--count：只显示登入系统的帐号名称和总人数；
```

<h3>案例</h3>

``` js
who

zhangfangchao console  May 14 18:45 
zhangfangchao ttys000  May 14 18:45 

who -H 

USER          LINE     WHEN         
zhangfangchao console  May 14 18:45 
zhangfangchao ttys000  May 14 18:45 

who -q

zhangfangchao zhangfangchao 
# users = 2
```

### last

列出目前与过去登入系统的用户相关信息.单独执行last命令，它会读取/var/log/wtmp的文件，并把该给文件的内容记录的登入系统的用户名单全部显示出来。

<h3>格式</h3>

``` js
last [选项] [参数]
```

<h3>选项</h3>

``` js
-n   // <显示列数>或-<显示列数>：设置列出名单的显示列数；
-a   // 把从何处登入系统的主机名称或ip地址，显示在最后一行；
```

<h3>案例</h3>

``` js
last -4 // 仅显示前4行
```

### id

打印真实以及有效的用户和所在组的信息。

<h3>格式</h3>

``` js
id [选项] [用户名]
```

<h3>选项</h3>

``` js
-u 或--user 　  // 显示用户ID。
-g 或--group 　 // 显示用户所属群组的ID。
-G 或--groups   // 显示用户所属附加群组的ID。
-n 或--name 　  // 显示用户，所属群组或附加群组的名称。
```

<h3>案例</h3>

``` js
id

uid=501(zhangfangchao) gid=20(staff) groups=20(staff),12(everyone),61(localaccounts),79(_appserverusr),80(admin),81(_appserveradm),98(_lpadmin),33(_appstore),100(_lpoperator),204(_developer),250(_analyticsusers),395(com.apple.access_ftp),398(com.apple.access_screensharing),399(com.apple.access_ssh),400(com.apple.access_remote_ae),701(com.apple.sharepoint.group.1)
```

### top

显示或管理执行中的程序。可以实时动态地查看系统的整体运行情况，是一个综合了多方信息监测系统性能和运行信息的实用工具。
(类似活动监视器)

<h3>格式</h3>

``` js
top [选项]
```

<h3>选项</h3>

``` js
-c  // 显示完整命令
-b  // 以批处理模式显示程序信息
-S  // 以累积模式显示程序信息
-p  // 显示指定的进程信息
```

<h3>案例</h3>

``` js
top         // 显示进程信息
top -d 3    // 设置更新周期为3秒
top -p 139  // 显示指定的进程信息(139 为指定 pid)
top -k      // 终止一个进程
top -M      // 根据驻留内存大小进行排序
top -P      // 根据CPU使用百分比大小进行排序；
```

``` js
# top

top - 09:44:56 up 16 days, 21:23,  1 user,  load average: 9.59, 4.75, 1.92
Tasks: 145 total,   2 running, 143 sleeping,   0 stopped,   0 zombie
Cpu(s): 99.8%us,  0.1%sy,  0.0%ni,  0.2%id,  0.0%wa,  0.0%hi,  0.0%si,  0.0%st
Mem:   4147888k total,  2493092k used,  1654796k free,   158188k buffers
Swap:  5144568k total,       56k used,  5144512k free,  2013180k cached

解释：

top - 09:44:56[当前系统时间],
16 days[系统已经运行了16天],
1 user[个用户当前登录],
load average: 9.59, 4.75, 1.92[系统负载，即任务队列的平均长度]
Tasks: 145 total[总进程数],
2 running[正在运行的进程数],
143 sleeping[睡眠的进程数],
0 stopped[停止的进程数],
0 zombie[冻结进程数],
Cpu(s): 99.8%us[用户空间占用CPU百分比],
0.1%sy[内核空间占用CPU百分比],
0.0%ni[用户进程空间内改变过优先级的进程占用CPU百分比],
0.2%id[空闲CPU百分比], 0.0%wa[等待输入输出的CPU时间百分比],
0.0%hi[],
0.0%st[],
Mem: 4147888k total[物理内存总量],
2493092k used[使用的物理内存总量],
1654796k free[空闲内存总量],
158188k buffers[用作内核缓存的内存量]
Swap: 5144568k total[交换区总量],
56k used[使用的交换区总量],
5144512k free[空闲交换区总量],
2013180k cached[缓冲的交换区总量],
```

### sleep

将目前动作延迟一段时间。时间长度，后面可接 s、m、h 或 d，其中 s 为秒，m 为 分钟，h 为小时，d 为日数。

<h3>格式</h3>

``` js
sleep [参数]
```

<h3>案例</h3>

``` js
date;sleep 3s;date  // 显示目前时间后延迟 3 秒钟，之后再次显示时间
```

### iotop

用来监视磁盘I/O使用状况的工具。

<h3>格式</h3>

``` js
iotop [选项]
```

<h3>选项</h3>

``` js
-o  // 只显示有io操作的进程
-b   // 批量显示，无交互，主要用作记录到文件。
-n  // 显示NUM次，主要用于非交互式模式。
-d   // 间隔SEC秒显示一次。
-p  // 监控的进程pid。
-u  // 监控的进程用户。
```

[Mac OS 安装Wget](https://www.cnblogs.com/exmyth/p/10722625.html)

### printenv

显示指定的环境变量的值。如果没有指定变量，则打印出所有变量的名称和值。

<h3>格式</h3>

``` js
printenv [参数]
```

<h3>选项</h3>

``` js
USER
PATH
HOME
LOGNAME
```

<h3>案例</h3>

``` js
printenv

SHELL=/bin/zsh
TERM=xterm-256color
TMPDIR=/var/folders/tb/qswrrtvx47x543bnvqz8y6k00000gn/T/
TERM_PROGRAM_VERSION=433
TERM_SESSION_ID=B6C22423-5320-4731-9031-E7F72267CB64
USER=zhangfangchao
SSH_AUTH_SOCK=/private/tmp/com.apple.launchd.wb50zRnwQI/Listeners
PATH=/Users/zhangfangchao/.nvm/versions/node/v10.16.2/bin:/Library/Java/JavaVirtualMachines/jdk-12.0.1.jdk/Contents/Home/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/sbin:/Library/Apple/usr/bin:.:/Users/zhangfangchao/flutter/bin
LaunchInstanceID=42DA4D14-E138-4302-A159-270B3F4D4170
PWD=/Users/zhangfangchao/linux-test
LANG=zh_CN.UTF-8
```



## 网络通讯
>dip、getty、mingetty、ppp-off、smbd(samba daemon)、telnet、uulog、uustat、uux、cu、dnsconf、efax、httpd、ip、ifconfig、mesg、minicom、nc、netconf、netconfig、netstat、ping、pppstats、samba、setserial、shapecfg(shaper configuration)、smbd(samba daemon)、statserial(status ofserial port)、talk、tcpdump、testparm(test parameter)、traceroute、tty(teletypewriter)、uuname、wall(write all)、write、ytalk、arpwatch、apachectl、smbclient(samba client)、pppsetup

### traceroute

显示数据包在网络上的传输时的全部路径，它默认发送的数据包大小是40字节。

<h3>格式</h3>

``` js
traceroute [选项] [参数]
```

<h3>选项</h3>

``` js
-m     // 设置检测数据包的最大存活数值TTL的大小；
-n     // 直接使用IP地址而非主机名称；
-p    // 设置UDP传输协议的通信端口；
-r     // 忽略普通的Routing Table，直接将数据包送到远端主机上。
-w    // 设置等待远端主机回报的时间；
```

<h3>案例</h3>

``` js
traceroute -m 10 www.baidu.com //  跳数设置
traceroute -n www.baidu.com    //  显示IP地址，不查主机名
traceroute -p 6888 www.baidu.com  //  探测包使用的基本UDP端口设置6888
traceroute -q 4 www.baidu.com  //  把探测包的个数设置为值4
traceroute -r www.baidu.com    //  绕过正常的路由表，直接发送到网络相连的主机
traceroute -w 3 www.baidu.com  //  把对外发探测包的等待响应时间设置为3秒
```

### sysctl

时动态地修改内核的运行参数。

<h3>格式</h3>

``` js
sysctl [选项] [参数]
```

<h3>选项</h3>

``` js
-a // 打印当前所有可用的内核参数变量和值；
```

<h3>案例</h3>

``` js
sysctl -a   // 查看所有可读变量
```

### strace

跟踪系统调用和信号

### mtr

网络连通性判断工具


### ifconfig

配置和显示Linux系统网卡的网络参数。

<h3>格式</h3>

``` js
ifconfig[参数]
```

<h3>选项</h3>

``` js
add<地址>： // 设置网络设备IPv6的ip地址；
del<地址>：  // 删除网络设备IPv6的IP地址；
down：  // 关闭指定的网络设备；
<hw<网络设备类型><硬件地址>：  // 设置网络设备的类型与硬件地址；
io_addr<I/O地址>：  // 设置网络设备的I/O地址；
irq<IRQ地址>：  // 设置网络设备的IRQ；
media<网络媒介类型>：  // 设置网络设备的媒介类型；
mem_start<内存地址>：  // 设置网络设备在主内存所占用的起始地址；
metric<数目>：  // 指定在计算数据包的转送次数时，所要加上的数目；
mtu<字节>：  // 设置网络设备的MTU；
netmask<子网掩码>：  // 设置网络设备的子网掩码；
tunnel<地址>：  // 建立IPv4与IPv6之间的隧道通信地址；
up：  // 启动指定的网络设备；
-broadcast<地址>：  // 将要送往指定地址的数据包当成广播数据包来处理；
-pointopoint<地址>：  // 与指定地址的网络设备建立直接连线，此模式具有保密功能；
-promisc：  // 关闭或启动指定网络设备的promiscuous模式；
IP地址：  // 指  // 定网络设备的IP地址；
网络设备：  // 指定网络设备的名称。
```

<h3>案例</h3>

``` js
// 启动关闭指定网卡，ssh登陆linux服务器操作要小心，关闭了就不能开启了，除非你有多网卡。
ifconfig eth0 up
ifconfig eth0 down

// 启用和关闭arp协议：
ifconfig eth0 arp    // 开启网卡eth0 的arp协议
ifconfig eth0 -arp   // 关闭网卡eth0 的arp协议

// 为网卡配置和删除IPv6地址
ifconfig eth0 add 33ffe:3240:800:1005::2/64   
ifconfig eth0 del 33ffe:3240:800:1005::2/64    
```

### nc

nc命令 全称netcat，用于设置路由器。它能通过 TCP 和 UDP 在网络中读写数据。通过与其他工具结合和重定向，你可以在脚本中以多种方式使用它。使用 netcat 命令所能完成的事情令人惊讶。

<h3>格式</h3>

``` js
nc [选项] [主机名称][通信端口...]
```

<h3>选项</h3>

``` js
-n  // 直接使用IP地址，而不通过域名服务器。
-u  //使用UDP传输协议。
-v  //显示指令执行过程。
-w  //设置等待连线的时间。
-z  // 只在扫描通信端口时使用。
```

<h3>案例</h3>

``` js
nc -u -z -w2 172.17.3.207 1-100 // 扫描172.17.3.207 的端口 范围是 1-100 扫描UDP端口
nc -u -z -w2 172.17.3.207 7008 // 扫描指定端口
或者
nc -nvv 172.17.3.207 7008       
```

### netstat

netstat命令 用来打印Linux中网络系统的状态信息，可让你得知整个Linux系统的网络情况。

<h3>格式</h3>

``` js
netstat [选项]
```

<h3>选项</h3>

``` js
-a或--all：     // 显示所有连线中的Socket；
-l或--listening：// 显示监控中的服务器的Socket；
-s或--statistice：// 显示网络工作信息统计表；
-t或--tcp：     // 显示TCP传输协议的连线状况；
-u或--udp：     // 显示UDP传输协议的连线状况；
```

<h3>案例</h3>

``` js
// 列出所有端口 (包括监听和未监听的)
netstat -a     // 列出所有端口
netstat -at    // 列出所有tcp端口
netstat -au    // 列出所有udp端口  

// 列出所有处于监听状态的 Sockets
netstat -l        // 只显示监听端口
netstat -lt       // 只列出所有监听 tcp 端口
netstat -lu       // 只列出所有监听 udp 端口
netstat -lx       // 只列出所有监听 UNIX 端口

// 显示每个协议的统计信息
netstat -s     // 显示所有端口的统计信息
netstat -st   // 显示TCP端口的统计信息
netstat -su   // 显示UDP端口的统计信息

netstat -r     // 显示核心路由信息

netstat -i    // 显示网络接口列表
```

### iptables

iptables命令 是Linux上常用的防火墙软件，是netfilter项目的一部分。

<h3>格式</h3>

``` js
iptables [选项] [参数]
```

<h3>选项</h3>

``` js
-t  // --table table 对指定的表 table 进行操作， table 必须是 raw， nat，filter，mangle 中的一个。如果不指定此选项，默认的是 filter 表。
-L //--list [chain] 列出链 chain 上面的所有规则，如果没有指定链，列出表上所有链的所有规则。

-A // --append chain rule-specification 在指定链 chain 的末尾插入指定的规则，也就是说，这条规则会被放到最后，最后才会被执行。规则是由后面的匹配来指定。
```

<h3>案例</h3>

``` js
iptables -F  // 清空所有的防火墙规则
iptables -X  // 删除用户自定义的空链
iptables -Z  // 清空计数

```

### service 

service命令 是Redhat Linux兼容的发行版中用来控制系统服务的实用工具，它以启动、停止、重新启动和关闭系统服务，还可以显示所有系统服务的当前状态。

<h3>格式</h3>

``` js
service [选项] [参数]
```

<h3>选项</h3>

``` js
-h          // 显示帮助信息；
--status-all    // 显示所服务的状态。
```

<h3>案例</h3>

``` js


```


### tcpdump

tcpdump命令 是一款抓包，嗅探器工具，它可以打印所有经过网络接口的数据包的头信息，也可以使用-w选项将数据包保存到文件中，方便以后分析。

<h3>格式</h3>

``` js
tcpdump [选项]
```

<h3>选项</h3>

``` js
-c  // 收到指定的数据包数目后，就停止进行倾倒操作。
-q  // 快速输出，仅列出少数的传输协议信息。
-d   // 把编译过的数据包编码转换成可阅读的格式，并倾倒到标准输出。
-ddd  //把编译过的数据包编码转换成十进制数字的格式，并倾倒到标准输出。
```

<h3>案例</h3>

``` js
tcpdump             // 显示TCP包信息
tcpdump -c 10       // 显示指定数量包
tcpdump -c 10 -q    // 精简模式显示 10个包
```

## 电子邮件与新闻组
>archive、ctlinnd、elm、getlist、inncheck、mail、mailconf、mailq、messages、metamail、mutt、nntpget、pine、slrn、X WINDOWS SYSTEM、reconfig、startx(start X Window)、Xconfigurator、XF86Setup、xlsatoms、xlsclients、xlsfonts

### systemd

是 Linux 系统工具，用来启动守护进程。systemctl是 Systemd 的主命令，用于管理系统。

<h3>案例</h3>

``` js
// 重启系统
systemctl reboot

// 关闭系统，切断电源
systemctl poweroff

// 暂停系统
systemctl suspend
```

### system-anlyze

用于查看启动耗时。

<h3>案例</h3>

``` js
// 查看启动耗时
systemd-analyze                                                                                       

// 查看每个服务的启动耗时
systemd-analyze blame
```

### pscp

Windows与Linux之间传输文件的工具。

### pslurp

将远程主机的文件批量复制到本地，与pscp.pssh命令功能相反。


### lsof

当前已打开的所有文件列表

<h3>格式</h3>

``` js
lsof [选项] 
```

<h3>选项</h3>

``` js
-n  // <目录>：列出使用NFS的文件(表头)；
```

<h3>案例</h3>

``` js
lsof -n 
```