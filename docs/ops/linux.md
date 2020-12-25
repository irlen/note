### cenos7安装
以镜像文件安装的方式安装。
#.源码安装wget###########################################
  源码下载地址：ftp://ftp.gnu.org/gnu/wget/
  解压源码： tar -zxvf file.tar
  执行配置： ./config --prefix=/usr/local/wget  检测目标特性，生成makefile文件(prefix参数是配置wget的安装目录)
  执行：make clean;  make 编译
  安装：make install
  在/bin中创建软链接 ln -s /local/usr/wget/bin/wget  wget

#.安装vim （有些版本需要重新安装vim）###########################################
查询 ：rpm -qa|grep vim
yum 源安装失败，选择源码安装
源码下载地址 https://github.com/vim/vim/releases
解压源码： tar -zxvf file.tar
执行配置： ./config --prefix=/usr/local/vim  检测目标特性，生成makefile文件(prefix参数是配置wget的安装目录)
执行：make clean;  make 编译
安装：make install
在/bin中创建软链接 ln -s /local/usr/wget/bin/vim  vim



#配置桥接网络############################################################
虚拟机-设置-网络适配器，选择桥接模式
编辑-虚拟网络编辑器-更改设置-桥接到-Realtec PCIe GBE Family Controller
查看宿主机DNS地址 (window系统)
ipconfig /all   查看DNS和Ip,网关

修改Centos7网络适配文件
编辑vim  /etc/sysconfig/network-scripts/ifcfg-ens33
BOOTPROTO = static  //自动分配改成静态
ONBOOT = yes //开机启动
IPADDR = 10.0.0.99 //必须和宿主机在同一网关，即 A类地址前三位要一样
GATEWAY = 10.0.0.1 //网关要与宿主机一致
NETMASK = 255.255.255.0  //A类地址子网掩码
DNS1= 10.0.0.1 //与宿主机一致
重启网络
service network restart


#安装python3##############################################################
python -V //查看目前安装的版本
先安装用于下载编译python3的相关包
yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make
备份Python2
mv python python.bak
下载python3资源包
wget https://www.python.org/ftp/python/3.6.8/Python-3.6.8.tar.xz
解压检测安装
tar -xvJf  Python-3.6.8.tar.xz
./configure --prefix=/local/usr/python3/ 安装python3
make clean
make
make install
添加软链接到/bin
ln -s /local/usr/python3/bin/python3 python
此时yum不能正常使用，需要将vi /usr/bin/yum中python改为python2

#安装mysql#################################################################

1.先删除系统中存下的有关mysql的文件
yum remove  mysql mysql-server mysql-libs mysql-server;
find / -name mysql 将找到的相关东西delete掉(rm -rf /var/lib/mysql)；
rpm -qa|grep mysql (qa指query all，查询所有rpm包，查询出来的东东yum remove掉)
rm /etc/my.cnf
rpm安装的mysql，则查找卸载并删除其服务
a)查找mysql
[root@localhost opt]# rpm -qa | grep -i mysql
MySQL-server-5.6.17-1.el6.i686
MySQL-client-5.6.17-1.el6.i686

b)卸载mysql

[root@localhost local]# rpm -e MySQL-server-5.6.17-1.el6.i686
[root@localhost local]# rpm -e MySQL-client-5.6.17-1.el6.i686

c)删除mysql服务

[root@localhost local]# chkconfig --list | grep -i mysql
[root@localhost local]# chkconfig --del mysql
删除yum remove mariadb

安装新的mysql
1.找到mysql资源包
https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.13-1.el7.x86_64.rpm-bundle.tar
2.用wget下载到服务器
wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.13-1.el7.x86_64.rpm-bundle.tar
3.解压包
tar -xvf mysql-8.0.13-1.el7.x86_64.rpm-bundle.tar
4.安装mysql
rpm -vih XXXXXX（XXXXXX 为 rpm包全名，按照依赖按顺序安装）
mysql-community-common-8.0.13-1.el7.x86_64
mysql-community-libs-8.0.13-1.el7.x86_64
mysql-community-libs-compat-8.0.13-1.el7.x86_64
mysql-community-client-8.0.13-1.el7.x86_64
mysql-community-embedded-compat-8.0.13-1.el7.x86_64

mysql-community-server-8.0.13-1.el7.x86_64
mysql-community-devel-8.0.13-1.el7.x86_64
mysql-community-test-8.0.13-1.el7.x86_64
5.启动mysql服务
service mysqld restart
6.首次无密码登录
mysql -u root
如果出现1045（28000）错误,
vim /etc/my.cnf
在[mysqld]后面任意一行添加“skip-grant-tables”用来跳过密码验证的过程
然后重启 service mysqld restart
7.设置密码 （很多时候设置不成功是因为密码规则不匹配）
UPDATE user SET Password = PASSWORD('12345678') WHERE user = 'root';
SET PASSWORD FOR 'root'@'localhost' = PASSWORD(123456);
下面是我的密码规则，更新密码语句，执行下面的语句就不报上面的语法错误了：
下面两种都可以修改密码
ALTER user 'root'@'localhost' IDENTIFIED BY '12345678';
或
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
查看 mysql 初始的密码策略
mysql> SHOW VARIABLES LIKE 'validate_password%';
关于 mysql 密码策略相关参数；
1）、validate_password_length  固定密码的总长度；
2）、validate_password_dictionary_file 指定密码验证的文件路径；
3）、validate_password_mixed_case_count  整个密码中至少要包含大/小写字母的总个数；
4）、validate_password_number_count  整个密码中至少要包含阿拉伯数字的个数；
5）、validate_password_policy 指定密码的强度验证等级，默认为 MEDIUM；
关于 validate_password_policy 的取值：
0/LOW：只验证长度；
1/MEDIUM：验证长度、数字、大小写、特殊字符；
2/STRONG：验证长度、数字、大小写、特殊字符、字典文件；
6）、validate_password_special_char_count 整个密码中至少要包含特殊字符的个数；
只要修改密码强度等级就可以，就可以解决密码策略问题
set global validate_password.policy=LOW;
或者
set global validate_password.policy=0;(我用的这条)
刷新
FLUSH PRIVILEGES;


二.yum安装数据库
cat /etc/redhat-release
yum install mysql
yum install mysql-server
yum install mysql-devel
设置密码
mysql set password for 'root'@'localhost'=password('irlen')

设置让所有主机可连接数据库
登录数据库
mysql -uroot -p
切换到mysql数据库
mysql> use mysql;
设置user表中所有主机有权使用root的用户名登录
uapdate user set host='%' where user='root';
授权所有主机可以root用户名访问数据库
GRANT PRIVILEGES ON  *.* tO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
查看是否更改成功
mysql> select host, user from user;
刷新权限表
mysql> flush privileges
开启3306端口
firewall-cmd --zone=public --add-port=3306/tcp --permanent
然后重启防火墙


### 防火墙相关操作###########################################################
1. 查看防火墙状态
firewall-cmd --state            ## 结果显示为running或not running
2. 关闭防火墙firewall
systemctl stop firewalld.service
systemctl disable firewalld.service
3. 关闭防火墙firewall后开启
systemctl start firewalld.service
4. 开启端口
## zone -- 作用域
## add-port=80/tcp -- 添加端口，格式为：端口/通讯协议
## permanent -- 永久生效，没有此参数重启后失效
firewall-cmd --zone=public --add-port=3306/tcp --permanent
## 开启3306端口后，workbench或naivcat 就能连接到MySQL数据库了
查看某个端口是否开启
firewall-cmd --query-port=80/tcp
查看所有被开启的端口
netstat -aptn


#关闭firewall使用iptables

systemctl stop firewalld
systemctl mask firewalld

yum install iptables-services
systemctl enable iptables

systemctl [stop|start|restart] iptables
保存防火墙规则
service iptables save
###使用iptables开启端口
打开配置文件
vim /etc/sysconfig/iptables
添加内容
-A INPUT -m state --state NEW -p tcp -m multiport --dport 8020,(此处添加开放的端口) -j ACCEPT
重启服务
service iptables restart

查看某个端口是否重启,如果没显示任何内容，则未开启
lsof i:1111
或者 iptables -n -L 会列出iptables规则，可以看到开放的端口


5. 重启防火墙
firewall-cmd --reload
大多数是由于系统里面安装的python版本原因。/usr/sbin/firewalld文件头部的python版本和安装的python版本不一致
6. 常用命令介绍
firewall-cmd --state                           ##查看防火墙状态，是否是running
firewall-cmd --reload                          ##重新载入配置，比如添加规则之后，需要执行此命令
firewall-cmd --get-zones                       ##列出支持的zone
firewall-cmd --get-services                    ##列出支持的服务，在列表中的服务是放行的
firewall-cmd --query-service ftp               ##查看ftp服务是否支持，返回yes或者no
firewall-cmd --add-service=ftp                 ##临时开放ftp服务
firewall-cmd --add-service=ftp --permanent     ##永久开放ftp服务
firewall-cmd --remove-service=ftp --permanent  ##永久移除ftp服务
firewall-cmd --add-port=80/tcp --permanent     ##永久添加80端口
iptables -L -n                                 ##查看规则，这个命令是和iptables的相同的
man firewall-cmd                               ##查看帮助
systemctl status firewalld.service                               ##查看防火墙状态
systemctl [start|stop|restart] firewalld.service                 ##启动|关闭|重新启动  防火墙

##查询端口号80 是否开启
firewall-cmd --query-port=80/tcp
更多命令，使用 firewall-cmd --help 查看帮助文件

重启网络
centos6的网卡重启方法：service network restart
centos7的网卡重启方法：systemctl restart network

安装nodejs################################################################################################################
1、确认依赖环境

确认服务器有nodejs编译及依赖相关软件，如果没有可通过运行以下命令安装。

yum -y install gcc gcc-c++ openssl-devel
2.现在需要的版本
http://nodejs.org/dist/

3.解压之后创建软链接使得全局可用
ln s node所在的位置  /usr/local/bin/node
ln s npm所在的位置  /usr/local/bin/npm


5.验证
任意地点执行node -v
6.配置npm镜像
npm config set registry https://registry.npm.taobao.org
npm config get registry
npm install -g cnpm --registry=https://registry.npm.taobao.org


安装装yarn
1.在 CentOS, Fedora 和 RHEL 操作系统上，你可以通过我们的 RPM 包仓库来安装 Yarn。

sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
　　如果你尚未安装 Node.js（查看是否安装node.js用命令：node -v就可以显示版本。安装方法参考CentOS 下安装 Node.js 8.11.3 LTS Version），你应该配置 Node 源仓库：

curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
2.然后运行：

sudo yum install yarn
　　这样就安装完成了。查看yarn版本用命令：yarn --version


安装pipenv ####################################################################
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pipenv    使用国内源安装pipenv

mkdir fisher

进入文件夹，执行pipenv shell 启动pipenv

在pipenv虚拟环境中执行：

pip3 list 查看这个虚拟环境有哪些安装包

pipenv graph 可以查看依赖关系

pipenv install  flask 安装包

pipenv --venv查看这个虚拟环境所属目录，在pycharm中添加

### window宿主机和linux虚拟机通信
1.host-only
 宿主机windows与虚拟机linux单独组网，即让虚拟机与宿主机位于不同的各自独立的IP地址，但是不与宿主机位于同一网段，
 同时为宿主机新增一个ip地址，且保证该IP地址与其他虚拟机ip位于同一网段。最终新建了一个由所有虚拟机和宿主机构成的局域网，
 但是该局域网与宿主机本身所处的现有局域网是相互独立的，是无法之间通信的，达到网络隔离的效果。
 实际上是为宿主机新添加了一个虚拟网卡，使宿主机变成一个双网卡的主机，同时宿主机后端设一个虚拟交换机，
 让宿主机与所有的虚拟机构成一个虚拟的局域网达到相互通信的目的，但是虚拟的局域网与宿主机所处的实际局域网是无法直接通信的。

2.桥接的连接方式

 宿主机windows与虚拟机linux在同一个局域网，即让虚拟机与宿主机拥有不同的IP地址但是同在一个网段内，也就是在宿主机当前的局域网添加多个虚拟机

3.NAT

表面上看，虚拟机没有自己的ip，是和宿主机共享IP地址，但本质上是基于Host-only方式，即虚拟机还是有自己独立的IP地址，
但是实际不投入使用，NAT方式跟host-only方式一样为宿主机新添加一个虚拟网卡使之成为双网卡主机。使其同时参与自身现有的局域网和虚拟的局域网。而NAT方式不同于host-only的是，它加设了一个NAT服务器，使得虚拟局域网内的虚拟机对外访问时，完全使用的是宿主机的IP地址，所以对于外界网络来说看到的只有宿主机，而新建的虚拟局域网是透明的。

配置方式：
