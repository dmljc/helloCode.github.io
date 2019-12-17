# 工具 Git 

## 全能图

![](https://t1.picb.cc/uploads/2019/09/09/gXSUxe.jpg)

注：此图借鉴自业界响当当的人物阮一峰老师。

## Rebase 

该命令可以让和 `merge` 命令得到的结果基本是一致的。

通常使用 `merge` 操作将分支上的代码合并到 `master` 中，分支样子如下所示

![](https://t1.picb.cc/uploads/2019/09/09/gXjARg.md.png)

使用 `rebase` 后，会将 `develop` 上的 `commit` 按顺序移到 `master` 的第三个 `commit` 后面，分支样子如下所示

![](https://t1.picb.cc/uploads/2019/09/09/gXp4ST.png)

使用 rebase 应该在需要被 rebase 的分支上操作，并且该分支是本地分支。如果 `develop` 分支需要 rebase 到 `master` 上去，那么应该如下操作

``` js
// current branch develop
git rebase master

git checkout master
// 用于将 master 上的 HEAD 移动到最新的 commit
git merge develop
```
rebase 对比 merge，优势在于合并后的结果很清晰，只有一条线，劣势在于如果一旦出现冲突，解决冲突很麻烦，可能要解决多个冲突，但是 merge 出现冲突只需要解决一次。

## Stash

`stash` 用于临时保存工作目录的改动。开发中可能会遇到代码写一半需要切分支打包的问题，如果这时候你不想 `commit` 的话，就可以使用该命令。

<h3>储藏操作：</h3>

``` js
git stash

// 或者你想给 stash 填写储藏信息可以使用 save，类似填写 commit 信息

git stash save 'message'
```
::: warning 注意：
没有被 track 的文件 不会被 stash 起来，因为 Git 会忽略它们。如果想把这些文件也一起 stash，可以加上 `-u` 参数，它是 `--include-untracked` 的简写。就像这样：git stash -u
::: 

<h3>取出操作：</h3>

``` js
// 取出最近一次暂存并删除记录列表中对应记录
git stash pop

// 或者你储藏的操作不止一次，可以通过 apply 取出相应的记录

git stash apply stash@{X} // X 是指定的 stash 版本。但是，相对 pop 列表中对应记录还在
```
这样你之前临时保存的代码又回来了。

<h3>查看现有 stash </h3>

``` js
git stash list
```
<h3>移除 stash </h3>

``` js
git stash drop stash@{0}  // 将记录列表中取出的对应暂存记录删除

git stash clear // 删除所有缓存的stash
```
## Reset

HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭

```js
// 撤销最新的 commit
git reset --hard HEAD^

// 撤销指定的 commit
git reset --hard commit_id

// 穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。
// 要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本。
```

但是 `reset` 的本质并不是删除了 commit，而是重新设置了 HEAD 和它指向的 branch。

## Commit

如果在未 push 之前想修改 commit 可以采用 amend 「修正」 

``` js
// 修改最新的 commit 信息
git commit -amend

// 修改指定的 commit 修改
git rebase -i commit_id  // 父级commit_id

// 然后，跳出 vim 界面
pick be12bef 我是修改之前的倒数第二个 commit 信息
pick bf232ne 我是修改之前的倒数第一个 commit 信息

// 假如我想修改倒数第一个的 commit 信息
pick be12bef 我是修改之前的倒数第二个 commit 信息
r bf232ne 修改之后的倒数第一个 commit 信息！！
```
修改完之后，点击 esc :wq 保存退出。

<!-- 对于已经 push 的修改使用 revert。你希望撤销哪个 commit，就把它填在后面

``` js
git revert HEAD^
``` -->
## Checkout

checkout 除了切换分支，还可以把未 add 的本地修改撤销

``` js
git checkout 目标文件

// 撤销本地全部的修改
git checkout .
```