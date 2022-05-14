import {
  app, BrowserWindow, dialog, ipcMain,
} from 'electron';
import path from 'path';
import GameLogic from './tabGame';
import VideoLogic from './tabVideo';
import Storage from './storage';

export default class ModalWindowReg {
  startWin(win) {
    this.storage = new Storage();
    this.gameLogic = new GameLogic();
    this.videoLogic = new VideoLogic();
    this.subscribeForAddFile();
    app.whenReady().then(() => this.createModalWindow(win));
  }

  createModalWindow(win) {
    this.winModal = new BrowserWindow(
      {
        width: 500,
        height: 400,
        maxWidth: 500,
        maxHeight: 400,
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

    const indexPath = `file://${path.join(app.getAppPath(), '/renderer/index.html')}?modalWin=registr`;

    this.winModal.loadURL(indexPath);

    this.winModal.once('ready-to-show', () => {
      this.winModal.show();
    });

    this.winModal.on('closed', (event) => {
      event.preventDefault();
      ipcMain.removeHandler('call-dialog');
      ipcMain.removeHandler('save-video-file');
      ipcMain.removeHandler('video-added');
    });
  }

  subscribeForAddFile() {

  }
}
