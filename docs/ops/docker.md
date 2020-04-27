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
1.镜像相关操作
```
  //查看docker中有哪些镜像
    docker images
  //
```
