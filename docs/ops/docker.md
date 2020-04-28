### Doker

仓库
镜像
容器

下载地址：
    win10之外：
        https://www.docker.com/products/docker-toolbox
    win10:
        https://www.docker.com/products/docker#/windows

拉取镜像：
    docker pull  [options] name [:TAG]
查看已拉取的镜像：
    docker images [OPTIONS] REPROSITORY [:TAG]
运行一个镜像
    docker run [OPTIONS] IMAGE [:TAG] [COMMAND] [ARG...]

    -d参数表示在后台运行，并会打印出镜像ID
查看正在机器上运行的容器
    docker ps
在容器中运行一个命令
    docker exec [OPTIONS] CONTAINER COMMAND [ARG...]

### 安装docker
配置各种源的地址
https://developer.aliyun.com/mirror/
安装前对centos的操作
1.yum包更新到最新
sudo yum update

2.安装需要的包，yum-util提供yum-config-manager功能，另外两个是devicemapper驱动依赖。
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

3.设置yum源为阿里云
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

4.安装docker
sudo yum install docker-ce -y

5.设置ustc镜像（可以提升docker拉取镜像的速度）
```
//创建文件
sudo mkdir -p /etc/docker
vim /etc/docker/daemon.json
在文件中输入如下内容:
{
  "registry-mirrors":["https://docker.mirrors.ustc.edu.cn"]
}
```

### docker的启动和停止

```
//启动
systemctl start docker
//查看状态
systemctl status docker
//开机自动启动
systemctl enable docker
//关闭docker
systemctl stop docker
```
### docker常用命令
1.镜像相关操作命令
```
  //查看docker中有哪些镜像
    docker images

  //搜索某个镜像
    docker search centos  

  //拉取镜像
    docker pull tutum/centos

  //删除镜像（按照ID或者名称都可以，如果镜像有相应容器运行，则该镜像无法删除）
    docker rmi 镜像ID或者名称

  //删除所有镜像
    docker rmi `docker images -q`
```
2.容器相关操作命令

```
  //查看容器(正在运行的)
    docker ps

  //查看所有容器
    docker ps -a

  //创建与启动容器
    docker run
    参数 -i: 表示运行容器；

         -t: (terminal 终端) 表示容器启动后进入命令行。加入这两个命令容器创建就可以进入，即分配一个伪终端；

         --name: 为创建的容器命名；

         -v: 表示目录映射关系（前者是宿主机目录，后者是映射到宿主机上的目录），可以使用多个-v做多个目录和文件的映射。
         注意：最好做目录映射，在宿主机上做修改，然后共享到容器上。

         -d: (daemons 守护进程) 在run后面加上-d参数，则会创建一个守护式容器在后台运行（这样创建容器后不会自动登录容器，如果只加-i -t两个参数，创建后就会自动进去容器）。

         -p: (port) 表示端口映射，前者宿主机端口，后者是容器内的映射端口。可以使用多个-p做多个端口映射；
         (1)交互式运行一个容器
         docker run -it --name=centos 镜像名:镜像标签  /bin/bash(表示使用bash脚本命令进行交互)
         此时，容器运行，光标所在环境为容器环境。
         退出容器环境
         exit  (此时容器停止运行)

         (2)守护式方式运行容器
         docker run -id --name=mycentos2 镜像名:镜像标签
         此时，容器运行中，光标在宿主机环境
         进入容器环境
         docker exec -it mycentos2 /bin/bash
         然后 exit退出容器环境，此时容器仍然在运行（和交互式创建的容器不同）
```
停止容器
```
  docker stop mycentos2
```
启动容器
```
docker start mycentos2
```
查看容器信息
```
docker inspect 容器名称（或ID）
//可查看指定参数 ，例如ip
docker inspect --format='{{.NetworkSettings.IPAddress}}' 容器名称(或ID)
```
删除容器（要先停止容器运行）
docker rm 容器名称（或ID）



### 文件操作
宿主环境下将文件拷入容器中
```
docker cp haha.json mycentos2:/usr/local
```
目录挂载
通过-v 参数在创建容器时，将宿主机和容器目录进行映射，之后通过修改宿主机某个文件去影响容器。
docker run -id -v /usr/local/myhtml:/usr/local/myhtml --name=mycentos2 centos:7
多级目录可能无权限,可添加 --privileged=true 来解决。（privileged 有特权的）


### mysql部署
1.拉取mysql镜像
docker pull centos/mysql-57-centos7   //拉取mysql5版本镜像

2.创建容器
docker run -id --name=mymysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=irlen 镜像名称
此时可用宿主机的ip和映射端口去连容器内mysql


### tomcat部署
1.拉取tomcat镜像
docker pull tomcat:7-jre7

2.创建容器(-p：端口映射，-v:目录映射)
docker -id --name=mytomcat -p 9000:8080 -v /usr/local/webapps:/user/local/tomcat/webapps  tomcat:7-jre7

### Nginx部署
1.拉取Nginx镜像
  docker pull nginx
2.创建nginx容器
  docker run -id --name=mynginx -p 80:80 nignx

### Redis部署
1.拉取Redis镜像
docker pull redis
2.创建容器
docker run -id --name=myredis -p 6379:6379 redis

### 迁移与备份
1.容器保存为镜像
  docker commit mynginx mynginx_i
2.镜像备份
  docker save -o mynginx.tar mynginx_i  //-o  output意思
3.镜像恢复与迁移
  docker load -i mynginx.tar  //-i input的意思

### Dockerfile常用命令

Dockerfile是由一系列命令和参数构成的脚本，用于基础镜像并最终创建一个新的镜像。
常用命令
```
FROM  镜像名   //从哪个基础镜像启动构建流程
MANITAINER irlen //创建进行的作者
ENV  key:value  //设置环境变量（可写多条）
RUN  命令  //dockerfile核心部分（可写多条）
ADD  宿主文件 容器文件  //将宿主文件复制到容器内，如果是压缩文件会自动解压
COPY 宿主文件 容器文件  //同上，但是压缩文件不会自己解压
WORKDIR 文件夹  //设置工作目录
```

### 使用Dockerfile创建镜像（脚本文件名称必须叫Dockerfile）
```
example: 用Dockerfile创建一个jdk1.8的镜像
文件名称 Dockerfile
文件内容
  FROM centos:7
  MANITAINER irlen
  WORKDIR /usr
  RUN mkdir /usr/local/java
  ADD jdk-yu171-linux-x64.tar.gz /usr/local/java/

  ENV JAVA_HOME /usr/local/java/jdk1.8.0_171
  ENV JRE_HOME $JAVA_HOME/jre
  ENV CLASSPATH $JAVA_HOME/bin/dt.jar:$JAVA_HJOME/lib/tools.jar:$JRE_HOME/lib:$CLASSPATH   //linux用冒号代表分号
  ENV PATH $JAVA_HOME/bin:$PATH

  //执行Dockerfile创建镜像
  docker build -t="镜像名称" .   //.表示在当前文件中寻找Dockerfile文件

```

### Docker私有仓库

私有仓库搭建与配置
1.拉取私有仓库镜像（私有仓库本身也是一个镜像）
  docker pull registry
2.启动私有仓库容器
  docker run -id --name=registry -p 5000:5000 registry
3.打开浏览器查看host:5000/v2/_catalog看到{"repositories":[]} 表示私有仓库搭建成功并且内容为空。

4.修改daemon.json  让docker信任私有仓库地址。
```
vim /etc/docker/daemon.json
添加(host为宿主机ip)
{
  “insecure-registries”:[host地址:5000]
}
重启docker服务
systemctl restart docker
```
将镜像上传到私有仓库（私有仓库容器需要启动）
docker tag 镜像名 私服地址:端口/镜像名
docker push 私服地址:端口/镜像名

从私有仓库下载镜像
