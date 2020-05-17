
### IOC容器注解

@Component   
  作用
    将当前对象放存入Spring容器。
  属性
    value: 用于指定bean的id,不指定，则默认为当前类名，且首字母小写。
  类似@Component注解
@Controller
@Service
@Repository
  作用
    同Component注解一样，只是对三层代码类的注解

@Bean
  作用
    作用在方法上，将方法的返回值作为bean对象放入spring容器。
  属性
    name: 用于指定bean的id,不写时，默认值为当前方法名称。
  细节
    当我们使用注解配置方法时，如果方法有参数，spring框架会去容器中查找有没有可用的bean对象。查找的方式和Autowired注解的作用是一样的。

### 配置相关注解

@Configuration
  作用
    指定当前类是一个配置类

@Import
  作用
    将一个类包含到另一个类，通常是配置类（分配置引入到主配置中）
  属性
    value: 被引入类的字节码
@ComponentScan
  作用
    用于通过注解指定spring在创建容器时要扫描的包。
  属性
    value: 它和basePackages的作用是一样的，都是用于制动创建容器时要扫描的包。

@PropertySource("classpath:config/spring/.jdbcConfig.properties")
  通常配合@Value使用，不指定配置文件的时候，默认是主配置文件（application.properties或者application.yml）
  作用
    用于指定properties文件的路径。
  属性
    value: 指定文件的名称和路径
    关键字: classpath,表示类路径下

@ConfigurationProperties(prefix="spring")
  作用
    将application.yml中的字段自动映射到注解类的成员变量
  属性
    prefix: 配置文件下字段spring对象下的字段作为映射对象


### 注入数据
@Autowired
  作用
    自动按照类型注入，只要容器中有唯一的一个bean对象类型和注入变量的类型匹配，就可以注入成功。
    如果容器没有类型匹配则报错。
    如果容器中有多个类型与之匹配，会报错，此时需要用到Qualifier注解。
  位置
    可以是变量上，也可以是方法上
  @Qualifier(value="bean的id")  (本意为限定符，修饰词，合格者)
  作用
    在按照类型注入的基础之上再按照名称注入，它在给类成员注入时不能单独使用（Autowired注解的类型有多个时使用），但是在给方法参数注入时可以单独使用。
  属性
    value:被注入的bean的id
  注：Qualifier在个方法参数注解的时候可以独立使用，value值为bean的id
  ```
    public QueryRunner createQueryRunner(@Qualifier('ds1') DataSource dataSource){
      //有两个返回DataSource类型值的方法被@Bean注解了，此时需要通过id来识别到底是用哪个作为参数
    }

  ```
@Resource(name="bean的id")
  作用
    直接按照bean的id注入，可以独立使用（取代Autowired和Qualifier一起使用的情况）。
  属性
    name: 被注入的bean的id

  注意：以上三个注入只能注入其他bean类型的数据，而基本类型和String类型无法使用上述注解实现，另外，集合类型的注入只能通过XML来实现。

@Value
  作用
    用于注入基本类型和String类型的数据
  属性
    value: 用于指定数据的值，它可以使用spring的SpEl（el表达式，即${表达式}）


### 用于改变作用范围的注解

@Scope
  作用
    用于指定bean的作用范围。
  属性
    value: 指定范围的取值，常用值为 singleton prototype,即单例和多例，不写的时候默认为单例。
    ```
    @Scope("prototype")//多实例，IOC容器启动创建的时候，并不会创建对象放在容器在容器当中，当你需要的时候，需要从容器当中取该对象的时候，就会创建。
    @Scope("singleton")//单实例 IOC容器启动的时候就会调用方法创建对象，以后每次获取
    @Scope("request")//同一个请求创建一个实例
    @Scope("session")//同一个session创建一个实例
    ```

### 生命周期相关注解
@PreDestroy
  作用
    用在方法上，用于指定该方法为销毁方法。
@PostConstruct
  作用
    用在方法上，用于指定该方法为初始化方法。
注：多例对象的销毁spring不负责，所以单例对象销毁之前会调用销毁方法



### 请求类中的注解
请求类一般用@Controller或者@RestController注解
类中的方法上的注解
@RequestMapping("/quik")
@ResponseBody


### 测试类中的注解
测试类上的注解
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MySpringBootApplication.class) //引导类的字节码
方法上的注解
@Test



###实体类中的注解
@Entity  //注解在类上，表示设个类是实体类
@DynamicUpdate //注解在类上，更新时间字段在该条数据更新的时候更新为当前时间
注解在成员变量上的注解
@Id  表明该字段为映射数据表的主键
@GeneratedValue(strategy=GenerationType.IDENTITY) //mysql数据库自增字段的策略

配置lombok
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
</dependency>
安装lombok插件。
然后在类上使用@Data注解。
这样就不用写getter,setter, toString方法了。
