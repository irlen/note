
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

### 注入数据
@Autowired
作用
  自动按照类型注入，只要容器中有唯一的一个bean对象类型和注入变量的类型匹配，就可以注入成功。
位置
  可以是变量上，也可以是方法上
