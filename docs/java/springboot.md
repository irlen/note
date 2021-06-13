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
```
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
</dependency>
```
注意：热部署失败的原因是 IDEA默认情况下不自动编译，需要对IDEA进行自动编译设置
file-settings-Compiler  勾选 build project automatically

shift+ctrl+alt+/, 选择Registry-compiler.automake.allow.when.app.running 勾选

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


  pom.xml中需引入依赖
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-configuration-processor</artifactId>
      <optional>true</optional>
  </dependency>
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
  //注意：类里面要有name和age的getter,setter方法
}
```

### SpringBoot集成

### 集成mybatis
添加mybatis起步依赖
```
  <dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter<artifactId>
    <version>1.1.1</version>
  </dependency>
```
注意：idea设置了自动导入依赖包，但是还是不能导入，是因为节点模式。
File->Power Save Mode 被勾选了，去掉勾选即可。
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
    driverClassName: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=utf8
    username: root
    password: root

    mybatis: 
      configuration: 
        map-usederscore-tocamel-case: true
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

### 集成druid数据库连接池
```
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.2.5</version>
</dependency>
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```
在application.yaml中配置
spring->datasource下添加
```
type: com.alibaba.druid.pool.DruidDataSource
initialSize: 5
minIdle: 5
maxActive: 20
maxWait: 60000
timeBetweenEvictionRunsMillis: 60000
minEvictableIdleTimeMillis: 300000
validationQuery: SELECT 1 FROM DUAL
testWhileIdle: true
testOnBorrow: false
testOnReturn: false
poolPreparedStatements: true
//配置监控统计拦截的filters，去掉后监控界面sql无法统计，'wall'用于防火墙
filters: stat,wall,log4j
maxPoolPreparedStatementPerConnectionSize: 20
useGlobalDataSourceStat: true
connectionProperties: druid.stat.mergeSql=true;druid.stat.slowSqlMillis=500
thymeleaf:
  cache: false
pagehelper:
  helperDialect: mysql
  reasonable: true
  supportMethodsArguments: true
  pageSizeZero: false
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

### 集成日志
选择slf4j和Logback框架，无需安装依赖（spring自带）
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

### 表单验证及参数接收
接收参数的几种方式
```
//此为接收Girl对象的各个属性
publiuc addGirl(
  @RequestParam("age") Integer age,
  @RequestParam("sex") String sex
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
### http请求及参数获取
post请求提交数据有四种常见方式：

1.application/x-www-form-urlencoded
  浏览器的原生 <form> 表单,其中ajax也是用这种方式提交的
2.multipart/form-data
  表单上传文件用的这种提交方式
3.application/json
  这种提交方式的消息主体是一个json字符串
4.text/xml
  消息主体是XML格式的内容
就收参数的方法主要有三种
注解|支持类型|支持的请求类型|支持的Content-Type|请求示例
---|:--:|:--:|:--:|---:
@PathVariable|url|Get|all|/orders/{id}
@RequestParam|url|Get|all|/orders?name=abc
@RequestParam|Body|Post/Put/Delete/Patch|form-data,x-www.form-urlencoded| {id:"1",name:"abc"}
@RequestBody|Body|Post/Put/Delete/Patch|json|{"id":"1","name":"adc"}






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
```
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
```
3.新建一个异常捕获类
```
@ControllerAdvice
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
    super(message);
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
  //枚举类的构造函数不能有public修饰符，注意枚举类不能派生子类（类的默认修饰符为final),构造函数默认修饰符为private,无需再添加
  ResultEnum(Integer code,String msg){
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


### 分布式系统下的session
分布式系统集群是紧密相关的，但是完全不同的概念。
分布式是指拥有多个节点，各个几点之间通过消息通信。
集群是指同一类节点有多个，担任同一功能，是为了分担任务，减少压力。




### mabatis注解使用
pom.xml引入起步依赖
```
<dependency>
  <groupId>org.mybatis.spring.boot</groupId>
  <artifactId>mybatis-spring-boot-starter</artifactId>
</dependency>
```


新建实体类，新建对应的mapper。
在domain文件中创建实体类
```
@Entity
@DynamicUpdate
@Data //lombok提供
@AllArgsConstructor //lombok提供，创建一个全参数构造函数
@NoArgsConstructor //lombok提供，创建一个无参数构造函数
public class User{
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  //主键自增
  private String user_id;
  private String user_name;
  private String password;
  private Integer rule_id;

  //private Date update_time;
  //private Date  create_time;
  //DynamicUpdate可以更改时间自动更新,创建和更新时间不需要写在实体类中

}
//用软件创建好表之后，用语句追加
alter table `user` add `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间';
alter table `user` add `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次更新时间';
```
用代码创建数据表
CREATE TABLE `user`(
  `user_id` int(16) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(64) NOT NULL COMMENT '用户名', 
  `user_pass`  varchar(64) NOT NULL COMMENT '用户密码',
  `role_id` int(8) NOT NULL DEFAULT 1 COMMENT '用户角色',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uqe_user_id` (`user_id`)
)  ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

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
}
```

### 集成定时任务task
使用注解@EnableScheduling开启定时任务，会自动扫描
定义@Component作为组件被容器扫描
表达式生成地址： http://cron.qqe2.com


在启动类上加上注解
@EnableScheduling //有此类则会自动扫描组内的所有包

在组内新建定时任务
```
@Component
public class TestTask{
  private static SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss);
  @Scheduled(fixedRate = 3000)  //以3s的固定评率执行该任务
  public void reportCurrentTime(){
    System.out.println("现在时间"+dateFormat.format(new Date()));
  }
}

注： @Scheduled(cron="表达式") ，表达式可以详细的指定执行的时间范围和频率，在上面网站上可操作生成表达式。
```
### 集成异步执行程序
使用注解@EnableAsync开启异步任务，会自动扫描

异步类需要加@Component注解
类中的异步方法加@Async注解
在使用的时候需要实例化对象，调用异步方法，异步方法会同时执行，没有先后顺序。
使用Future接口


### 集成拦截器
使用注解 @Configuration 配置拦截器
继承 WebMvcConfigurerAdapter
重写 addInterceptors 添加需要的拦截器地址

```
@Configuration
public class WebMvcConfigure extends WebMvcConfigureerAdapter{
  @Override
  public void addInterceptors(InterceptorRegistry registry){
    registry.addInterceptor(new OneInterceptor()).addPathPatterns(/one/**);
    super.addInterceptors(registry);
  }
}
//以上代码意思是配置一个拦截器，拦截器在路由为/one/**的控制器执行的时候执行。
public class OneInterceptor implements HandleInterceptor{
  @Override
  public boolean preHandle(HttpServerletRequest request, HttpServletResponse response, Object object)throws Exception{
    //控制器执行前执行
    System.out.println("被拦截");
    return true; //true就是被放行
  }
  @Override
  public void postHandle(){
    //控制器执行时候执行
  }

  @Override
  public void afterCompletion()throws Exception{
    //控制器执行之后执行
  }
}

```

### 集成JWT
添加依赖
```
<dependency>
  <groupId>com.auth0</groupId>
  <artifactId>java-jwt</artifactId>
  <version>3.4.0</version>
</dependency>
```
定义两个注解
```
用来跳过验证的PassToken注解
@Target({ElementType.METHOD,ElementType.Type})
@Retention(RetentionPolicy.RUNTIME)
public @interface PassToken{
  boolean required() default true;
}

需要登录才能操作的注解UserLoginToken
@Target({ElementType.METHOD,Element.Type})
@Retention(RetentionPolicy.RUNTIME)
public @interface UserLoginToken{
  boolean required() default true;
}

```
token的生成方法
```
//放在TokenService类中
public String getToken(User user){
  String token = "";
  token = JWT.create().withAudience(user.getUserId()).sign(Algorithm.HMAC256(user.getUserPass()));
  return token;
}
//Algorithm.HMAC256():使用HS256生成token,密钥则是用户的密码，唯一密钥的话可以保存在服务端。
//withAudience()存入需要保存在token的信息，这里我把用户ID存入token中
```
接下来需要写一个拦截器去截获token并验证token
```
public class AuthenticationInterceptor implements HandlerInterceptor(){
  @Autowired
  private UserService userService; //userService为user的mapper

  @Override
  public boolean preHandle(HttpServerletRequest httpServerletRequest,HttpServerletResponse httpServerletResponse, Object object) throws Exception{
    //请求头中取出token
    String token = httpServletRequest.getHeader("token");

    // 如果不是映射到方法直接通过,忽略类及其他
    if(!(object instanceof HandlerMethod)){
      return true;
    }
    HandlerMethod handlerMethod = (HandlerMethod)object;
    Method method = handlerMethod.getMethod();
    //检查是否有passtoken注释，有则跳过认证
    if(method.isAnnotationPresent(PassToken.class)){
      PassToken passToken = method.getAnnotation(PassToken.class);
      if(passToken.required()){
        return true;
      }
    }
    //检查有没有需要用户权限的注解
    if(method.isAnnotationPresent(UserLoginToken.class)){
      UserLoginToken userLoginToken = method.getAnnotation(UserLoginToken.class);
      if(userLoginToken.required()){
        //执行认证
        if(token == null){
          throw new RuntimeException("无token，请重新登录认证");
        }
        //获取token中的userId;
        String userId;
        try{
          userId = JWT.decode(token).getAudience().get(0);
        }catch(JWTdecodeException j){
          throw new RuntimeException("401");
        }
        User user = userService.findById(userId);

        if(user == null){
          throw new RuntimeException("该用户不存在");
        }

        //验证token
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(user.getUserPass())).build();
        try{
          jwtVerifier.verify(token);
        }catch(JWTVerificationException e){
          throw new RuntimeException(e)
        }
        return true;
      }
    }
    return true;
  }
  @Override
  public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

  }
  @Override
  public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,  Object o, Exception e) throws Exception {
  }

}
```
//配置拦截器
在SpringBoot2.0及Spring 5.0中WebMvcConfigurerAdapter已被废弃，直接实现WebMvcConfigurer （官方推荐）
```
@Configuration
public class InterceptorConfig implements WebMvcConfigurer{
  @Override
  public void addInteceptors(InterceptorRegistry registry){
    registry.addInterceptor(authenticationInterceptor()).addPathPatters("/**");
  }
  @Bean //该注解的意思是产生一个上下文的bean对象，交个spring容器管理
  public AuthenticationInterceptor authenticationInterceptor(){
    return new AutheticationInterceptor();
  }
}

```
//在访问接口中加入登录操作注解，注解可判断该方法是否需要登录才能调用
```
@RestController
@RestMapping("/api")
public class UserApi{
  @AutoWired
  UserService userService;
  @AutoWired
  TokenService tokenService;
  //登录接口,登录成功之后要将token传到前端，前端赋值给header中的token
  @PostMapping("/login")
  public Object login(@RequestBody User user){
    JSONObject jsonObject = new JSONObject();
    User userForBase = userService.findByUserName(user);
    if(userForBase = null){
      jsonObject.put("message","登录失败，用户不存在");
      return jsonObject;
    }else{
      if (!userForBase.getPassword().equals(user.getPassword())){
        jsonObject.put("message","登录失败,密码错误");
        return jsonObject;
      }else {
        String token = tokenService.getToken(userForBase);
        jsonObject.put("token", token);
        jsonObject.put("user", userForBase);
        return jsonObject;
      }
    }
  }
  //验证是否登录成功
  @RequestMapping("/getMessage")
  @UserLoginToken
  public String getMessage(){
    return "您已成功登录";
  }
}
```
### json解析
FastJSON
```
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.47</version>
</dependency>
```
json以json字符串的形式传到后端
```
  //json字符串转化成JSONObject对象
  JSONObject object = JSONObject.parseObject("{\"boolean\":true,\"string\":\"string\",\"list\":[1,2,3],\"int\":2}");

  //从JSONObject中取出对应的string类型的键值
  String s = object.getString("string");

  //从JSONObject中取出对应的int类型的键值
  int i = object.getIntValue("int");

  
  //从JSONObject中取出对应的boolean类型的键值
  boolean b = object.getBooleanValue("boolean");


  //从JSONObject中取出对应的list类型的键值，并转化成List对象
  List<Integer> integers = JSON.parseArray(object.getJSONArray("list").toJSONString(),Integer.class);

  //JSONArray直接转化为List对象,result为list类型json字符串
  List<String> dataArr = JSONArray.parseArray(result,String.class);

  //从字符串解析JSON对象
  JSONObject obj = JSON.parseObject("{\"runoob\":\"菜鸟教程\"}");

  //从字符串解析JSON数组
  JSONArray arr = JSON.parseArray("[\"菜鸟教程\",\"RUNOOB\"]\n");

  //将JSON对象转化为字符串
  String objStr = JSON.toJSONString(obj);
  
  //将JSON数组转化为字符串
  String arrStr = JSON.toJSONString(arr);

```
































```
