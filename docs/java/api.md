### Scanner类
一个获取键盘输入到程序中的类；
```
//创建对象，构造函数必须传入参数，参数为输入来源，System.in为键盘输入;
Scanner  sc = new Scanner(System.in);
//获取输入的整数
int num = sc.nextInt();
//获取输入的字符串
String num = sc.next();
```

### Random类
```
Random r = new Random();
//无参的方法，得到的Int范围内的所有可能数字，有正负两种
int num =  r.nextInt();
//有参数的重载方法，参数代表左闭右开区间，例如 int num = r.nextInt(3);代表含义为[0,3),即0,1,2


```
