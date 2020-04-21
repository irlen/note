### spring优缺点
优点: 轻量化实现EJB。
缺点：配置太繁琐
SpringBoot简化了繁琐的配置，使开发的精力集中于业务逻辑代码的编写。
SpringBoot不是对Spring功能的增强，而是提供了一个快速使用Spring的方式。

### SpringBoot快速入门
创建一个module类型的maven工程。
SpringBoot要求，项目要继承SpringBoot的起步依赖spring-boot-starter-parent
pom.xml中配置
```
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.0.1-RELEASE</version>
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
@SpringBootApplication
public class MySpringBootApplication{
  public static void main(String[] args){
    SpringBootApplication.run(MySpringBootApplication.class);
  }
}
```
