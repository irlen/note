# vue3
elementplus组件库
https://element-plus.org/zh-CN/guide/design.html

### 项目构建
  npm方式
  npm init vite-app myapp
  yarn方式
  yarn create vite-app myapp



### ref reactive toRef toRefs
ref 是对原始数据的拷贝（一般是将原始基础数据复制到引用类型保存），当修改ref数据时，模板中的视图会发生改变，但是原始数据并不会改变（取值需加.value）。
reactive与ref同理，不过是针对引用类型的对象(取值不需要加.value)。
toRef(obj,key) 是对原始数据的引用，将对象中的某个值转化为响应式数据，修改toRef数据时，原始数据也会发生改变，但是视图并不会更新。
toRefs(obj)是对整个对象转化为响应式数据，使解构后的数据重新获得响应式,修改时原始数据发生改变，视图不更新。
toRefs的使用场景：如果想让响应式数据和原来的数据关联起来同步更新，并且不更新视图，那么就可以使用toRefs
let objData = reactive({
   webName: 'xiguapengpeng',
   webUrl: 'https://xiguapengpeng.github.io/'
 });
 // 数据对象解构
 let { webName, webUrl } = toRefs(objData);
