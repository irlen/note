### 微信网页授权
官方文档
https://mp.weixin.qq.com/wiki

调试（内网穿透）
https://netapp.cn

第三方SDK
https://github.com/Wechat-Group/weixin-java-tools

微信支付
https://pay.weixin.qq.com/wiki

微信公众平台接口测试账号申请
https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login

微信支付sdk
1.在springboot项目中引入maven依赖；
```
<dependency>
    <groupId>com.github.binarywang</groupId>
    <artifactId>wx-java-pay-spring-boot-starter</artifactId>
    <version>${version}</version>
</dependency>
```
2.添加配置（application.yml）
wx:
  pay:
    appId:
    mchId:
    mchKey:
    subAppId:
    subMchId:
    keyPath: 
