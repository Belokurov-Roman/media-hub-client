import {
  app, BrowserWindow, dialog, ipcMain,
} from 'electron';
import path from 'path';
import GameLogic from './tabGame';
import VideoLogic from './tabVideo';
import Storage from './storage';

export default class ModalWindowAdd {
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
        width: 500,
        height: 500,
        maxWidth: 500,
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

    const indexPath = `file://${path.join(app.getAppPath(), '/renderer/index.html')}?modalWin=addVideo`;

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
    ipcMain.handle('call-dialog', async () => {
      this.files = await dialog.showOpenDialog(this.winModal, {
        filters: [
          { name: 'Video', extensions: ['mp4', 'mkv', 'mov', 'avi'] },
          { name: 'Audio', extensions: ['mp3', 'wav', 'ogg'] },
          { extensions: ['app'] },
        ],
        properties: ['openFile'],
      });

      this.extensionVideo = path.extname(this.files.filePaths[0]);

      if (this.extensionVideo === '.app') {
        return this.gameLogic.setGame(this.files.filePaths);
      }
      return this.videoLogic.createFileVideo(this.files.filePaths[0]);
    });

    ipcMain.handle('save-video-file', (_, file) => this.videoLogic.writeVideoPathToStorage(file));

    ipcMain.on('video-added', (e) => {
      e.preventDefault();
      this.winModal.hide();
    });
  }
}
