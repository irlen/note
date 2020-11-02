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
robot.txt为爬虫协议文件
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

### 数据提取
非结构话数据： html等
处理方法：正则表达式、xpath

结构化数据： json,xml等
处理方法： 转化成python数据类型

## json字符串转换成python对象
import json
将json字符串转化成python类型
  ret1 = json.loads(html_str)
将python数据类型转化成json字符串，将python数据写入到文本的时候可以用到
  str = json.dumps(python_obj,ensure_ascii=False,indent=2)
  ensure_assii=false可以让中文原样显示，不进行ascii编码;indent为换上缩进

具有read()或者write()方法的对象就是类文件对象（f = open('a.txt','r')），这种要使用load和dump转化。

### 正则表达式
常用正则表达式方法
import re
re.compile(编译)
re.match(从头找一个)
re.search(找一个)
re.findall(找所有)
re.sub(替换)
字符串前面加r表示原始字符串，反斜杠本身不再表示转义，就表示反斜杠本身
正则是有的注意点
re.findall("a(.*?)b","str")
返回括号中的内容，小括号为分组，括号起到定位和过滤的效果
点号默认匹配不到'\n','\s'可以匹配空白字符，不仅匹配空格，还有'\t\r'


### xpath提起数据（从html/xml中提起数据）
chrome插件 XPath Helper
/：根节点
./：下级节点
../：上级节点
//: 不考虑位置，按照名节点名称选择
获取a下的文本
/a/text()
获取a下所有标签的文本
/a//text()
获取属性
/html/head/link/@href
获取指定节点,根据id选择
//ul[@id="detail-list"]
选中包含某个class的节点
xpath("//div[contains@class,'i']")



代码中使用xpath
from lxml import etree

将html字符串转换成html
html = etree.HTML(text)
html.xpath("//li[@class='item-l']/a/@href")

python中decode和encode的区别
  由于python中使用的是unicode编码, 而日常文本使用各类编码如:gbk utf-8 等等
  所以使用python进行文字读写操作时候经常会出现各种错误, 一般都是操作时没有进行转码操作.
  而转码则需要decode(解码)和encode(编码)方法.
  decode: 将其他编码的字符串转化为unicode编码
  encode: 将unicode编码字符串转换成其他编码的字符串
  str1.decode(‘gbk’), 表示将gbk编码的字符串‘str1’转换成unicode编码.
  str2.encode(‘gbk’), 表示将unicode编码的字符串‘str2’转换gbk编码.



### 使用多线程
from queque import Queque
import threading

将资源装进队列，供线程使用,各线程之间以队列产生联系
队列的使用
list_queque = Queque()
list_queque.put("haha")
list_queque.get()
list_queque.task_done()

线程的使用
t = threading.Thread(target="要执行的函数")
t.start()
t.setDaemon(True) //把子线程设置为守护线程，该线程不重要，主线程结束，子线程就会结束
t.join() //让主线程等待阻塞，等队列的任务完成之后在完成（主线程在阻塞的间隙结束，结束之后守护线程会随之结束，这要保证主线程和子线程都在某次执行完毕后结束）


### Selenium 和 PhantomJS
Selenium是一个Web自动化测试工具，最初是为网站自动化测试而开发的，Selenium可以直接运行在浏览器上，它支持所有主流浏览器（包括PhantomJS这种无界面浏览器），可以接收指令，让浏览器自动加载页面，获取需要的数据，甚至页面截屏。

PhantomJS 是一个基于Webkit的 “无界面” (headless)浏览器，它会把网站加载到内存并执行页面上的Javascript


Selenium使用可能报错的原因。
相应浏览器的驱动版本不匹配导致，例如谷歌浏览器，在地址栏输入chrome://version可查看版本信息
谷歌浏览器驱动镜像地址 http://npm.taobao.org/mirrors/chromedriver/
1.加载网页：
  from selenium import webdriver
  driver = webdriver.PhantomJS("PhotomJS驱动的地址/phantomJS.exe")//驱动文件为phantomjs.exe
  driver.get("http://baidu.com/")
  driver.save_screenshot("长城.png")
2.定位操作
  如果元素在iframe标签中，需要先使用 switch_to.frame(iframe标签的index或者id或者name属性)找到响应的iframe
  driver.find_element_by_id("kw").send_keys("长城") //定位元素在元素中输入内容
  driver.find_element_by_id("su").click() //定位元素并点击
  driver.find_elements_by_xpath("//ul/li[id='haha']").get_attribute("aa")  //返回一个列表
  driver.find_elements_by_partial_link_text("下一页>").get_attribute("href") //根据部分文字获取元素
  driver.find_elements_by_partial_link_text("下一页").get_attribute("href") //根据文字获取元素
  find_elements_by_tag_name()
  find_elements_by_class_name()
  find_elements_by_css_selector()
  注意点：
  find_element 和 find_elements的区别： 返回一个和返回一个列表
  by_link_text 和 by_partial_link_text 的区别： 全部文本和包含某个文本
  by_css_selector的用法： #food span.dairy.aged 和css选择器一样写
  by_xpath 中获取属性和文本需要使用get_attribute()和.text，这里只使用xpath的定位方式，并不用xpath获取内容的方式
3.查看请求信息
  driver.page_source  //网页源码
  driver.get_cookies() //获取cookie
  driver.current_url  //当前url
4.退出
  driver.close() //关闭当前页面
  driver.quit() //退出浏览器


### tesseract 使用(图像识别)
pip install pytesseract
text = pytesseract.image_to_string("haha.png")

### scrapy 框架的使用
安装
pip install scrapy

创建项目
scrapy startproject projectname

生成一个爬虫
cd projectname
scrapy genspider  itcast(爬虫名称)  "itcast.cn"(允许爬取的范围，域名)

启动
在更目录执行
scrapy crawl itcast(爬虫名称)
logging模块的使用
  scrapy中
    settings.py中的某些配置
    LOG_LEVEL = "WARNING" *日志显示的等级*
    LOG_FILE = "./LOG.log" *日志保存的格式，不在终端打印*
    import logging ,实力化logger,在文件中做logger输出

  普通项目中
    import logging
    logging.basicConfig(...) *设置日志输出的演示，格式*
    实例化一个logger = logging.getLogger(__name__)
    之后在任何py文件中调用logger即可

  scrapy的request对象
  scrapy.Request(url,[,callback,method='GET',headers,body,cookies,meta,dont_filter=False])
  callback: 指定传入的url交给哪个解析函数去处理
  meta: 实现不同的解析函数中传递数据，meta默认会携带部分信息，比如下载延迟，请求深度等
  dont_filter: 让scrapy的去重不会过滤当前url,scrapy默认有url去重的功能，对需要重复请求的url有重要用途
  yield 返回的request对象可以自动交给引擎处理

### crawlspider的使用
crawlspider不用写复杂的循环，自动筛选url进行爬取，可自动去重，自动筛选要爬的url
scrapy genspider -t crawl haha haha.com

*LinkExtactor: (连接提取)提取url地址，是一个正则*
*callback: 提取结果后的回调函数，如果不需要提取数据则不用写回调函数，只需要请求就行了，rules会从请求到的结果中自动提取需要的url*
*follow: (默认为False)当前url请求得到的结果是否需要再次经过rules提取url地址，其实就是循环（会自动过滤掉之前请求过的url）*
*crawlspider会自动把url补充完整，http://www.限制域名+ url;*
rules = (
    Rule( LinkExtactor(allow=r"web/site0/info\d+\.html"), callback="parse_item", follow= True )
)

### scrapy携带cookie模拟登陆
```
settings中设置
#COOKIES_ENABLED = False ->cookie在setting中默认是开启的
COOKIES_DEBUG= True 控制台可看到cookie在不通的解析函数中传递，第一次携带之后，不用每次请求都携带cookie
*在spider中重写start_requests覆盖默认，可以对start_url做一些包装*
def start_requests(self):
  yield scrapy.Request(
    self.start_url[0],
    callback=self.parse,
    cookies=cookies *cookies为字典格式*
  )
settings中打开COOKIES_DEBUG = True可以查看cookie在各个请求之间的传递
```  

### 下载中间件
使用方法：
编写一个Download Middlewares 和我们编写一个pipeline一样，定义一个类，然后在settings中开启
主要对响应和请求做一些自定义处理

Downloader Middlewares默认方法：
process_request(self, request, spider):
  *当每个request通过下载中间件时，该方法被调用,即请求之前处理请求*
process_response(self,request,response,spider):
  *当下载器完成http请求，传递响应给引擎的时候调用，即响应之后处理响应结果，需要return出结果*
settings中设置
DOWNLOADER_MIDDLEWARES = {
  'circ.middlewares.MyCustomDownloaderMiddleware': 543
}

### scrapy 模拟登陆之发送post请求
scrapy.FormRequest(
    "https://github.com/session",
    formdata = post_data,
    callback = self.after_login
)

scrapy.FormRequest.form_response(
    response,
    *自动从response中寻找form表单*
    formdata={"user":"irlen",password:"root"},
    callback=self.after_login
)

对url进行编码和解码的操作
python3中
import urllib.parse  
data={"name":"王尼玛","age":"/","addr":"abcdef"}  
urllib.parse.urlencode(data)

如果只想对字符串进行urlencode转换，则
urllib.parse.quote("hahaha你好啊！")

对url进行解码，使用unquote(),不存在urldecode这个函数

### 分布式爬虫
scrapy-redis
redis为内存数据库

操作列表list：
 LPUSH mylist "world" *向mylist从左边添加一个值*
 LRANGE mylist 0 -1 *返回mylist中所有值*
 LLEN mylist *返回mylist的长度*

操作集合set:
  SADD myset "hello" *往set中添加数据*
  SMEMBERS myset *获取myset中所有的元素*
  SCARD myset *scard获取数量*

操作有序集合zset：
  ZADD myzset 1 "one" *插入顺序和值，顺序不同值可以相同，顺序存在则相当于修改值*
  ZADD myzset 2 "two" 3 "three"
  zRANGE myset 0 -1 *遍历zset*
  ZCARD myzset *返回元素的数量*

settings中的配置
DUPEFILTER_CARSS = "scrapy_redis.dupefilter.RFPDupeFilter" *指定哪个方法给request去重*
SCHEDULER = "scrapy_redus.scheduler.Scheduler" *指定scheduler队列*
SCHEDULER_PERSIST = TRUE *队列中的内容是否持久保存，为False的时候关闭redis的时候会清空redis*

REDIS_URL = "redis://127.0.0.1:63379" *指定redis的地址*













...
