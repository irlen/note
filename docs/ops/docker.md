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
