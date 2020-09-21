### electron
### 脚手架
```
git clone https://github.com/electron/electron-quick-start.git
cd electron-quick-start
cnpm install
npm start
即可运行electron项目
```

### 实现热更新
使用nodemon
```
npm install nodemon --save-dev
```
将启动命令修改下
```
将 "start":"electron ." 改为
"start":"nodemon --watch main.js --exec 'electron .'"

```
###进程之间的通信
安装devtron,可以查看进程间通信情况
```
npm install --save-dev devtron
app.on('ready',()=>{
  ...
  require('devtron').install();
  mainwindow.webContents.openDevTools();
})
此时运行之后，会自动打开开发者工具，有一个tab栏是devtron
```
###渲染进程给主进程发送消息,使用ipcRenderer和ipcMain
```
const { ipcRenderer } = require('electron');
//向主进程发送消息,message为事件名称，hello from renderer是发送的内容
ipcRenderer.send('message','hello from renderer')
//接收主进程返回的消息
ipcRenderer.on('reply',(event,arg)=>{
  document.getElementById('message').innerHTML(arg)
})
在主进程中接收,message为事件名称，arg为接收到的消息
const { ipcMain } = require('electron');
ipcMain.on('message',(event,arg)=>{
  console.log(arg) //hello from renderer
  event.reply('reply','hello from main process')
})
```
###使用remote模块实现进程间的访问
BrowserWindow本来是mainProcess的api,但是可以通过remote引入renderProcess中使用；
const { BrowserWindow } = require('electron').remote;
主进程发送消息给渲染进程
browserWindow.webContents.send("create-new-file")
渲染进程使用ipcRenderer.on('create-new-file',()=>{})来接收

//browserWindow为当前窗口


###第三方资源包
classes,拼接class
easyMDE, MarkDown编辑器
react-simplemde-editor,react集成easyMDE的开源库

```
uuid: 生成唯一识别码
npm install --save uuid;
import uuid from 'uuid';
const newId = uuid();
```

###一些第三方工具包

```
1.eletron-is-dev,用来判断是否是开发环境
const isDev = require("electron-is-dev")
const urlLocation = isDev?"http://localhost:3000":"待定"

2.concurrently,用来同时运行两个命令
"dev":"concurrently \"npm start\"  \"electron .\" "

3.wait-on, 等待一个动作完成再进行下一个命令，包括文件加载完成，端口服务等开启完成。
"dev":"concurrently \"npm start\"  \"wait-on http://localhost:3000 && electron .\" "

3.cross-env, 跨平台设置环境变量,此处设置create-react-app的BROWSER参数，使得在运行start命令的时候浏览器不会主动打开窗口
"dev":"concurrently \"cross-env BROWSER=none npm start\"  \"wait-on http://localhost:3000 && electron .\" "

4.electron-store,数据持久化方案

5.devtron, 调试进程间通信
```


### 在React中使用Node.js API
const fs = require('fs')
console.dir(fs)
在react中打印出来的是一个空对象。
将const fs = require('fs')改为const fs = window.require('fs')
require('fs')在编译的时候就从node_modules中取出打包，
window.require('fs')，在运行的时候交由nodejs执行，在运行的时候才取出fs模块使用



### electron中app模块的相关方法
一、事件列表
1.1、ready事件
当 Electron 完成初始化时被触发，往往监听此事件来执行加载窗口的初始化。
```
app.on('ready', function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function() {
    mainWindow = null;
  })
})
```
1.2、window-all-closed事件
当所有的窗口都被关闭时触发。
如果没有监听此事件，当所有窗口都已关闭时，默认行为是退出应用程序。但如果你监听此事件， 将由你来控制应用程序是否退出，但是需要注意的是，此时before-quit、will-quit、quit事件，将失效。
如果用户按下了 Cmd + Q，或者开发者调用了 app.quit() ， Electron 将会先尝试关闭所有的窗口再触发 will-quit 事件，在这种情况下 window-all-closed 不会被触发。
```
app.on('window-all-closed',function(){
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if(process.platform!=='darwin'){
    app.quit()
  }
})
```
1.3、before-quit事件
在应用程序开始关闭它的窗口的时候被触发。 调用 event.preventDefault() 将会阻止终止应用程序的默认行为。

1.4、will-quit事件
当所有的窗口已经被关闭，应用即将退出时被触发。 调用 event.preventDefault() 将会阻止终止应用程序的默认行为。

1.5、quit事件
当应用程序正在退出时触发。
```
针对window-all-closed、before-quit、will-quit、quit四种监听应用退出的方法，可能有的人会有不理解的地方，我们可以做一个小测试，首先我们同时监听这四个事件。

app.on('window-all-closed',function(){
//窗口全部关闭事件
  console.log('window-all-closed start')
})

app.on('before-quit',function(){
//在应用程序开始关闭它的窗口的时候被触发
  console.log('before-quit start')
})

app.on('will-quit',function(){
//应用程序的窗口已经关闭，应用即将退出
  console.log('will-quit start')
})

app.on('quit',function(){
//应用程序正在退出
  console.log('quit start')
})
```
我们这边同时监听了上述的四个事件，然后我们启动程序，关闭窗口，查看打印的结果

image.png

从打印的结果，可以看出，当window-all-closed事件被监听之后，其他三个事件都会失效。
然后我们注释掉window-all-closed事件，重新启动程序，关闭窗口。
```
//app.on('window-all-closed',function(){
//  //窗口全部关闭事件
//  console.log('window-all-closed start')
//})

app.on('before-quit',function(){
//在应用程序开始关闭它的窗口的时候被触发
  console.log('before-quit start')
})

app.on('will-quit',function(){
//应用程序的窗口已经关闭，应用即将退出
  console.log('will-quit start')
})

app.on('quit',function(){
//应用程序正在退出
  console.log('quit start')
})
```
查看打印结果


image.png
从测试结果来看，四者之间的区别很明显：当监听了window-all-closed之后，其它三种事件监听就会失效。其它三种事件的执行顺序，从他们的语义可以得知：before-quit-->will-quit-->quit

1.6、open-file事件（macOS）
当用户想要在应用中打开一个文件时触发。open-file 事件常常在应用已经打开并且系统想要再次使用应用打开文件时被触发。 open-file 也会在一个文件被拖入 dock 且应用还没有运行的时候被触发。 请确认在应用启动的时候（甚至在 ready 事件被触发前）就对 open-file 事件进行监听，以处理这种情况。

1.7、open-url事件（macOS）
当用户想要在应用中打开一个url的时候被触发。URL格式必须要提前标识才能被你的应用打开。

1.8、activate事件（macOS）
当应用被激活时触发，常用于点击应用的 dock 图标的时候。

1.9、browser-window-blur事件
当一个 BrowserWindow 失去焦点的时候触发。

1.10、browser-window-focus事件
当一个 BrowserWindow 获得焦点的时候触发。

1.11、'browser-window-created事件
当一个 BrowserWindow 被创建的时候触发。

二、方法列表
app.quit()
试图关掉所有的窗口。before-quit 事件将会最先被触发。如果所有的窗口都被成功关闭了， will-quit 事件将会被触发，默认下应用将会被关闭。

app.exit(exitCode)
带着exitCode退出应用，exitCode 默认为0
所有的窗口会被立刻关闭，不会询问用户。before-quit 和 will-quit 这2个事件不会被触发

app.isReady()
返回 Boolean - true 如果Electron 初始化完成, false 其他情况.

app.focus()
在Linux系统中, 使第一个可见窗口获取焦点. macOS, 让该应用成为活动应用程序。 Windows, 使应用的第一个窗口获取焦点.

app.hide() //macOS
隐藏所有的应用窗口，不是最小化.仅针对macOS

app.show() //macOS
隐藏后重新显示所有的窗口，不会自动选中他们。.仅针对macOS

app.getAppPath()
返回当前应用所在的文件路径。

app.getPath(name)
返回一个与 name 参数相关的特殊文件夹或文件路径。当失败时抛出一个 Error 。
你可以通过名称请求以下的路径：

home 用户的 home 文件夹（主目录）
appData 当前用户的应用数据文件夹，默认对应：
%APPDATA% Windows 中
$XDG_CONFIG_HOME or ~/.config Linux 中
~/Library/Application Support macOS 中
userData 储存你应用程序设置文件的文件夹，默认是 appData 文件夹附加应用的名称
temp 临时文件夹
exe 当前的可执行文件
modulelibchromiumcontent 库
desktop 当前用户的桌面文件夹
documents 用户文档目录的路径
downloads 用户下载目录的路径.
music 用户音乐目录的路径.
pictures 用户图片目录的路径.
videos 用户视频目录的路径.


###菜单dialog,上下文菜单和原生菜单





渲染进程和主进程通信主要是用 remote调用electron api，使用window.require调用nodejs模块





### electron打包相关
选择使用electron-builder打包

```
cnpm install electron-builder --save-dev
npm run build 打包前端文件
```

更改启动函数中的urlLocation

```
const urlLocation = isDev?"http//locahost:3000":`file://${path.join(__dirname,'./build/index.html')}`;
```
在package.json中p配置build和scripts
```
"build":{
  "appId":"应用id",
  "productName":"",
  "copyright:"copyright @ 2019${author}",
  "extends": null, // react-cra会自动改入口文件，所以将默认禁掉
}

"scripts":{
  "pack":"electron-builder --dir", //生成安装完成后的文件,绿色软件
  "dist":"electron-builder", //生成安装包，需要安装才能使用
  "prepack":"npm run build", //执行pack之前会执行的命令
  "perdist":"npm run build",
}
注意：electron-build在打包的时候只会打包dependencies依赖，不会打包dev-dependencies文件，所有例如electron-is-dev这种放在了dev里面的文件需要放到生产环境依赖里面。
```

create-react-app打包出来的文件放在build中，而electron-build在打包的过程中认为build是已经打包的文件，会忽略该文件夹，所以我们需要手动配置需要打包的文件。
```
"build":{
  "files":[
    "build/**/*",
    "node_modules/**/*",
    "settings/**/*",
    "package.json",
    "main.js",
    //这些是main.js中引用的文件
    "./src/menuTemplate.js",
    "./src/AppWindow.js",
    "./src/utils/QiniuManager.js"
  ]
}

```
绝对路径改成相对路径
```
"homepage":"./"
```

在打包的文件中有个asar文件是最大的，是electron特有的担保文件，是为了保护源代码。
安装 asar可解压该文件
npm install -g asar
解压 asar文件到同目录下app文件中
asar  extract app.asar  ./app

### 生成安装包

package.json中配置
"directories":{
  //告诉electron一些静态图片资源放到assets文件夹了
  "buildResources": "assets"
}

//mac的配置
```
"mac":{
  //安装在苹果的哪个类目下,某个类目怎么表示可以到苹果的官网去查
  "category":"public.app-category.productivity",
  //安装包名字
  "artifactName":"${productName}-${version}-${arch}.${ext}"
}
dmg是mac系统的一种安装文件格式
"dmg":{
  "background":"assets/appdmg.png",
  "icon":"assets/icon.icons",
  "iconSize":100,
  //mac安装时候界面，左右图标位置
  "contents":[
    {
      "x": 380,
      "y": 280,
      "type": "link",
      "path": "/Applications"
    },{
      "x":110,
      "y": 280,
      "type": "file"
    }
  ]
}

```
//window的配置
```
"win":{
  //打包出的文件类型
  "target":[
    "msi","nsis"
  ],
  "icon":"assets/icon.ico",
  "artifactName":"${}-Web-Setup-${version}.${ext}", //打包名称
  "publisherName":"Viking Zhang"
},
//对nsis安装包做一些额外的配置
"nsis":{
  "allowToChangeInstallationDirectory": true, //允许选择要安装的文件夹
  "oneClick": false, //非一键安装
  "perMachine": false
}




### 安装包的体积优化
因为electron打包的时候不会打包dev-dependencies文件,所以将dependencies中的不需要使用的依赖全部放到dev-dependencies中，这样可以减小打包体积。
新建配置文件webpack.config.js，解决main.js中引入的文件打包时候还需在build字段中配置的问题。

const path = require("path");
//这个只是用来打包main.js到build文件夹
module.exports = {
  target: 'electron-main',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname,'./build'),
    filename: 'main.js'
  },
  node:{
    __dirname: false //默认dirname是"/"，这里我们需要绝对路径
  }
}

在scripts中添加这个打包命令...
  "buildMain":"webpack"
}

此时，build字段中files字段配置的main.js引入的自定义文件就不需要手动引入了，可以删除。
入口文件就变成了build文件夹下的main.js，所以在build字段中加入配置，并更改引入index.html的路径：
"extraMetadata":{
  "main": "./build/main.js"
}


### 自动更新
1.打包时自动发不到github
package.json中配置
"version":"1.0.0", ***根据version判断是否需要更新
"publish":["github"], ***使用github平台
scripts字段中添加一个配置命令,package的时候会自动发布一个release，不需要手动发布
"release": "electron-builder"
"prerelease":"npm run build && npm run buildMain"

github需要一个access token,可以到https://github.com/settings/tokens/new获取一个。
将token添加到环境变量里面，将release命令改成：
"release": "cross-env GH_TOKEN=277aslkfjalfj3lk43j54l electron-builder"

运行 npm run package就会自动发布到github

2.客户端检测更新
开始-检查更新-下载完成-通知用户-更新安装
安装electron-updater
npm install electron-updater --save-dev
在main.js中引入
const { autoUpdater } = require('electron-updater')

app.on('ready',()=>{
  autoUpdater.autoDownload = false ***当检测有更新的时候不会主动下载
  autoUpdater.checkForUpdatesAndNotify() **检测更新，并通知，只要打包环境中才有用，开发环境不会运行
  ***错误时候调用
  autoUpdater.on('error',(error)=>{
    dialog.showErrorBox('Error:',error=null?"unknow":(error))  
  })
  ***检测更新
  autoUpdater.on('checking-for-update',()=>{
      console.log("Checking for update...")
  })
  ***检测到更新回调
  autoUpdater.on('update-available',()=>{
      dialog.showMessageBox({
          type:"info",
          title:"应用有新的版本",
          message:"发现新版本，是否现在更新？",
          buttons:['是','否'],
      },(buttonIndex)=>{
        if(buttonIndex === 0){
          autoUpdater.downloadUpdate();
        }
      })
  })
  ****没有更新回调
  autoUpdater.on('update-not-avalilable',()=>{
      dialog.showMessageBox({
          title:"没有新版本",
          message:"当前已是最新版本"
      })
  })

  ...
})


3.本地调试自动更新
根目录创建一个dev-app-update.yml配置文件(release的时候会自动生成)
里面写上：
owner: vikinggmute, ***作者
repo: clouddoc, ***仓库
provider: github
main.js中，判断是否是开发环境，并执行相应操作
app.on('ready',()=>{
    if(isDev){
      autoUpdater.updateConfigPath = path.join(__dirname,'dev-app-update.yml')
    }
})
将autoUpdater.checkForUpdatesAndNotify()改成autoUpdater.checkForUpdates(),因为前者只有生产环境才能用
autoUpdater.on('download-progress',(progressObj)=>{
    ***下载进度效果
})
***下载完毕后，确认安装的回调
autoUpdater.on('update-downloaded',()=>{  
  dialog.showMessageBox({
      title:"安装更新",
      message:"更新下载完毕,应用将重启并进行安装"
  },()=>{
    setImmediate(()=>autoUpdater.quitAndInstall())
    })
})

改下版本，保存代码，就会触发更新检测等一系列操作











···
