import { app, BrowserWindow } from 'electron';
import path from 'path';

export default class ModalWindowAdd {
  constructor() {

  }

  createModalWindow(win) {
    this.winModal = new BrowserWindow(
      {
        width: 400,
        height: 200,
        parent: win,
        modal: true,
        title: 'Модальное окно',
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
          webSecurity: false,
          preload: path.join(app.getAppPath(), 'preload', 'index.js'),
        },
      },
    );
    this.winModal.loadFile('renderer/index.html');
  }
}
