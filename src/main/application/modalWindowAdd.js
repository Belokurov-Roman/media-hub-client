import { app, BrowserWindow } from 'electron';
import path from 'path';

export default class ModalWindowAdd {
  startWin(win) {
    app.whenReady().then(() => this.createModalWindow(win));
  }

  createModalWindow(win) {
    this.winModal = new BrowserWindow(
      {
        width: 400,
        height: 200,
        modal: true,
        title: 'Модальное окно',
        backgroundColor: '#000000',

        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
          webSecurity: false,
          preload: path.join(app.getAppPath(), 'preload', 'index.js'),
        },
      },
    );
    // file:///Users/danakusev/Desktop/media-hub-test-version/media_hub/builds/development/file:/true

    this.winModal.loadURL('file:///Users/danakusev/Desktop/media-hub-test-version/media_hub/builds/development/renderer/index.html?modalWin=true');

    this.winModal.on('closed', () => {
      this.winModal.webContents.send('createModal', false);

      this.winModal = null;
    });
  }
}
