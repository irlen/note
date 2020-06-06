### mybatis

###springboot中注解方式使用mybatis

mybatis起步依赖
```
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.2</version>
</dependency>
```
mysql起步依赖
```
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```
application.yml配置

```
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: root
    password: irlen
    url: jdbc:mysql://10.0.0.99:3306/sell?characterEncoding=utf-8&useSSL=false
  jpa:
    show-sql: true
```

启动类添加@MapperScan
```
@MapperScan(basePackages="mapper包的位置")
```
编写实体类（省略）和mapper
```
@Mapper
public interface UserMapper {
  @Insert("insert into user (user_id,user_name,password,role_id) values(" +
          "#{userId,jdbcType=VARCHAR}," +
          "#{userName,jdbcType=VARCHAR}," +
          "#{password,jdbcType=VARCHAR}," +
          "#{roleId,jdbcType=INTEGER}" +
          ")")
   int saveUser(User user);

  @Select("select * from user")
  @Results({
          @Result(column="user_id", property="userId"),
          @Result(column="user_name",property="userName"),
          @Result(column="password",property="password"),
          @Result(column="role_id",property = "roleId")

  })
  List<User> findAll();

  /**
   * 根据字段更新
   * @param roleId
   * @param userName
   * @return
   */
  @Update("update user set role_id=#{roleId} where user_name=#{userName}")
  int updateUser(@Param("roleId") Integer roleId,@Param("userName") String userName);

  /**
   * 根据对象来更新
   * @param user
   * @return
   */
  @Update("update user set role_id=#{roleId} where user_name=#{userName}")
  int updateUserByObject(User user);

  @Delete("delete from user where user_name=#{userName}")
  int deleteUser(String userName);
}
```
最后可以像springDataJPA一样分层
mapper->dao->service
