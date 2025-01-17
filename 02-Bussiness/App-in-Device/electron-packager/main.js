// main.js
// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
function createWindow () {   
  // 隐藏菜单栏
  Menu.setApplicationMenu(null)
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 450,   //窗口宽度,单位像素. 默认是 800
    height: 811,  //窗口高度,单位像素. 默认是 600
    icon: './logo.ico', // 设置窗口左上角的图标
    show: true, //窗口创建的时候是否显示. 默认为 true
    webPreferences: {
      nodeIntegration: true, // 是否完整支持node。默认为 true
      preload: path.join(__dirname, 'preload.js')  //界面的其它脚本运行之前预先加载一个指定脚本。
    }
  })
  // 下面这两行代码配合上面 new BrowserWindow 里面的 show: false，可以实现打开时窗口最大化
  // win.maximize() //全屏
  win.show()
  // 并且为你的应用加载index.html
  win.loadFile('./dist/index.html')
}
// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)
// 当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
