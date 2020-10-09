### 爬虫
### urllib.request   (python3中)
urllib.request是Python3自带模块。
基本使用
```
import  urllib.request
response = urllib.request.urlopen("http://www.baidu.com/")
print(response.read())

```
此种用法不能构造请求的参数，构造请求参数需要使用urllib.request.Requst对象
```
request = urllib.request.Request("http://www.baidu.com/")
request.add_header("Connection", "keep-alive")
response = urllib.request.urlopen(request)
Request实例除了必须有url参数之外，还可以有额外两个参数，data,header。
data: 如果请求为GET，则默认为空
header: 是一个字典，包含发送http请求的键值对
```
构造一个带参数的GET请求
url参数是一个字典
```  
base_url='http://www.yundama.com/index/login'
data_dict={
    "username":"1313131",
    "password":"13221321",
    "utype":"1",
    "vcode":"2132312"
}
data_string = urllib.parse.urlencode(data_dict)
new_url = base_url+"?"+data_string
response = urllib.request.urlopen(new_url)
print(response.read().decode('utf-8'))
```
构造一个带参数的POST请求
```
import urllib.request
import urllib.parse

data_dict = {
  "username":"zhangsan",
  "password":"123456"
}
#使用urlencode将字典参数序列化成字符串
data_string = urllib.parse.urlencode(data_dict)
#将序列化后的字符串转换成二进制数据，因为post请求携带的是二进制参数
last_data = bytes(data_string,encoding='utf-8')
#如果urlopen这个函数传递了data这个参数，那么它的请求方式则不是get请求，而是post请求
response = urllib.request.urlopen("http://baidu.com",data=last_data)
print(response.read().decode("utf-8"))

```


























...
