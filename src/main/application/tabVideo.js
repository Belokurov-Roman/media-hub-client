import { dialog } from 'electron';
import path from 'path';
import psList from 'ps-list';
import Storage from './storage';

export default class VideoLogic {
  constructor() {
    this.id = 0;
    this.storage = new Storage();
  }

  async getPathVideo(win) {
    this.files = await dialog.showOpenDialog(win, {
      filters: [
        { name: 'Video', extensions: ['mp4', 'mkv', 'mov', 'avi'] },
        { name: 'Audio', extensions: ['mp3', 'wav', 'ogg'] },
      ],
      properties: ['openFile'],
    });
    console.log(await psList());

    // console.log(this.storage.get('pathVideo'));
    console.log(path.basename(this.files.filePaths[0]));
    this.storage.set('pathVideo', { [this.id]: this.files.filePaths[0] });
    this.countId();
    return this.files.filePaths[0] ? this.files.filePaths[0] : null;
  }

  countId() {
    this.id += 1;
  }
}
