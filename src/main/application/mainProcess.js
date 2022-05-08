import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import Storage from './storage';
import VideoLogic from './tabVideo';
import GameLogic from './tabGame';
import ModalWindowAdd from './modalWindowAdd';

export default class MainProcess {
  constructor() {
    this.storage = new Storage();
    this.videoLogic = new VideoLogic();
    this.gameLogic = new GameLogic();
    this.modalWindowAdd = new ModalWindowAdd();
    this.subscribeForCreateModalWin();
    this.subscribeForAppGame();
    this.subscribeForAppVideo();
    this.subscribeForAppEvents();
    app.whenReady().then(() => this.createWindow());
  }

  createWindow() {
    this.win = new BrowserWindow({
      width: 1000,
      height: 600,
      minWidth: 1000,
      minHeight: 600,
      backgroundColor: '#000000',
      titleBarStyle: 'hidden',
      center: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        webSecurity: false,
        preload: path.join(app.getAppPath(), 'preload', 'index.js'),
      },
    });

    this.win.loadFile('renderer/index.html');

    this.win.webContents.on('did-finish-load', () => {
      this.win.webContents.send('createModal', false);

      this.win.webContents.send('dataApp', { pathVideo: this.storage.get('pathVideo') });
    });
    this.win.webContents.openDevTools({ mode: 'detach' });
    this.win.on('closed', () => {
      this.win = null;
    });
  }

  subscribeForCreateModalWin() {
    ipcMain.on('create-win-add', () => {
      this.win.webContents.send('createModal', true);
      this.modalWindowAdd.startWin(this.win);
    });
  }

  subscribeForAppVideo() {
    ipcMain.handle('select-video', () => this.videoLogic.getPathVideo(this.win));
    ipcMain.handle('get-path-video', () => this.storage.get('pathVideo'));
    ipcMain.on('context-menu-delete', (_, id) => console.log(id));
  }

  subscribeForAppGame() {
    ipcMain.handle('open-game-from-path', async (e, p, n) => this.gameLogic.openPath(p, n));
    ipcMain.handle('get-games-data', () => this.gameLogic.getData());
    ipcMain.on('set-game-data', (e, games) => this.gameLogic.setGame(games));
  }

  subscribeForAppEvents() {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });
  }
}

// let win;
// export function mainProcess() {
//   const createWindow = () => {
//     win = new BrowserWindow({
//       width: 1000,
//       height: 600,
//       minWidth: 520,
//       minHeight: 250,
//       backgroundColor: '#0F292F',
//       center: true,
//
//       webPreferences: {
//         nodeIntegration: true,
//         contextIsolation: false,
//         enableRemoteModule: true,
//         webSecurity: false,
//       },
//     });
//
//     win.loadFile('renderer/index.html');
//
//     win.webContents.openDevTools({ mode: 'detach' });
//
//     win.on('closed', () => {
//       win = null;
//     });
//   };
//
//   app.whenReady().then(createWindow);
//
//   app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//       app.quit();
//     }
//   });
//
//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// }
//
// export { win };
