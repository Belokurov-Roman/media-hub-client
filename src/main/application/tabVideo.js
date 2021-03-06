import { dialog } from 'electron';
import path from 'path';
import * as http from 'http';
import fs from 'fs';

import axios from 'axios';
import Storage from './storage';

export default class VideoLogic {
  constructor() {
    this.storage = new Storage();
    this.id = this.getLastId();
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
    console.log(this.files.filePaths[0]);
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
      console.log('HERE');
      this.countId();
      this.storage.set('pathVideo', this.createFileVideo(file));
      return true;
    }
    return false;
  }

  findPath(key) {
    return this.storage.get(key)
      .findIndex((el) => Object.values(el).find((name) => name === this.nameVideo));
  }

  ctxMenuDelete(win, id) {
    // const deleteOneVideo = () => {
    //   console.log(id);
    //   this.storage.rewrite('pathVideo', this.storage.get('pathVideo')
    //     .filter((el) => el.id !== +id));
    //   win.webContents.send('delete-path-video', Math.random());
    // };

    // const conMenu = new Menu();
    // conMenu.append(new MenuItem({
    //   label: 'Удалить',
    //   click() {
    //     deleteOneVideo();
    //   },
    // }));

    // win.webContents.on('context-menu', (e, params) => {
    //   conMenu.popup(win, params.x, params.y);
    // });
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

  async watchTogether(data, time) {
    // this.videoSize = fs.statSync(data).size;
    const stream = fs.createWriteStream(data);
    // console.log(stream);

    const response = await axios.post('http://localhost:3001/stream', {
      stream,
    });

    // console.log(this.videoSize);
    // console.log(this.videoSize);
    // const CHUNK_SIZE = 10 ** 6;
    // const start = Number(range.replace(/\D/g, ''));
    // const end = Math.min(start + CHUNK_SIZE, this.videoSize - 1);
  }
}

// .find((name) => name === this.files.filePaths[0] && name === this.nameVideo)
