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

## Flutter

### 搭建Flutter开发环境
中文官网： https://flutterchina.club/
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
