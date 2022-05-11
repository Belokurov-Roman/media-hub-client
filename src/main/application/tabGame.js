/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
import psList from 'ps-list';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';
import os from 'os';
import axios from 'axios';
import Storage from './storage';

const { shell } = require('electron');

export default class GameLogic {
  constructor() {
    this.window = 0;
    this.storage = new Storage();
    this.start = 0;
    this.end = 0;
  }

  setWindow(win) {
    this.window = win;
  }

  async setGame(files) {
    this.storage.rewrite('gameInfo', files);

    let filesWithInfo = files.map((el) => {
      if (!el.info) { return (this.twitchAPI(el.name)); }
      return el;
    });
    filesWithInfo = await Promise.all(filesWithInfo);

    files.forEach((el, ind) => {
      const newPath = path.join(app.getPath('userData'), `storage/${el.name}`);
      const update = {};
      if (!el.info) {
        console.log('Добавляем информацию для', el.name);
        const info = filesWithInfo[ind];
        info ? update.info = info : update.info = 'Не нашлось информации';
      }
      if (el.path !== newPath) {
        console.log('Переносим файл');
        this.moveFile(el.path, newPath);
        update.path = newPath;
      }
      console.log('Обновляем');
      this.storage.updateSeveral('gameInfo', el.name, update);
    });

    console.log('Отправляю на фронт');
    return this.storage.read('gameInfo');
  }

  async twitchAPI(name) {
    const gameUrl = 'https://api.igdb.com/v4/games/';
    const body = `fields summary, rating, screenshots.*, game_engines.*; where name = "${name.split('.')[0]}";`;

    async function api(url, txt) {
      const response = await axios.post(url, txt, {
        headers: {
          'Client-ID': 'r7h88359qgey2cc60n1dk96qfv9b13',
          Authorization: 'Bearer 6qdmzmereash08y4fb4yw6x4scthps',
        },
      })
        .catch((error) => {
          console.log(error, '<======');
        });
      return response.data[0] || '';
    }
    return api(gameUrl, body);
  }

  moveFile(oldPath, newPath) {
    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;
      console.log('Successfully moved to', newPath);
    });
  }

  getData() {
    return this.storage.read('gameInfo');
  }

  deleteGame(_path, name) {
    const desktopDir = path.join(os.homedir(), 'Desktop');
    this.moveFile(_path, `${desktopDir}/${name}`);
    this.storage.delete('gameInfo', name);
    return this.storage.read('gameInfo');
  }

  async openPath(_path, name) {
    this.start = this.getTimeStampInSeconds();
    const procsBefore = await this.getActualUniqueProcs();
    shell.openPath(_path);
    await this.spyOnLaunchedRpoc(procsBefore, name);
  }

  getTimeStampInSeconds() {
    const date = new Date();
    const houres = +date.getHours();
    const minutes = +date.getMinutes();
    const seconds = +date.getSeconds();
    return houres * 60 * 60 + minutes * 60 + seconds;
  }

  async getActualUniqueProcs() {
    const uniqueProcs = {};
    const procsBeforeLaunch = await psList();
    procsBeforeLaunch.forEach((el) => { uniqueProcs[el.name] = el; });
    console.log(procsBeforeLaunch.length, Object.keys(uniqueProcs).length);
    return uniqueProcs;
  }

  async spyOnLaunchedRpoc(procsBefore, programName) {
    setTimeout(async () => {
      const newProcs = [];
      const procAfterLauch = await psList();
      procAfterLauch.forEach((el) => (procsBefore[el.name] ? '' : newProcs.push(el)));
      console.table(newProcs);
      const { pid } = newProcs.filter((el) => el.ppid === 1)[0];

      const spyPID = setInterval(async () => {
        const tryList = await psList();
        if (!tryList.find((el) => el.pid === pid)) {
          console.log('Программа больше не работает');
          clearInterval(spyPID);
          this.updateTime(programName);
        }
        console.log('Программа еще работает');
      }, 3000);
    }, 1000);
  }

  updateTime(programName) {
    this.end = this.getTimeStampInSeconds();
    this.storage.updateOne('gameInfo', programName, 'totalTime', (this.end - this.start));
    this.window.webContents.send('updatedData', this.storage.read('gameInfo'));
  }
}
