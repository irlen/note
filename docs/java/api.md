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
### String  
字符串的比较不应该用“==”,应该使用equals();
将字符串变成大小写 s.toUpperCase()， s.toLowerCase();
忽略大小写比较 equalsIgnoreCase();
判断字符串中是否包含某些字符 hello.contains("ll");
去除字符串的首尾空白字符,并不改变原来字符串内容，返回新的字符串 s.trim(); //trim 修剪
移除字符串首尾空白字符包括类似中文空格字符 s.strip() //strip 扒光，脱光衣服，剥去一层
判断是否为空 s.isEmpty()
判断是否为空白字符 s.isBlank();
按照符号分隔字符串
 String s = "A,B,C,D";
 String[]  ss = s.split("\\,");
 实际上是\,，因为Java中\是转义字符前导符，所以在字符串中书写\必须得写成\\才能正确识别，所以正则表达式中的\,就表示为\\,的。
 反向操作为join
 String[] arr = ["A","B","C"];
 String s = String.join("***",arr);

 格式化字符串（java提供了formatted()方法和format()静态方法）
 String s = "Hi %s, your score is %d!";
 System.out.println(s.formatted("Alice",80));

 %s : 表示字符串
 %d : 表示整数
 %x : 表示十六进制整数
 %f : 表示浮点数

 要把任意基本类型或者引用类型转换为字符串，可以使用静态方法valueOf(),这是一个重载方法，编译器会根据参数类型自动选择合适的方法。
 String.valueOf(123); //"123"
 String.valueOf(true); //"true"
 字符串转换成int类型
 Integer.parseInt("123"); //123
 转换成boolean类型
 boolean b = Boolean.parseBoolean("true"); //true

 字符數組和字符串的相互轉化
 char[] cs = "Hello".toCharArray();
 String s = new String(cs);

### 包装类型
基本类型： byte, short, int ,long, boolean, float, double, char（java对所有的基本类型都提供了包装类）
引用类型： class 和 interface (String,Integer,Boolean等等，都属于包装类)
引用类型可赋值为null,表示空，单基本类型不能赋值为null;

总是使用compareTo()比较两个BigDecimal的值，不要使用equals()！



### java中的集合
数组
  String[] ss = new String[10];
  数组有两个特点
  1。数组初始化之后大小不可变。
  2. 数组只能索引顺序存取。

Collection
    Collection是出map之外的其他集合的根接口，java包主要提供了一下三种类型集合。
    List: 一种有特定顺序的表集合。
    Set: 一种保证没有重复元素的结合。
    Map: 一种通用键值查找的映射表结合。
Java访问集合总是通过统一的方式——迭代器（Iterator）来实现，它最明显的好处在于无需知道集合内部元素是按什么方式存储的。
List
  List接口的实现类为 ArrayList 和 LinkList
  add()添加
  remove() 删除
  get(索引) 获取索引对应的元素
  我们要始终坚持使用迭代器Iterator来访问List。
  Iterator本身也是一个对象，但它是由List的实例调用iterator()方法的时候创建的。
  Iterator对象知道如何遍历一个List，并且不同的List类型，返回的Iterator对象实现也是不同的，但总是具有最高的访问效率。
  Iterator对象有两个方法：hasNext()判断是否有下一个元素，next()返回下一个元素。
```
  例： List<String> list = List.of("orange","apple","grape");
  for( Iterator<String> lt=list.iterator(); lt.hasNext(); ){
    String s = lt.next();
    System.out.println(s);
  }
  List转Array
  List<String> ls= List.of("orange","apple","grape");
  Object[] ar = ls.toArray();
  //此方法会丢失类型，通常这样做
  String[] ar = ls.toArray(new String[3]);
  //List.of()是一个只读list
```
Map
  Map<String,Student> mp = new HashMap<>();
  mp.put("xiaoming",new Student());
  map.get("xiaoming");
  map遍历
  ```
  Map<String,Integer> map = new HashMap<>();
  map.put("apple",123);
  map.put("pear",456);
  map.put("banana",789);
  for(String key:map.keySet()){
    Integer value = map.get(key);
    System.out.println(value);
  }
  //或者
  for(Map.Entry<String,Integer> entry:map.entrySet()){
    String key = entry.getKey();
    Integer value = entry.getValue();
  }

  ```



















 ···
