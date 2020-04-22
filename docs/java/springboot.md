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
