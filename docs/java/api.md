
#java基础回顾
Java只允许一个class继承自一个类，因此，一个类有且仅有一个父类。只有Object特殊，它没有父类。

继承有个特点，就是子类无法访问父类的private字段或者private方法。

为了让子类可以访问父类的private字段和方法，我们需要把private 改为 protected,用protected修饰的字段和方法可以被子类访问。

protected关键字可以把字段和方法的访问权限控制在继承树内部，一个protected字段和方法可以被其子类，以及子类的子类所访问

在Java中，任何class的构造方法，第一行语句必须是调用父类的构造方法。如果没有明确地调用父类的构造方法，编译器会帮我们自动加一句super()，但这时候父类必须有无参数的构造方法，如果要使用父类的有参数的构造方法，需要手动调用加上参数,例如super(arg1,arg2)

###关于继承权限
正常情况下class没有final修饰符的时候，任何类都可以从该class继承。
final类中的成员变量可以根据需要设为final，但是要注意final类中的所有成员方法都会被隐式地指定为final方法。
final修饰方法是避免被继承类重写,类的private方法会隐式地被指定为final方法。（private方法本身不能被子类访问）。
对于一个final变量，如果是基本数据类型的变量，则其数值一旦在初始化之后便不能更改；如果是引用类型的变量，则在对其初始化之后便不能再让其指向另一个对象。
从Java 15开始，允许使用sealed修饰class，并通过permits明确写出能够从该class继承的子类名称。
例如 public sealed class Shape permits Rect, Circle, Triangle{ }
###接口
接口是抽象类加抽象方法
所谓interface，就是比抽象类还要抽象的纯抽象接口，因为它连字段都不能有。因为接口定义的所有方法默认都是public abstract的，所以这两个修饰符不需要写出来（写不写效果都一样）。interface就是用来被实现（implements）的。一个interface可以继承（extends）另一个interface。
interface Person {
    void run();
    String getName();
}
在Java中，一个类只能继承自另一个类，不能从多个类继承。但是，一个类可以实现多个interface
class Student implements Person, Hello { // 实现了两个interface }

接口中可以定义default方法
实现类可以不必覆写default方法。但实现类的实例都可以调用该方法,default方法的目的是，当我们需要给接口新增一个方法时，会涉及到修改全部子类。如果新增的是default方法，那么子类就不必全部修改，只需要在需要覆写的地方去覆写新增方法。

###静态字段和静态方法
实例字段在每个实例中都有一个自己的独立空间，但是静态字段只有一个共享空间，说以实例字段每个实例独有，互补干扰，而静态字段为所有实例共用。实例可访问并修改静态字段（通常我们直接用类去调用）。

因为静态方法属于class而不属于实例，因此，静态方法内部，无法访问this变量，也无法访问实例字段，它只能访问静态字段。
静态方法经常用于工具类。例如：
Arrays.sort()
Math.random()

###作用域
private关键词定义类的内外访问权限。
定义为private的字段和方法无法被其他类访问，private访问权限被限定在class的内部。
由于Java支持嵌套类，如果一个类内部还定义了嵌套类，那么，嵌套类拥有访问private的权限

protected作用于继承关系。定义为protected的字段和方法可以被子类访问，以及子类的子类

final修饰符与访问权限不冲突，用final修饰的class可以阻止被继承，用final修饰的method可以阻止别子类覆写，用final修饰的field可以阻止被重新赋值，
被final修饰的局部变量可以阻止被重新赋值。
局部变量
在方法内部定义的变量称为局部变量，局部变量作用域从变量声明处开始到对应块结束，方法参数也属于局部变量。


注：一个.java文件只能包含一个public类，但可以包含多个非public类。


###java核心类
  String在java中是引用类型，是不可变对象，字符串操作不改变原字符串内容，而是返回新字符串，比较两个字符串是否相同必须使用equals()方法。
  字符串提供了formatted()方法和format()静态方法，可以传入其他参数，替换占位符，然后生成新的字符串。String s = "Hi %s, your score is %d!";
  System.out.println(s.formatted("Alice", 80));
  System.out.println(String.format("Hi %s, your score is %.2f!", "Bob", 59.5));

  基本类型： byte, short, int, long, boolean, float, double, char。
  引用类型： 所有class和interface类型。
  引用类型可以赋值为null,标志空，但基本类型不能复制为null。
  所有的包装类都是不变类。
  int和其包装类Integer之间的转换
  Integer n2 = new Integer(99);
  int n3 = n2.intValue();
  Integer之间的比较要用equals()比较，因为Integer包装类是引用类型。

### javaBean，就是样一个定义了私有属性，通过setter，getter方法操作属性，传递数据的类。
枚举一个JavaBean的所有属性，可以直接使用Java核心库提供的Introspector。
BeanInfo info = Introspector.getBeanInfo(Person.class);
for (PropertyDescriptor pd : info.getPropertyDescriptors()) {
    System.out.println(pd.getName());
}

###反射
class是由JVM在执行过程中动态加载，当JVM加载String类时，它首先读取String.class文件到内存，然后，为String类创建一个Class实例并关联起来
Class cls = new Class(String);(String类的class)

通过Class实例获取class信息的方法称为反射，获取一个class的Class实例有三种方法。
1.通过class的静态变量class获取。
Class cls = String.class;
2.如果我们有个实例变量，可以通过该实例变量提供的getClass()方法获取。
String s = "Hello";
Class class = s.getClass();
3.如果知道一个class的完整（意思是连同包）类名，可以通过静态方法Class.forName()获取。
Class  cls = Class.forName("java.lang.String");


如果获取到了一个Class实例，我们可以通过该Class实例来创建对应类型的实例。
Class cls = String.class;
String s = (String)cls.newIntance();
它的局限是：只能调用public的无参数构造方法。带参数的构造方法，或者非public的构造方法都无法通过Class.newInstance()被调用







#各种api使用
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
