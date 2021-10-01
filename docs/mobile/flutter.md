# Dart语言基础
官网：https://flutterchina.club/
###开发环境搭建
  windows平台：choco install dart-sdk
  linux平台：sudo apt-get install dart
  mac平台：brew install dart --devel



### 接口
dart中的类和接口是统一的，类就是接口（和java完全不同）；
类使用implements实现接口（类也可以作为接口被另一个类实现），需要实现接口里面所有的实例属性和方法；
一般要实现接口的功能，使用抽象类来做；


### Mixins
Mixins类似于多继承，是在多类继承中重用一类代码的方式；
作为Mixins的类不能有显示声明构造方法（B,C为Mixins类），且只能继承于Object类；
```
  class D extends A with B,C(){

  }
```
此时，D拥有A,B,C三个类的属性和方法；
顺序越靠后，权重越高，如果方法名相同，则会使用C中的同名方法；


### 泛型
dart中类型是可选的，可使用泛型限定类型，也可扩展类型（类，属性，方法都可以使用泛型<T>）；
var list = new List();
list中可以添加任何类型；
var list  = new List<String>();
list中只可添加String类型元素；

### 静态成员
 使用static关键字来实现类级别的变量和函数。
 静态成员不能访问非静态诚意就按，非静态成员可以访问静态成员（java中也是如此）。
 类中的常量需要使用static const 声明。

### 对象操作符
? 操作符：条件成员或者方法访问，person为空或者没有printName方法时不执行，person有printName方法时执行；
person?.printName();

as 操作符；类型转换，不确定person类型的时候，可以将person转换成相应类型；
var person = "";
person = new Person();
(person as Person).work();

is 和 is! 操作符: 判断对象类型
if(person is Person){

}

..操作符：连续操作。
person..name = "Tom"
    ..work = "enginer"
    ..age = 12;

### dart中的面向对象
使用关键字 extends 继承一个类，一个子类只能继承一个父类；
子类继承父类的属性和方法，不继承父类的构造方法；
子类的构造方法默认会调用父类的无名无参构造方法；
如果父类没有无名无参构造方法（即父类默认无名无参构造方法被覆写），这需要显示调用父类构造方法；
在构造方法参数后时候用 : 显示调用父类构造方法；
Student(String name):super(name);
父类的构造方法在子类构造方法体开始执行的位置先执行，然后再执行子类构造方法体中的代码，如果有初始化列表，则初始化列表又会在父类的构造方法之前执行；

### 抽象类
使用abstract声明一个抽象类，抽象类不能被实例化，可以被类继承；
抽象方法不一定需要abstract修饰（java中必须abstract修饰），无实现；
抽象类可以没有抽象方法；
有抽象方法的类必须声明为抽象类；


















## Flutter

### 搭建Flutter开发环境
中文官网： https://flutterchina.club/
<<<<<<< HEAD
获取Flutter的SDK
### AndroidSDK下载地址
https://www.androiddevtools.cn/
android studio下载地址
https:/developer.android.google.cn/studio

### vscode编辑flutter项目
先在vscode中安装flutter和Dart插件
在桌面编辑 emulatorrun.bat文件。
C:\Users\Adinistrator\AppData\Local\Android\Sdk\emulator\emulator.exe-netdelay none -netspeed full -avd  Nexus_5X_API_28
(命令行中虚拟机名称中的空格用下划线代替)
双击运行改文件，即可打开虚拟机。
在vscode终端输入命令flutter run即可运行项目，并自动连接至虚拟机；
=======
windows10环境
  1.设置环境变量
  FLUTTER_STORAGE_BASE_URL ：https://storage.flutter-io.cn
  PUB_HOSTED_URL：https://pub.flutter-io.cn
  2.下载安装包
  Flutter官网下载其最新可用的安装包，下载地址： https://flutter.dev/docs/development/tools/sdk/releases
  3.测试
  将安装包解压到安装路径，找到flutter_console.bat文件，双击启动此命令行工具
  flutter doctor 查看各个各种依赖是否已经安装
  提示Some Android licen ses not accepted（Android证书的问题）
  运行 flutter doctor --android-licenses 修复
  将项目的build.gradle和flutter安装目录的flutter.gradle的仓库repositories都配置成阿里云镜像
  ```
      maven { url 'https://maven.aliyun.com/repository/google' }
      maven { url 'https://maven.aliyun.con/repository/jcenter' }
      maven { url 'https://maven.aliyun.com/nexus/content/groups/public' }
  ```
>>>>>>> 108a4e6bfaedf910c9759d81d2624ddf4b2ec969
