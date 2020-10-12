### 爬虫
### 使用第三方模块requests
pip install requests
url_temp = "https://www.baidu.com/s?"
headers = {...}
response = requests.get(url_temp,headers=headers)

## requests 发送 post 请求

response  = requests.post("https://wwww.baidu.com/",data=data,headers=headers)
data格式为字典

## requests 使用代理

response = requests.get("http://www.baidu.com",proxies=proxies)
proxies的形式： 字典
proxies = {
  "http":"http://12.34.56.79:9527",
  "https":"https://12.34.56.79:9527"
}
使用的代理的原因：让服务器以为不是同一个客户端在请求，防止我们的真实地址被泄露，防止被追究;

## requests 模拟登陆的三种方式
requests 提供了一个session类，来实现客户端和服务端的会话保持
1.实例化一个session对象
2.让session发送get或者post请求
session = requests.session()
response = session.get(url,headers=headers)
也可以直接将cookie放在headers里面直接使用，这时候使用requests.get(url,headers)或者requests.get(url,headers,cookie)就可以访问。
requests中解决编码的方法
response.content.decode()
response.content.decode("gbk")
response.text

## requests 小技巧

1. 把cookie对象转化为字典
  requests.util.dict_from_cookiejar
2. url地址解码
  requests.util.unquote("http://%3aq348iad%alfj")
  quote为编码
3. 请求SSL证书验证
  response =  requests.get("https://www.12306.cn/mormhweb/",verify=False)
4. 设置超时
  response = requests.get(url,timeout=10)
5. 配合状态码判断是否请求成功
  assert response.status_code == 200
retrying 模块可以在报错的时候重复尝试
from retrying import retry
@retry(stop_max_attempt_number=3)
def haha():
  pass


...
