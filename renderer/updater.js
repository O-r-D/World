const { autoUpdater } = require('electron-updater')
const { dialog } = require('electron')

//debugging using electron-logger
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"


//Disable Auto Download
autoUpdater.autoDownload = false

module.exports = () => {

  //Check for updates
  autoUpdater.checkForUpdates()

  //Listen for update found
  autoUpdater.on('update-available', () => {

    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'A new version of World is available. Do you want to download it?',
      buttons: ['Update', 'No']
    }).then(result => {
      //if button index is 0 (UPDATE), update the app
      if (result.response === 0) {
        autoUpdater.downloadUpdate()
        alert('Downloading')
      }
    })
  })


  //listen for update downloaded
  autoUpdater.on('update-downloaded', () => {

    dialog.showMessageBox({
      type: 'info',
      title: 'Update Downloaded',
      message: 'Updated is ready to install. Do it?',
      buttons: ['Install', 'Later']
    }).then(result => {
      if (result.response === 0) autoUpdater.quitAndInstall(false, true)
    })
  })
}
