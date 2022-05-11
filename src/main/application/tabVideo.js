import { dialog } from 'electron';
import path from 'path';
import * as http from 'http';
import fs from 'fs';

import Storage from './storage';

export default class VideoLogic {
  constructor() {
    this.storage = new Storage();
    this.id = (+Object.keys(this.storage.get('pathVideo')).slice(-1) + 1);
  }

  async getPathVideo(win) {
    this.files = await dialog.showOpenDialog(win, {
      filters: [
        { name: 'Video', extensions: ['mp4', 'mkv', 'mov', 'avi'] },
        { name: 'Audio', extensions: ['mp3', 'wav', 'ogg'] },
      ],
      properties: ['openFile'],
    });
    // this.extensionVideo = path.getExtension(this.files.filePaths[0]);
    this.writeVideoPathToStorage(this.files.filePaths[0]);
    this.nameVideo = path.basename(this.files.filePaths[0]);

    return this.files.filePaths[0] ? this.files.filePaths[0] : null;
  }

  createFileVideo(file) {
    this.nameVideo = path.basename(file);
    this.addToStore = { id: this.id, name: this.nameVideo, path: file };
    return this.addToStore;
  }

  writeVideoPathToStorage(file) {
    if (this.findPath('pathVideo') === -1) {
      this.countId();
      this.storage.set('pathVideo', file);
      return true;
    }
    return false;
  }

  findPath(key) {
    return this.storage.get(key)
      .findIndex((el) => Object.values(el).find((name) => name === this.nameVideo));
  }

  ctxMenuDelete(win, id) {
    const deleteOneVideo = () => {
      console.log(id);
      this.storage.rewrite('pathVideo', this.storage.get('pathVideo')
        .filter((el) => el.id !== +id));
      win.webContents.send('delete-path-video', Math.random());
    };

    const conMenu = new Menu();
    conMenu.append(new MenuItem({
      label: 'Удалить',
      click() {
        deleteOneVideo();
      },
    }));

    win.webContents.on('context-menu', (e, params) => {
      conMenu.popup(win, params.x, params.y);
    });
  }

  getLastId() {
    if (this.storage.get('pathVideo').length === 0) {
      return 1;
    }
    return (Object.values(...this.storage.get('pathVideo').slice(-1))[0] + 1);
  }

  countId() {
    this.id += 1;
  }
}

// .find((name) => name === this.files.filePaths[0] && name === this.nameVideo)
