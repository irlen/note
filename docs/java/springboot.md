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













`   `