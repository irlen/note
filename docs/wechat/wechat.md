### 准备工作
1.进入微信公众平台官网
  http://mp.weixin.qq.com
  -注册账号（分为个人和企业，只能注册个人）
  个人账号无微信认证和微信支付等高级功能。
  -下载微信开发者工具(开发文档-工具-下载)
  -登录小程序上号后台获取appid

给小程序设置苹方字体(只有苹果设备有效果)
font-family:"PingFangSC-Thin";

2.定义与引用组件
定义一个组件，跟page页面是一样的结构。
在引用该组件时，要在引用page的json配置文件中配置
{
  "usingComponents":{
    "icon":"组件的路径"
  }
}

3.数据传递
父组件向子组件传递数据是使用properties
Component({
  properties:{
    属性名:{
      type: 属性类型（String,Boolean,Number 等）,
      value: 默认值,//可选
      observer:function(newVal,oldVal,changedPath){
        //可选

      }
    }
  }
})
组件中复用数据使用behavior
结构和组件一样，使用功能Behavior关键词定义
Behavior({
    properties:{
      //主要是将各组件中需要复用的数据放在这里
    }
})
组件中导入behavior组件，在组件中复用的时候加上
behaviors:[]


4.页面生命周期函数
  onLoad:funciton(){
    //页面加载,onLoad在onReady之前触发，且每次更新都会触发
  }
  onReady:function(){
    //页面初次渲染完成
  }
  onShow:function(){
    //页面显示
  }
  onHide:function(){
    //页面隐藏
  }
  onUnload:function(){
    //页面卸载
  }

5.组件生命周期函数
create:function(){
  //组件实例进入页面节点树的时候执行，注意此时不能调用setData
}
attached: funciton(){
  //组件实例进入页面节点树的时候执行,常用
}
6.请求数据
wx.request({
    url,
    head,
    dataType:"返回数据类型",
    method:"GET",
    data:"请求参数",
    success:function(result){},
    fail:function(result){},
    complete:function(){//接口调用结束后的回调函数，成功或失败都会执行}
})

7.引入ui框架weUI
https://developers.weixin.qq.com/miniprogram/dev/extended/weui/
