import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import Storage from './storage';
import VideoLogic from './tabVideo';
import GameLogic from './tabGame';
import ModalWindowAdd from './modalWindowAdd';
import ModalWindowAut from './modalWindowAut';
import ModalWindowReg from './modalWindowReg';
import ModalWindowFriends from './modalWindowFriends';

export default class MainProcess {
  constructor() {
    this.storage = new Storage();
    this.videoLogic = new VideoLogic();
    this.gameLogic = new GameLogic();
    this.subscribeForCreateModalWin();
    this.subscribeForAppGame();
    this.subscribeForAppVideo();
    this.subscribeForAppEvents();
    this.subscribeForUserLogic();
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
      this.gameLogic.setWindow(this.win);
    });
    this.win.webContents.openDevTools({ mode: 'detach' });
    this.win.on('closed', (e) => {
      e.preventDefault();
      this.win = null;
      this.modalWindowAdd.winModal = null;
    });
  }

  subscribeForUserLogic() {
    ipcMain.on('save-user', (_, data) => {
      if (this.videoLogic.findPath('userData')) {
        this.storage.setUser('userData', data);
      }
    });

    ipcMain.handle('get-user', () => this.storage.get('userData')[0]);

    ipcMain.on('leave-user', () => this.storage.rewriteUser('userData', { online: false }));
  }

  subscribeForCreateModalWin() {
    ipcMain.on('create-win-friend', () => {
      this.ModalWindowFriends = new ModalWindowFriends();
      this.ModalWindowFriends.startWin();
    });

    ipcMain.on('create-win-add', () => {
      this.modalWindowAdd = new ModalWindowAdd();
      this.modalWindowAdd.startWin();
    });

    ipcMain.on('create-win-aut', () => {
      this.modalWindowAut = new ModalWindowAut();
      this.modalWindowAut.createModalWindow();
    });

    ipcMain.on('close-win-aut', () => {
      this.modalWindowAut.winModal.hide();
      this.win.webContents.send('navigate-app', { test: true });
    });

    ipcMain.on('close-win-reg', () => {
      this.modalWindowReg.winModal.hide();
    });

    ipcMain.on('create-win-reg', () => {
      this.modalWindowReg = new ModalWindowReg();
      this.modalWindowReg.createModalWindow();
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
    ipcMain.handle('set-game-data', (e, files) => this.gameLogic.setGame(files));
    ipcMain.handle('delete-game', (e, p, n) => this.gameLogic.deleteGame(p, n));
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
