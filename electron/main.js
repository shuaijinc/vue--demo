const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')
const path = require('path')
const gotTheLock = app.requestSingleInstanceLock()
const NO_DEV = app.isPackaged;
let win;
const createWindow = () => {
  win = new BrowserWindow({
    width: 860,
    height: 660,
    minHeight: 600,
    minWidth: 800,
    show: false,
    frame: false,
    title: "音视频格式转换",
    icon: path.join(__dirname, './logo.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })
  if (!NO_DEV) {
    win.webContents.openDevTools();
    win.loadURL('http://127.0.0.1:8080')
  } else {
    win.loadFile(path.join(__dirname, './dist/index.html'))
  }
  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(win.webContents)
  win.once('ready-to-show', () => {
    win.show()
  })
  win.on('maximize', () => {
    win.webContents.send('win-max', true)
  })
  win.on('unmaximize', () => {
    win.webContents.send('win-max', false)
  })
}
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
      win.show()
    }
  })
}
app.on('window-all-closed', () => {
  app.quit()
})
app.whenReady().then(() => {
  createWindow()
})
ipcMain.on('close', () => {
  win.close()
})
ipcMain.on('max', () => {
  if (win.isMaximized()) {
    win.restore();
  } else {
    win.maximize();
  }
})
ipcMain.on('min', () => {
  win.minimize()
})