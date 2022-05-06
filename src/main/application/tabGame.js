import psList from 'ps-list';
import Storage from './storage';

const { shell } = require('electron');

export default class GameLogic {
  constructor() {
    this.storage = new Storage();
    this.start = 0;
    this.end = 0;
  }

  async openPath(path) {
    this.start = this.getTimeStampInSeconds();
    const procsBefore = await this.getActualUniqueProcs();
    shell.openPath(path);
    await this.spyOnLaunchedRpoc(procsBefore);
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

  async spyOnLaunchedRpoc(procsBefore) {
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
          this.showTime();
          clearInterval(spiPID);
        } else {
          console.log('Программа еще работает');
        }
      }, 3000);
    }, 1000);
  }

  showTime() {
    this.end = this.getTimeStampInSeconds();
    console.log('Proga rabotala: ', (this.end - this.start), ' sec');
    return this.start - this.end;
  }

  setGame(game) {
    this.storage.rewrite('gameInfo', game);
  }

  getData() {
    return this.storage.read('gameInfo');
  }
}
