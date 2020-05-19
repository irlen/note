### spring优缺点

优点: 轻量化实现EJB。
缺点：配置太繁琐
SpringBoot简化了繁琐的配置，使开发的精力集中于业务逻辑代码的编写。
SpringBoot不是对Spring功能的增强，而是提供了一个快速使用Spring的方式。

### SpringBoot环境搭建

创建一个module类型的maven工程。

pom.xml中配置
SpringBoot要求，项目要继承SpringBoot的起步依赖spring-boot-starter-parent
```
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.0.1.RELEASE</version>
  </parent>
```
SpringBoot要继承SpringMVC进行Controller的开发，所以项目要导入web的启动依赖：
```
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
</dependencies>

```
创建引导类
在java中建com.scxgo包，新建文件作为入口文件，例如 MySpringBootApplication类
```
//此注解声明类是一个SpringBoot的引导类
@SpringBootApplication
public class MySpringBootApplication{
  //程序入口

  public static void main(String[] args){
    SpringApplication.run(MySpringBootApplication.class);
  }
}
```
创建controller
创建controller包，建类，类上面加注解@Controller,方法上加@RequestMapping("/"),@ResponseBody
tomcat跑在8080端口
IDEA可以自动初始化一个springboot工程
创建新工程的时候选择Spring Initializr就可以了。

### SpringBoot工程热部署

pom.xml中需添加依赖
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
</dependency>
注意：热部署失败的原因是 IDEA默认情况下不自动编译，需要对IDEA进行自动编译设置
file-settings-Compiler-build project automatically

shift+ctrl+alt+/,选择Registry-compiler.automake.allow.when.app.running 勾选

### SpringBoot配置文件

SpringBoot是基于约定的，很多配置都有默认值，需要增加或者覆盖原有配置，可以使用
resources文件加下application.properties 或者 application.yml(或者application.yaml)进行配置。（命名规则为application*.properties或者application*.yml）
yml格式
```
//普通数据的配置
name: zhangsan  //值前面一定要有个空格

//对象的配置
person:
  name: zhangsan //缩进是自由的，但是要保证每层的缩进是一样的
  age: 18
  addr: suizhou

//行内对象配置(用的少)
person: {name: zhangsan, age: 18, addr: suizhou}

//配置数组、集合
city:
  - beijing
  - shanghai
  - suizhou
  - shenzhen

//行内数组、集合
city: [beijing,shanghai,suizhou,shenzhen]

//配置数组、集合（对象数据）
student:
  - name: tom
    age: 18
    addr: beijing
  - name: lily
    age: 25
    addr: suizhou
//行内
student: [{name: tom,age: 18,addr:beijing},{name:lily,age:25,addr: suizhou}]
```

配置文件与配置类的属性映射
有两种方式
1.@Value 注解可以将配置文件中的值映射到一个Spring管理的Bean字段上。
application.yml中
```
person:
  name: zhangsan
  age: 18

```
Bean代码如下：
```
  @Controller
  public class QuicStartController{
    @Value("${person.name}")
    private String name;
    @Value("${person.age}")
    private Integer age;
  }
```
2.@ConfigurationProperties(prefix="配置文件中key的前缀")，该注解可以将文件中的配置自动与实体进行映射
application.yml中
```
person:
  name: zhangsan
  age: 18
```
Bean中
```
@Controller
@ConfigurationProperties(prefix="person")
pulic class QuikStartController{
  private String name;
  private String age;
  @RequestMapping("/quik")
  @ResponseBody
  public String quik(){
    return "my name"+" is "+name;
  }
}
```

### SpringBoot集成

一.整合mybatis
添加mybatis起步依赖
```
  <dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter<artifactId>
    <version>1.1.1</version>
  </dependency>
```

导入数据库坐标（mysql连接驱动）
```
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
</dependency>
```

添加数据库连接信息
```
spring:
  datasource:
    driverClassName: com.mysql.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=utf8
    username: root
    password: root
```

插入数据(建表sql语句)
```
//建表语句
  DROP TABLE IF EXISTS `user`;
  CREATE TABLE `user`(
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `username` varchar(50) DEFAULT NULL,
      `password` varchar(50)  DEFAUL NULL,
      `name` varchar(50) DEFAULT NULL,
      PRIVATE KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

//插入语句
  INSERT INTO `user` VALUES ('1','zhangsan','123','张三');
  INSERT INTO `user` VALUES ('2','lisi','123','李四');
```
创建实体
java内包里见domain包，创建文件User.java建实体类
```
public class User{
  private Integer id;
  private String username;
  private String password;
  private String name;
  //后面为getter，setter方法
}
```
resources文件夹下创建mapper包，里面配置UserMapper.xml
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
"http://mybatis.org/dtd/mybatis-3-mapper.dtd" >

<mapper namespace="com.scxgo.mapper.UserMapper">
  <select id="queryUserList" resultType="user">
    select * from user
  </select>
</mapper>
```
java内包中建mapper包，建UserMapper.java文件，写接口
```
  @Mapper
  public interface UserMapper{
    public List<User> queryUserList();
  }
```

在application.yml中配置mybatis信息
```
mybatis:
  type-aliases-package: com.scxgo.domain  #pojo别名扫描包
  mapper-locations: classpath:mapper/*Mapper.xml  #加载mybatis映射文件
```

写个controller测试下
建包controller
```
  @Controller
  public class MybatisController{
    @Autowired
    private  UserMapper userMapper;
    @RequestMapping("/query")
    @ResponseBody
    public List<User> queryUserList(){
      List<User> users = userMapper.queryUserList();
      return users;
    }
  }
```


### 集成Junit

添加Junit起步依赖
```
  <dependency>
    <groupId>org.springframwork.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
```
编写测试类
```
@RunWith(SpringRunner.class)
@SpringBootTest(classes=MyApplication.class) //引导类的字节码
public class MyTest{
  @Test
  public void test(){
    ...
  }
}
```

### Spring Data JPA集成

添加起步依赖
```
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```
添加数据库驱动依赖
```
<dependency>
  <groupId>mysql</groupId>
  <artifactId>mysql-connector-java</artifactId>
</dependency>
```
在application.yml中配置数据库和jpa相关属性
```
#DB Configuration
spring:
  datasource:
    driverClassName: com.mysql.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=utf8
    username: root
    password: root
#JPA Configuration
  jpa:
    datasource: mysql
    show-sql: true
    generate-ddl: true
    hibernate:
      ddl-auto: update
      naming_strategy: org.hibernate.cfg.ImprovedNamingStrategy

```

在domain文件中创建实体类
```
@Entiry
public class User{
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;
  private String username;
  private String password;
  private name;
}
```
创建repository包，建UserRepository类
```
//User为实体类名，Long是实体类中id的数据类型
@Repository
public interface UserRepository extends JpaRepository<User,Long>{
  public List<User> findAll();
}
```
创建实现类UserImpl
```

```

### SpringBoot集成Redis
安装redis服务器并启动
添加redis起步依赖
```
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
  </dependency>
```
在application.yml中注入redis连接信息
```
spring:
  redis:
    host: 127.0.0.1
    port: 6379
```    
测试redis服务
```
@RunWith("SpringRunner")
@SpringBootTest(classes=MySpringBootApplication.class)
public class RedisTest{
  @Autowired
  private RedisTemplate<String,String> redisTemplate;
  @Autowired
  private UserRepository userRepository;
  @Test
  public void test(){
    //1.从redis中去获得需要的数据，一般是json字符串格式
    String userListJson = redisTemplate.boundValueOps("user.findAll").get();
    //2.判断redis中是否存在数据
    if(null == userListJson){
      //3.不存在，则从数据库中查询
      List<User> all = userRepository.findAll();
      //4.将查出的数据存储到redis缓存中
      //存之前先要把list转换成string，此时可是有spring自带的jackson来做
      ObjectMapper objectMapper = new ObjectMapper();
      userListJson = objectMapper.writeValueAsString(all);
      redisTemplate.boundValueOps("user.findAll").set(userListJson);
    }

  }
}

```

### 日志使用
选择slf4j和Logback框架
日志级别 error warn info debug trace
默认级别为info，info及其以上级别会触发日志记录
在类中使用Log
1.非注解方法
private final Logger logger =  loggerFactory.getLogger(LoggerTest.class);
//LoggerTest为当前使用日志的类
logger.info('输出信息');

2.使用注解@Slf4j,需要用到lombok小工具。
```
//pom.xml中配置
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
</dependency>
//类中注解用
log.info("输出信息");
//日志中输出变量的方法
log.info("name:"+name);
或者
log.info("name:{}",name);
```
Logback的配置（application.yml中配置，可区分info和erro,xml可配置定期产生日志）

logging:
  pattern:
    console: "%d - %msg%n" //日志格式，输出时间-内容-换行
    file: /var/log/tomcat/sell.log //输出日志的文件
    level: info  //输出日志级别（info及其级别以上的都会被输出）

### 表单验证及参数接受
接收参数的几种方式
```
//此为接收Girl对象的各个属性
publiuc addGirl(
  @RequestParam('age') Integer age,
  @RequestParam('sex') String sex
){

}
//接收一个Girl对象
public addGirl(Girl girl){

}
```
验证表单中字段合法性
实体类中加入限制注解
```
@Entity
public class Girl(){
  //例如对年龄进行限制
  @Min(value=18,message="未成年人禁止入内")
  private Integer age;
}
//在controller方法中
public Girl addGirl(@Valid Girl girl, BindingResult bindingResult){
    //对girl字段做验证，验证结果在bindingResult中
    //判断是否严重通过
    if(bindingResult.hasErrors){
      System.out.pringln(bindingResult.getFieldError().getDefaultMessage();
      return null;
    }
}
```

### 使用AOP处理请求
pom.xml中添加依赖
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
//新建切面类
```
@Component
@Aspect
public HttpAspect(){
  pravite final static logger = loggerFactory.getLogger(HttpAspect.class);
  @Before("execution(public * com.scxgo.myproject.addGirl(..))")
  //两点的意思是无论该方法的参数是什么都适用，就是addGirl所有的重载方法。
  //@Before是方法执行之前,执行切面中的方法,@After是在方法执行完之后执行切面中方法。
  public void doBeforMethod(){
    logger.info("方法执行前的操作")
  }
}

//excution内容每次都要重复写，可以统一定义
@Pointcut("execution(public * com.scxgo.myproject.addGirl(..))")
public void log(){}
//然后before这样写就行了
@Before("log()")
public void doBefore(){}
```
### 统一异常处理
1.定义返回的最外层对象Result
```
public class Result<T>{
  private Integer code;
  private String msg;
  private T data;
  //后面为getter,setter方法
}
```
2.定义一个工具类，优化重复代码
public class ResultUtil{
  //成功的时候调用
  public static Result success(Object data){
    Result result = new Result();
    result.setCode(1);
    result.setMessage("成功");
    result.setData(data);
    return result
  }
  //有时候成功的时候并不需要返回数据，再写一个成功的重载方法
  public static Result success(){
    return success(null);
  }
  //失败的时候调用
  public static Result error(Integer code, String msg){
    Result result = new Result();
    result.setMsg(msg);
    result.setCode(code);
    return result;
  }
}

3.新建一个异常捕获类
```
@controllerAdvice
public class ExceptionHandle{
  @ExceptionHandler(Exception.class)
  @ResponseBody
  public Result handle(Exception e){
    return ResultUtil.error(0,e.getMessage());
  }
}

//@ControllerAdvice注解的三个作用
springMVC中的功能，springboot中可以直接使用
//1.全局异常处理
//2.全局数据绑定
//3.全局数据预处理
@ExceptionHandler注解指定处理哪一类异常，这里是所有异常类型。
@ResponseBody 因为会返回类似json格式的数据到前端，此类上没有RestController注解。

```
4.定义自己的异常类
```
public class GirlException extends RunTimeException{
  private Integer Code;
  //构造函数
  public GirlException(Integer code, String message){
    supper(message);
    this.code = code;
  }

  //下面为code的getter,setter方法
}

//此时异常捕获类可改写成
@controllerAdvice
public class ExceptionHandle{
  @ExceptionHandler(Exception.class)
  @ResponseBody
  public Result handle(Exception e){
    if(e instanceOf GirlException){
      GirlException girlException = (GirlException) e;
      return ResultUtil.error(girlException.getCode(),girlException.getMessage());
    }
    return ResultUtil.error(0,e.getMessage());
  }
}
//代码中抛出异常时候可以 throw new GirlException(100,"...出错了");

```
5.定义一个枚举类型来管理code和msg的对应关系，可统一维护code和msg
```
public enum ResultEnum{
  UNKONUL_ERROR(-1,"未知错误"),
  SUCCESS(1,"成功");



  private Integer code;
  private String msg;
  public ResultEnum(Integer code,String msg){
    this.code = code;
    this.msg = msg;
  }
  //下面为getter方法，枚举不需要setter方法

  此时抛出错误时候直接用枚举代替code和msg,自定义异常类应该改成如下：
  public class GirlException extends RunTimeException{
    private Integer Code;
    //构造函数
    public GirlException(ResultEnum resultEnum){
      supper(resultEnum.getMsg());
      this.code = resultEnum.getCode();
    }

    //下面为code的getter,setter方法
  }


  ```
}

### 分布式系统下的session
分布式系统集群是紧密相关的，但是完全不同的概念。
分布式是指拥有多个节点，各个几点之间通过消息通信。
集群是指同一类节点有多个，担任同一功能，是为了分担任务，减少压力。





### mabatis注解使用
pom.xml引入起步依赖
<dependency>
  <groupId>org.mybatis.spring.boot</groupId>
  <artifactId>mybatis-spring-boot-starter</artifactId>
</dependency>
新建实体类（省略），新建对应的mapper。
```
//以新增为例
public interface ProductCategoryMapper{
  @Insert("insert into product_category (category_name,category_type) values(#{category_name, jdbcType=VARCHAR},#{category_type,jdbcType=INTEGER})")
  int insertByMap(Map<String,Object> map);
  //参数可以用Map也可以用对象，例如ProductCategory
}

//此时需要在启动类上配置MapperScan,启动时会扫描该mapper
@MapperScan(basePackages="com.imooc.dataobject.mapper")

//使用的时候（单元测试为例）
@RunWith(SpringRunner.class)
@SpringBootTest
@Slf4j
public class mybatisTest{
  @Autowired
  private ProductCategoryMapper mapper;
  @Test
  public void insertTest(){
    Map<String,Object> map = new HashMap<>();
    map.put("category_name","男生最爱");  
    map.put("category_type","101");  
    mapper.insertByMap(map);
  }
}

//如果需要返回的结果对应成实体类名称，可以这样做
@Select("select * from product_category where category_type = #{categoryType}")
@Results({
    @Result(column="category_type",property="categoryType"),
    @Result(column="category_name",property="categoryName")
})
ProductCategory findBycategoryType(Integer categoryType);

```
### websocket
```
pom.xml中引入websocket起步依赖
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
//客户端
  let websocket = null;
  if('Websocket' in window){
    websocket =  new Websocket('ws://...');
  }else{
    alert("该浏览器不支持websocket");
  }
 websocket.onopen = function(event){
   console.log("建立连接")
 }
 websocket.onclose = function(event){
   console.log("关闭连接")
 }
 websocket.onmessage = function(evnet){
   console.log("收到消息"+event.data)
 }
 websocket.onerror = funciton(){
   alert("websocket通信发生错误")
 }
 window.onbeforeunload = function(){
   websocket.close();
   console.log("窗口关闭，关闭websocket连接")
 }

 //后端
 //写个websocket配置类

 @Compoennt
 public class WebsocketConfig{
   @Bean
   public ServerEndpointExporter serverEndpointExporter{
     return new ServerEndpointExporter();
   }
 }
 //写websocket组件
 @Component
 @ServerEndpoint("/webSocket")
 @Slf4j
 public class WebSocket{
   private Session session;
   private static CopyOnWriteArraySet<WebSocket> webSocketSet = new CopyOnWriteArraySet<>();
   @onopen
   public void onOpen(Session session){
     this.session = session;
     webSocketSet.add(this)
     log.info("[websocket消息] 有新的连接,总数：{}",webSocketSet.size());
   }
 }
 @OnClose
 public void onClose(){
   webSocketSet.remove(this);
   log.info("断开，总数{}",webSocketSet.size());
 }
 @OnMessage
 public void onMessage(String message){
   log.info("收到客户端发来的消息:{}",message);
 }

 public void sendMessage(String message){
   for(WebSocket webSocket:webSocketSet){
     log.info("广播消息，message={}",message);
     try{
       webSocket.session.getBasicRemote().sendText(message);
     } catch(Exception e){
       e.printStackTrace();
     }
   }

 }
```









`   `
