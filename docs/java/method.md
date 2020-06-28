### Optional
java8中引入，解决对象可能有值，也可能为空的冗余判断

通过静态方法创建
```
empty()
  返回一个空的Optional对象
of()
ofNullable()
  我们都是通过of和ofNullable方法来为Optional中的value赋值，他们也是有区别的
    of方法的特点
      1.当value值为空时，会报NullPointerException异常；
      2.当value值不为空时，正常构造Optional对象；
    ofNullable方法特点
      如果value值为空，会返回empty方法构建的Optional对象（即Optional中value为空的Optional对象），也就是说ofNullable支持空值的创建；      
get()
  返回Optional中的value值

isPresent和ifPresent
  isPresent是判断Optional中的value是否为空，不为空返回true，为空返回false；
  ifPresent方法是Optional中value不为空的情况下做的一些操作；
  例如：
  Optional.ofNullable(user).ifPresent(System.out.println("不为空"))

orElse()、 orElseGet() 和 orElseThrow()
  都是处理Optional值为空的情况，如果传入value为空，进行操作；
  orElse和orElse的区别在于，如果value不为空，orElse中的操作仍然要执行，orElseGet则不会。
  orElseThrow()是在value为空的时候抛出异常；
```

### 合并连个类（拷贝第一个类的同名属性到第二个类）
```
BeanUtils.copyProperties(Obj1,Obj2);
```
### lamda流式操作
List<Integer> categoryTypeList = productInfoList.stream()
.map(e->e.getCategoryType())
.collect(Collectors.toList());
