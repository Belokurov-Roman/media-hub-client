import {
  app, BrowserWindow, ipcMain,
} from 'electron';
import path from 'path';
import GameLogic from './tabGame';
import VideoLogic from './tabVideo';
import Storage from './storage';

export default class ModalWindowFriends {
  startWin(win) {
    this.storage = new Storage();
    this.gameLogic = new GameLogic();
    this.videoLogic = new VideoLogic();
    this.subscribeForAddFile();
    app.whenReady().then(() => this.createModalWindow(win));
  }

  createModalWindow() {
    this.winModal = new BrowserWindow(
      {
        width: 300,
        height: 500,
        minWidth: 300,
        maxWidth: 300,
        minHeight: 500,
        maxHeight: 500,
        modal: true,
        title: 'Модальное окно',
        backgroundColor: '#0C0032',
        titleBarStyle: 'hidden',
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
          webSecurity: false,
          preload: path.join(app.getAppPath(), 'preload', 'index.js'),
        },
      },
    );

    const indexPath = `file://${path.join(app.getAppPath(), '/renderer/index.html')}?modalWin=friends`;

    this.winModal.loadURL(indexPath);

    this.winModal.once('ready-to-show', () => {
      this.winModal.show();
    });

    this.winModal.on('closed', (event) => {
      event.preventDefault();
    });
  }

  subscribeForAddFile() {

  }
}
