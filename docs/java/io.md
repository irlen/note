# io
流分为两大类
字节流：抽象父类为InputStream和OutputStream
字符流：抽象父类为Reader和Writer


### 字节流

InputStream是所有类字节输入流的超类：
    1.FileInputStream  文件字节输入流
    2.BufferedInputStream 缓冲字节输入流,是对字节输入流的包装，接受InputStream对象
    2.ObjectInputStream 对象字节输入流

OutputStream是所有类字节输出流的超类：
    1.FileOutputStream 文件字节输出流
    2.BufferedOutputStream 缓冲字节输出流，是对字节输出流的包装，接受OutputStream对象
    3.ObjectOutputStream 对象字节输出流

### 字符流
Reader是字符输入流的超类：
  FileReader 字符输入流
  bufferedReader 输入包装流，是对输入字节流的包装，接受Reader对象
Writer是字符输出流的超类：
  FileWriter 字符输出流
  bufferedWriter 输出包装流，是对输出字节流的包装，接受Writer对象
String转换为char[] ,toCharArray();
char[]转换为String, String(char[])
注：FileWriter使用后需flush和close;


### 标准输入(键盘)输出（显示器）
System.in    标准输入，编译类型InputStream，运行类型BufferedInputStream
System.out   标准输出，编译类型PrintStream，运行类型PrintStream



### 转换流
InputStreamReader   
是Reader的子类，属于字符流，传入InputStream字节流对象，可设置编码方式，将字节流转换为字符流；
OutputStreamWriter
是Writer的子类，属于字符流，传入OutputStream字节流对象，可设置编码方式，将字符以字节的方式写入；

### 打印流
打印流只有输出流，没有输入流
PrintStream: 字节流，抽象父类为InputStream,System.out就是一个字节打印流；
PrintWriter: 字符流，直接父类是Writer;


### Properties类
1.专门用于读写配置文件的集合类，配置文件格式
键=值
2.注意：键值对不需要有空格，只不需要用引号，默认类型是String
Properties类常见方法
load: 加载配置文件的键值对到Properties对象；
list: 将数据显示到指定设备/流对象；
getProperty(key): 根据键获取值；
setProperty(key,value): 设置键值对到Properties对象；
store: 将Properties中的键值对存储到配置文件，在idea中，保存信息到配置文件，如果还有中文，会存储为unicode码；
unicode码查询工具：http://tool.chinaz.com/tools/unicode.aspx







```
