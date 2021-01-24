### 环境
centos7.2
查看防火墙状态
```
  systemctl status firewall.service
```

关闭防火墙
```
  systemctl stop firewall.service
```
查看SELinux状态(安全增强型linux,SELinux是专门为linux内核制作的安全模块。)
```
  getenforce
```

临时关闭SELinux
```
  setenforce 0
```
Nginx是一个开源且高性能，可靠的HTTP中间件，代理服务。
类似的有 HTTPD（来自Apache基金会），IIS(来自微软)

### 安装nginx
gcc -v
yum -y install gcc

2、pcre、pcre-devel安装
pcre是一个perl库，包括perl兼容的正则表达式库，nginx的http模块使用pcre来解析正则表达式，所以需要安装pcre库。
安装命令：yum install -y pcre pcre-devel

3、zlib安装
zlib库提供了很多种压缩和解压缩方式nginx使用zlib对http包的内容进行gzip，所以需要安装
安装命令：yum install -y zlib zlib-devel

4、安装openssl
openssl是web安全通信的基石，没有openssl，可以说我们的信息都是在裸奔。。。。。。
安装命令：yum install -y openssl openssl-devel

安装nginx
1、下载nginx安装包
wget http://nginx.org/download/nginx-1.19.6.tar.gz

2、把压缩包解压到usr/local/
tar -zxvf  nginx-1.19.6.tar.gz

3、切换到cd /usr/local/nginx-1.19.6/下面

./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-ipv6

make

make install
5、切换到/usr/local/nginx安装目录

6、配置nginx的配置文件nginx.conf文件，主要也就是端口

### 启动nginx
7、启动nginx服务
切换目录到/usr/local/nginx/sbin下面,启动nginx服务。
./nginx

###  查看nginx是否启动
8、查看nginx服务是否启动成功
ps -ef | grep nginx

9、访问你的服务器IP，会看到Welcome to nginx!
如果此时无法访问，则关闭防火墙
systemctl stop firewall.service
或者运行以下命令添加80端口：
firewall-cmd --zone=public --add-port=80/tcp --permanent

### 关闭nginx
 方式一： pkill -9 nginx
 方式二： ps -ef | grep nginx  查看nginx的pid（这里root 后面的数字表示：主进程号
nginx后面的数字表示：子进程号）
从容停止nginx:  kill -QUIT  主进程号
快速停止nginx: kill -TERM  主进程号
强制停止nginx: kill -9 主进程号




### nginx.conf说明

#user  nobody;
worker_processes  1; #工作进程：数目。根据硬件调整，通常等于cpu数量或者2倍cpu数量。

#错误日志存放路径
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid; # nginx进程pid存放路径
### 查看日志
tail -20f access.log  实时监控最后20条日志
tail -n 20 access.log 查看日志最后20行日志

1、全局块：配置影响nginx全局的指令。一般有运行nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入，允许生成worker process数等。

2、events块：配置影响nginx服务器或与用户的网络连接。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。

3、http块：可以嵌套多个server，配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置。如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。

4、server块：配置虚拟主机的相关参数，一个http中可以有多个server。

5、location块：配置请求的路由，以及各种页面的处理情况。

events {
  worker_connections  1024; # 工作进程的最大连接数量
  accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
  multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
  #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
}
http {
    include       mime.types; #指定mime类型，由mime.type来定义
    default_type  application/octet-stream;

    # 日志格式设置
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main; #用log_format指令设置日志格式后，需要用access_log来指定日志文件存放路径

    sendfile        on; #指定nginx是否调用sendfile函数来输出文件，对于普通应用，必须设置on。
			如果用来进行下载等应用磁盘io重负载应用，可设着off，以平衡磁盘与网络io处理速度，降低系统uptime。
    #tcp_nopush     on; #此选项允许或禁止使用socket的TCP_CORK的选项，此选项仅在sendfile的时候使用

    #keepalive_timeout  0;  #keepalive超时时间
    keepalive_timeout  65;

    #gzip  on; #开启gzip压缩服务

### 请求头的设置相关
关于Host设置
proxy_set_header  Host  $host | $http_host | $proxy_host
$host    浏览器请求的ip，不显示端口
$http_host 浏览器请求的ip和端口号 （端口存在则显示）
$proxy_host 被代理服务的ip和端口号，默认80端口不显示，其他显示

### 开启https服务
检测openssl版本，必须要高点的版本
openssl version
查看nginx是否有开启--with-http_ssl_module
nginx -V
如果没开启
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
make
make install
1.生成key秘钥
openssl genrsa -idea -out irlen.key 1024
如果不想每次读取文件都输入口令，可以去除口令
openssl rsa -in irlen.key -out irlen.key
2.生成证书签名请求文件（csr文件）
openssl req -new -key irlen.key -out irlen.csr
3.生成证书签名文件（CA文件）
openssl x509 -req -days 3650 -in irlen.csr -signkey irlen.key -out irlen.crt

https在nignx中的配置
server中配置
ssl on;
ssl_certificate /usr/local/nginx/ssl_key/irlen.crt
ssl_certificate_key /usr/local/nginx/ssl_key/irlen.key

### 苹果要求的证书
需要openssl1.0.2版本及以上
使用SHA256以上哈希算法
必须使用RSA 2048位或者ECC 256位以上公钥算法
openssl req -days 36500 -x509 -sha256 -nodes -newkey rsa:2048 -keyout irlen.key -out irlen_apple.crt

### https服务优化
激活keepalive长链接,ssl session缓存
server中  keepalive_timeout 100;
ssl on;
ssl_session_cache shared:SSL:10m; //配置10M的缓存
ssl_session_timeout 10m; //十分钟之后缓存失效

### 一个端口同时支持http和https
本机IP为10.0.0.111，11110为后端HTTP端口，11111为后端HTTPS端口，1111为nginx监听端口。
配置如下
stream {
  upstream http1111{
    server 10.0.0.111:11110;
  }
  upstream https1111{
    server 10.0.0.111:11111;
  }
  map $ssl_preread_protocol $upstream{
    "TLSv1.3" https1111;
    "TLSv1.2" https1111;
    "TLSv1.1" https1111;
    "TLSv1.0" https1111;
    default http1111;
  }
}
server {
  listen 10.0.0.111:1111;
  ssl_preread on;
  proxy_pass $upstream;
}
重新编译nginx,增加stream,stream_ssl_preread模块






### 几个常见参数配置项：

1.$remote_addr 与 $http_x_forwarded_for 用以记录客户端的ip地址；
2.$remote_user ：用来记录客户端用户名称；
3.$time_local ： 用来记录访问时间与时区；
4.$request ： 用来记录请求的url与http协议；
5.$status ： 用来记录请求状态；成功是200；
6.$body_bytes_s ent ：记录发送给客户端文件主体内容大小；
7.$http_referer ：用来记录从那个页面链接访问过来的；
8.$http_user_agent ：记录客户端浏览器的相关信息；

### 检查配置文件语法，并重载配置
检查配置文件语法是否正确
nginx -tc /usr/local/nginx/nginx.conf
更改配置后重载配置，无需重启nginx
nginx -s reload -c /local/nginx/nginx.conf

### 一些常用命令
可列出nginx安装的所有包
rpm -ql nginx
重启nginx服务
systemctl reatart nginx.service
tail -n 200 /log  查看最近200行日志

### nginx配置https完整过程
1.查看nginx是否安装http_ssl_module模块
/usr/local/nginx/sbin/nginx -V
如果出现 configure arguments: --with-http_ssl_module, 则已安装

./configure --prefix=/usr/local/nginx --with-http_ssl_module && make && make install

### 以参数作为地址进行转发
在实际项目中，由于https安全策略，我们无法直接跳转到我们想要跳转到的地址
例如 url：https://abc.dc.com/image?url=https://vpic.video.qq.com/1641213/p0685fxrwij.png
location ~/image {
      if ($query_string ~*  ^(.*)url=(.*)$){
           set $imageUrl $2;
           proxy_pass $imageUrl;
      }
 }

### location的匹配规则
location的匹配规则
1）location的匹配指令：

~      #波浪线表示执行一个正则匹配，区分大小写
~*    #表示执行一个正则匹配，不区分大小写
^~    #^~表示普通字符匹配，不是正则匹配。如果该选项匹配，只匹配该选项，不匹配别的选项，一般用来匹配目录
=      #进行普通字符精确匹配
@     #"@" 定义一个命名的 location，使用在内部定向时，例如 error_page, try_files
2）location 匹配的优先级(与location在配置文件中的顺序无关)

= 精确匹配会第一个被处理。如果发现精确匹配，nginx停止搜索其他匹配。
普通字符匹配，正则表达式规则和长的块规则将被优先和查询匹配，也就是说如果该项匹配还需去看有没有正则表达式匹配和更长的匹配。
^~ 则只匹配该规则，nginx停止搜索其他匹配，否则nginx会继续处理其他location指令。
最后匹配理带有"~"和"~*"的指令，如果找到相应的匹配，则nginx停止搜索其他匹配；当没有正则表达式或者没有正则表达式被匹配的情况下，那么匹配程度最高的逐字匹配指令会被使用。
