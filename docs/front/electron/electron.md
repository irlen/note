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
//向主进程发送消息
ipcRenderer.sent('message','hello from renderer')
//接收主进程返回的消息
ipcRenderer.on('reply',(event,arg)=>{
  document.getElementById('message').innerHTML(arg)
})
在主进程中接收
const { ipcMain } = require('electron');
ipcMain.on('message',(event,arg)=>{
  console.log(arg) //hello from renderer
  event.reply('reply','hello from main process')
})
```
###使用remote模块实现进程间的访问
BrowserWindow本来是mainProcess的api,但是可以通过remote引入renderProcess中使用；
const { BrowserWindow } = require('electron').remote;
