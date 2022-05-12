# 安装
node版本必须在14.16.0以上。
npx nuxi init myapp
yarn install 安装依赖
yarn dev 启动

app.vue为入口文件，pages为视图页面。

# 约定路由
nuxt的路由为/加pages文件中文件的名称。

## 动态传参路由
例如： user-[group]文件夹下有文件[id].vue
路由匹配类似 user-admin/1

## 嵌套路由
同级目录和文件同名，文件中使用<nuxt-child></nuxt-child>作为子页面插槽，同名目录中的文件就是子组件。
例如： 同级目录下有文件夹parent和parent.vue,文件夹parent中有文件child.vue
parent.vue中有一行代码<nuxt-child></nuxt-child>
访问路由：/parent/child


## 布局模板
那些放在layouts/目录下(layouts在根目录下)的SFC会被自动加载进来，default.vue为默认布局模板，将会被用于项目所有页面中作为布局模板。
layouts/default.vue

<template>
  <div>
    <slot/>
  </div>
</template>

但是有些页面不想使用公共模板default.vue怎么办，可以在layouts新建一个其他名字的文件，例如custom.vue，在需要使用这个文件的页面中设置属性layout
<script>
  export default {
    layout: 'custom '
  }
</script>
如果想更加灵活使用模板，可以使用<NuxtLayout></NuxtLayout>。
1.设置页面layout: false;
2.例如custom模板如下
  <template>
    <div>
      <slot />
      <slot name="title" />
    </div>
  </template>
3.<NuxtLayout name="custom">
  <template #default>
    <div>这个将放入custom中的默认插槽</div>
  </template>
  <template #title>
    <div>这个将放入custom中的tiltle插槽</div>
  </template>
</NuxtLayout>

## 组件自动导入
组件约定放在components/目录下（components在根目录下），在页面重无需导入，直接使用。
如果是用文件嵌套的组件，需这样使用，如：
components中有文件base，base中有foo,foo文件中是组件Button.vue;
使用的时候<BaseFooButton>


## 数据请求
useFetch
const {} = await useFetch('/api/todo');

useAsyncData
const { data } = await useAsyncData("key",()=>$fetch('/api/todos'))

## 插件机制
约定在根目录中创建plugins目录，插件放在根目录中，插件文件名以.server或者.client后缀使他们仅作用于服务端或者客户端。

创建插件
test-plugin.js
import { defineNuxtPlugin } from '#app'
export default defineNuxtPlugin(nuxtApp=>{
  return {
    provide: {
      hello: ()=>'hello world'
    }
  }
})

使用,自动注入，变量会自动加上$
const { $hello } = useNuxtApp();
$hello();

利用插件机制可以按需引入组件库
import { defineNuxtPlugin } from '#app'
import { Button } from "vue-devui"
import 'vue-devui/button/style.css'
export default defineNuxtPlugin(nuxtApp=>{
    nuxtApp.vueApp.use(Button);
})

在视图页面直接使用
<d-button></d-button>


element-plus只能全量引入，官方给出的方案
https://github.com/element-plus/element-plus-nuxt-starter

nuxt3翻译文档
http://57code.gitee.io/nuxt3-docs-zh/
http://57code.github.io/nuxt3-docs-zh/
