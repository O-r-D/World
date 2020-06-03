const {app, BrowserWindow} = require('electron')
const windowStateKeeper = require('electron-window-state')

function createWindow() {

  let state = windowStateKeeper({
    defaultWidth: 1080, defaultHeight: 500
  })


  //Create the browser Window
  let win = new BrowserWindow({
    x: state.x, y: state.y,
    width: state.width, height: state.height,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('renderer/index.html')

  state.manage(win)

  // win.webContents.openDevTools()

}


app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit
  }
})

app.on('actived', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
