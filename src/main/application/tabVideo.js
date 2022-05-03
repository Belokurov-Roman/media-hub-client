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

    // console.log('path-vidio', this.storage.get('pathVideo'));
    // console.log(path.basename(this.files.filePaths[0]));
    this.writeVideoPathToStorage();

    return this.files.filePaths[0] ? this.files.filePaths[0] : null;
  }

  writeVideoPathToStorage() {
    if (!Object.values(this.storage.get('pathVideo')).includes(this.files.filePaths[0])) {
      this.storage.set('pathVideo', { [this.id]: this.files.filePaths[0] });
      this.countId();
    }
  }

  countId() {
    this.id += 1;
  }
}
