import { dialog } from 'electron';
import path from 'path';

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
    this.nameVideo = path.basename(this.files.filePaths[0]);

    this.writeVideoPathToStorage();

    return this.files.filePaths[0] ? this.files.filePaths[0] : null;
  }

  writeVideoPathToStorage() {
    if (this.findPath()) {
      this.storage.set('pathVideo', { [this.id]: { name: this.nameVideo, path: this.files.filePaths[0] } });
      this.countId();
    }
  }

  findPath() {
    return this.storage.get('pathVideo')
      .findIndex((el) => Object.values(el).find((name) => name.path === this.files.filePaths[0]));
  }

  countId() {
    this.id += 1;
  }
}
