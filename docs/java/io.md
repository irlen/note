# io
###编码
当你的字节序列是某种编码时，这个时候想把字节序列变成字符串，也需要使用这种编码方式，否则会出现乱码。
java是双字节编码 utf-16be (汉字和英文字母都占两个字节);
utf-8 汉字占两个字节，英文字母占一个

文件和项目都有自己的编码，如果编码不通，则出现乱码;


### File类
java.io.File类用于表示文件（目录）。
File类只用于表示文件（目录）的信息（名称，大小等），不能用于文件内容的访问。
```
File file = new File("E:\\java\\imooc");

//判断文件是否存在
file.exists();

//创建
目录: file.mkdir(); 多级: file.mkdirs();
文件: file.createNewFile();

//删除文件
file.delete();

//判断是否是目录
file.isDirectory();

//判断是否是文件
file.isFile();

//获取文件地址
file.getAbsolutePath();

//获取文件地址
file.getName();

//获取父目录
file.getParent();

```

File类的常用操作（顾虑，遍历等）

```
//列出目录中所有的下一级子目录或文件
  File dir = new File("E:\\java");
  String[] fileNames = dir.list();
//返回子目录对象（要列出所有级别的目录，通过判断是否是dir，使用递归操作）
  File[] files = dir.listFiles();
```

### RandomAccessFile 类

RandomAccessFile是java提供的对文件内容的访问，既可以读文件，也可以写文件；
RandomAccessFile支持随机访问文件，可以访问文件的任意位置。

1.java文件模型
在硬盘上的文件是byte存储的，是数据的集合。

2.打开文件
打开文件有两种模式 rw(读写) 和 r(只读)
RandomAccessFile raf = new RandomAccessFile(file,"rw");
文件指针，打开文件时指针在开头 pointer = 0;
查看指针位置 raf.getFilePointer();
移动指针到头部 raf.seek(0);

3.写方法
raf.write(char s)-->write只写一个字节（后8位），同时指针向下一个位置，准备再次写入；
raf.writeInt(int v)
也可以直接写一个字节数组

4.读方法
int b = raf.read()--->读一个字节；
一次性读取
byte[] buf = new byte((int)raf.length());
raf.read(bug);
5.文件读写完成以后一定要关闭；


### 字节流
 InputStream/OutputStream(都是抽象类)

## FileInputStream 类
```
  FileInputStream in = new FileInputStream(fileName);
  int b;
  int i = 1;
  //in.read()读完之后会返回-1，即b = -1 != -1就不成立，跳出循环
  while((b=in.read())!=-1){
    ...do something
  }
  in.close();


  //从in批量读取字节，放到一个字节数组中，从零个位置开始放，最多放buf.length个，返回的是读到的字节的个数
  byte[] buf = new byte[20*1024];
  int bytes = in.read(buf,0,buf.length);
```











```
