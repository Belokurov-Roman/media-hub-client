const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'MediaHub.app', 'Contents', 'MacOS', 'MediaHub')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'MediaHub')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'MediaHub.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
