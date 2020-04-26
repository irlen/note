### vue语法

#模板中显示数据
{{}}，v-text="",v-html="字符串中包含标签将作为html解析"

#绑定事件
v-on:click="handleClick"  @click="handleClick"

#属性绑定
v-bind:title="title"  , :title=""

#双向数据绑定
v-model=""

#vue中的计算属性和侦听器
```
computed:{
    fullName: function(){
        return this.firstName+' '+this.lastName;
    }
}
watch:{
    fullName:function(){
        监听fullName,如果fullName发生变化，就做出相应变化；
    }
}
```
#vue中条件判断和循环
```
v-if="ture" ， v-show="true"
<li v-for="item of list">{{item}}</li>
```
#vue中样式和class的绑定
style="原生的样式"
:style="{一个样式的对象，数据可以来自vue实例中的成员变量}"
:class="{'active': true}" 绑定单个class,并判断是否生效
:class="[{'active': true},{'isShow':true}]"
#vue中数据传递
1.父组件向子组件传递数据props

父组件将值绑定到子组件属相上:data= "data"
子组件
````
export default {
    props: ['logo']
}
使用的时候，直接{{logo}}
```
2.子组件向父组件传值
```
//子组件
<input @change="setUser" />
data(){
    return {
        username:''
    }
},
methods:{
    setUser: function(){
        this.$emit('transferUser',this.username);
    }
}
//父组件
<子组件 @transferUser="getUser"></子组件>
methods:{
    getUser(username){
        this.user=username
    }
}
```




### Vue-cli
vue工程的脚手架工具
#全局安装vue-cli
npm install -g @vue/cli  @vue/cli-service-global\

#创建基于webpack模板的新项目
vue create todolist

#到应用目录下启动项目
npm run serve

### 集成element-ui组件库

#安装组件库
cnpm install -S element-ui

#在main.js中引入，全局可用
import ElementUI from 'element-ui'
import  'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);


### vue-router

vue官方路由解决方案

#组件标签
```
<div>
    <router-link to="/foo"></router-link>
    //匹配到的组件将渲染到这里
    <router-view></router-view>
</div>
```
#定义路由
```
const routes = [
    {path:'/foo',component: Foo},
    {path:'bar',component: Bar}
]
```

#创建router实例
```
const router = new VueRouter({
    routes
})
```
#创建和挂载根实例
```
const app = new Vue({
    router
}).$mount("#app");
```
#动态路由传参
```
routes: [
    {path: '/user/:id',component: User}
]
```

#监测路由变化
```
watch: {
    '$route'(to,from){
        //对路由变化做出回应
    }
}

```
#使用路由的一些方法

//获取参数
this.$route.params.username;
//后退
this.$router.go(-1);
//跳转到新的路由
this.$router.push("/");
this.$router 和 router 使用起来完全一样。我们使用 this.$router 的原因是我们并不想在每个独立需要封装路由的组件中都导入路由

#2.2中引入了导航守卫beforeRouteUpdate
```
const User = {
    template: '<div></div>',
    beforeRouterUpdate(to,from,next){
        //执行响应操作，不要忘记回调next();
    }
}
```
#匹配404
将这个路由匹配放到最后面
```
{
    path: '*',//会匹配所有路径
    component: 404
}
```
当使用通配符时，$route.params内会自动添加一个名为 pathMatch 参数，它包含了URL通过通配符匹配到的东西
this.$route.params.pathMatch;

#嵌套路由
```
const User = {
  template: `
    <div class="user">
    <h2>User {{ $route.params.id }}</h2>
    <router-view></router-view>
    </div>`
}
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```
基于上面的配置，当你访问 /user/foo 时，User 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：

```
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id', component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome },

        // ...其他子路由
      ]
    }
  ]
})
```

#命名路由
```
const router = new VueRouter({
    routes:[
        {
            path:'/user/:userId',
            name:'user',
            component: User
         }
    ]
})
```
使用时
```
<router-link to="{name:'user',params:{userId:123}}">user</router-link>
router.push({name:'user',params:{userId:123}});
```
#命名视图
同一个url可以在一个页面上显示多个视图，只要对应好视图名字，未命名的视图则是default
```
<div>
    <router-view class="view one"></router-view>
    <router-view class="view two" name="a"></router-view>
    <router-view class="view three" name="b"></router-view>
</div>
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})

```
#重定向和别名
```
const router = new VueRouter({
    routes:[
        {path:'/a',redirect:'/b'}  
        或着 {path:'',redirect:{name:'foo'}}
        或者 {path:'/a',redirect: to=>{
            //方法接收目标路由作为参数
            //return 重定向字符串路径或者路径对象
       }}
    ]
})

```
#别名
给‘/a’匹配别名‘/b’，则访问‘/b’和访问‘/a’是一样的
```
const router = new VueRouter({
    routes:[
        {path: '/a',component: A, alias: '/b'}
    ]
})
//alias 别名
```
#路由组件传参
通过props将组件和路由解耦
如果 props 被设置为 true，route.params 将会被设置为组件属性
```
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```
基本都是通过props传递

vue-router默认使用hash路由，不需要后端支持，可用浏览器直接打开，
history路由需要后端环境支持
使用history路由，后端nginx支持
nginx
```
location / {
  try_files $uri $uri/ /index.html;
}
```
