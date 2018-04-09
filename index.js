const electron = require('electron')

const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow() {
  // 创建浏览器窗口
  win = new BrowserWindow({width: 800, height: 600})

  // 加载应用首页
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))

  // 监听窗体关闭
  win.on('closed', () => {
    // 窗体关闭时,取消对window对象的引用
    win = null
  })

}

app.on('ready', createWindow)

// 当全部窗口关闭时退出
app.on('window-all-closed', () => {
  // 在macOS上,除非用户用Cmd + Q确定地退出
  // 否则绝大部分应用及其菜单栏会保持激活
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上,当单击docker图标并且没有其他窗体打开时,
  // 通常在应用程序中重新创建一个窗体
  if (win === null) {
    createWindow()
  }
})

