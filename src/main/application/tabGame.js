import psList from 'ps-list';
import Storage from './storage';

const { shell } = require('electron');

export default class GameLogic {
  constructor() {
    this.storage = new Storage();
    this.start = 0;
    this.end = 0;
  }

  setGame(game) {
    this.storage.rewrite('gameInfo', game);
  }

  getData() {
    // console.log('This is ==========>', app.getFileIcon());
    return this.storage.read('gameInfo');
  }

  async openPath(path, name) {
    this.start = this.getTimeStampInSeconds();
    const procsBefore = await this.getActualUniqueProcs();
    // console.log(fileIcon('path', 32));
    shell.openPath(path);
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

      const spiPID = setInterval(async () => {
        const tryList = await psList();
        if (!tryList.find((el) => el.pid === pid)) {
          console.log('Программа больше не работает');
          this.updateTime(programName);
          clearInterval(spiPID);
        } else {
          console.log('Программа еще работает');
        }
      }, 3000);
    }, 1000);
  }

  updateTime(programName) {
    this.end = this.getTimeStampInSeconds();
    this.storage.updateOne('gameInfo', programName, 'totalTime', (this.end - this.start));
    return this.start - this.end;
  }
}
