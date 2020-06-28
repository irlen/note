### 一.创建版本库（repository）
  创建一个空目录，并初始化
  mkdir learngit
  cd learngit
  git init
  git init --bare //初始化一个纯版本目录，不带本地仓库
### 二.把文件添加到版本库
  建一个文件，并告诉git把文件添加到仓库
  touch readme.txt
  git add readme.txt  //文件添加到仓库
  git commit -m '描述内容' //把文件提交到git仓库


### 三.时光穿梭机
  1.版本回退
    git status //git会告诉我们是否有改动，改动是否提交，但不会告诉我们具体改动的地方
    git diff readme.txt //git会告诉你readme.txt文件里面具体被改动的地方
    每次修改文件或者文件夹后需要做两个操作，
    git add  (文件或者文件夹)
    git commit -m '描述'
    git log 显示最近到最远的提交日志
    回退到某个版本，HEAD表示当前版本，HEAD^表示上一个版本 HEAD~100表示往上数第一百个版本
    git reset --hard HEAD^
    git reset --hard 190dee23dkd //后面为要回退版本的id,只用写前几位就可以了
    如果回退到某个版本，又后悔了想回到之前的版本，这个时候没有id
    git reflog //会显示之前每次的命令

  2.工作区和暂存区以及本地版本库
    工作区(Working Directory)
    即电脑里能看到的目录，你自己本地编辑的代码文件
    工作区里面有个隐藏目录.git，这个不算工作区，而是Git的版本库（repository）
    版本库里有个暂存区（stage或者index），还有自动创建的分支master,以及指向分支的指针HEAD
    之前把文件往版本库里添加的时候分两步操作
    git add 是把文件修改添加到暂存区
    git commit 是把暂存区所有内容提交到当前分支
    git checkout --readme.txt 丢弃工作区的修改（即回到最近一次git commit或者git add的状态）

  3.管理修改
  删除版本库中的文件
  git rm test.txt 并且commit

### 四.远程仓库
  1.添加远程库并推送本地仓库到远程仓库
    linux设置ssh秘钥
    ssh-keygen -t rsa -C 'wangyangruoshi@163.com'
    将公钥添加到github，github中新建仓库(new repository)
    在本地关联远程仓库
    git remote add origin git@github.com:irlen/learngit.git
    将本地仓库的内容推送到远程仓库
    git push -u origin master  (第一次推送加上-u，不仅推送还会关联，之后推送拉取都可以简化命令)
  2.从远程库克隆
    git clone git@github.com:irlen/gitskills.git

### 五.分支管理
  1.创建与合并分支
    创建dev分支，并切换到dev分支
    git checkout -b dev (-b参数表示创建并切换,相当于git branch dev 和 git checkout dev两个命令)
    git branch 查看当前分支
    将dev分支合并到master分支
    git checkout master
    git merge dev
    删除dev分支
    git branch -d dev
  2.解决冲突
    两个分支改了同一个地方合并的时候发生冲突
    git status 可查看冲突的是哪个文件
    git会用《《《《《 ==========》》》》》》表示出不同，改统一后再git add 和 git commit
    git log --graph 可以看到分支合并图
  3.分支管理策略
    合并分支时，git会用Fast forward模式，这种模式删除分支后会丢掉分支信息。
    禁用Fast forward模式，从分支历史就可以看出分支信息
    git merge --no-ff -m 'merge with no-off' dev
    实际开发中，master分支应该是相当稳定，只用来发布新版本，平时不能在上面干活，干活都在dev分支上，每个人都有自己的dev分支，时不时的往dev分支上合并
  4.暂存和删除未合并分支
    当你在dev分支上开发到一半，突然要在maser上新建一个bug分支来改bug,这个时候dev分支因为不能提交，需要暂存起来
    git stash 暂存现有分支为提交的内容
    git stash list 列出暂存的工作现场
    git stash pop 恢复工作现场并删除暂存 (相当于git stash apply 和 git stash drop 两个命令的结果)
    当你开发一个新功能分支，然后上面告诉你这个并能不要了，那你需要将这个功能分支删除(要用大写-D 参数)
    git branch -D branchName
  5.多人协作
    git remote -v 显示远程仓库的详细细信息
    推送分支,要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上
    git push origin master
    并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？
      master分支是主分支，因此要时刻与远程同步；
      dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
      bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
      feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。
    抓取分支
      当从远程库克隆时，默认只能看到本地的master分支，但是需要在dev分支上开发，这时候需要做以下操作
      创建远程origin的dev分支到本地
      git checkout -b dev origin/dev
      假如git add 和git commit之后，git push origin dev 将dev分支推送到远程，此段时间别人也在将本地dev推送到远程，
      此时有可能发生冲突，发生冲突如何解决：
      git pull 将最新的提交从远程当前分支抓下来合并再提交
      这是git pull也失败了，怎么办：
      原因是没有指定本地dev分支和远程orgin/dev分支的链接，需要设置：
      git branch --set-upstream-to=origin/dev dev
      然后再git pull,会自动合并，若合并有冲突，可以修改冲突再提交git commit ,git push
### 六.标签管理
  1.创建标签
  tag就是一个让人容易记住的有意义的名字，它跟某个commit绑在一起
  切换到要打标签的分支，比如dev分支
  git checkout dev
  给该分支打一个标签
  git tag v1.0 （git tag -a tagname -m '描述文字'）
  git tag 查看你打的历史标签
  删除标签
  git tag -d v1.0
  2.操作标签
  创建的标签都只存储在本地，不会自动推送到远程,可以这样将标签推送到远程
  git push origin v1.0
  也可以一次性将所有本地标签推送到远程
  git push origin --tags
  删除远程标签有点麻烦，需要先删除本地，再推送
  git tag -d -v1.0
  git push origin :refs/tags/v1.0

### 七.忽略某些文件的上传
建一个.gitignore文件，将需要忽略的文件或者文件夹名字写进去，然后将.gitignore提交到Git

### 八.搭建私有git服务器

1.安装git服务的环境
  yum -y install curl curl-devel zlib-devel openssl-devel perl cpio expat-devel gettext-devel gcc cc
2.下载 git-2.5.0.tar.gz
git官网下载：https://mirrors.edge.kernel.org/pub/software/scm/git/
```
  解压
  tar -xvzf git-2.5.0.tar.gz

  cd git-2.5.0
  autoconf
  ./configure
  make
  make install
```
3.添加用户
adduser -r -c 'git version control' -d /home/irlen -m irlen
此命令执行后会创建/home/irlen目录作为irlen用户的主目录，用户名是irlen
进入home/irlen(irlen账户的家目录)。
4.设置密码为irlen
passwd irlen
这时候可以在主目录中建文件夹indus.git，进入indus.git 使用git init --bare 初始化目录,
进入.git文件夹，vim  config 在最后加上denyCurrentBranch = ignore

5.本地连接远程私服
git remote add origin git@10.0.0.99:/home/irlen/indus.git

### 在IDEA中使用git
配置git
settings->Version Control->Git
工程加入到本地仓库
VCS->Import into Version Control->Create Git repository
