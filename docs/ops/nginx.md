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
