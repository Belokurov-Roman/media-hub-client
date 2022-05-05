import psList from 'ps-list';

const { dialog, shell } = require('electron');

import Storage from './storage';

export default class GameLogic {
  constructor() {
    this.storage = new Storage();
  }

  async openPath (path) {

    // async function difference() {
    //   const obj = {};
    //   const list = await psList();
    //   list.forEach((el) => { obj[el.name] = el; });
    //   console.log(list.length, Object.keys(obj).length);
    //   setInterval(async () => {
    //     const newProcs = [];
    //     const listPosle = await psList();
    //     listPosle.forEach((el) => (obj[el.name] ? obj[el.name] = el : newProcs.push(el)));
    //     console.table(newProcs);
    //   }, 1000);
    // }
    // await difference();

    const uniqueProcs = {};

    const procsBeforeLaunch = await psList();
    procsBeforeLaunch.forEach((el) => { uniqueProcs[el.name] = el; });
    console.log(procsBeforeLaunch.length, Object.keys(uniqueProcs).length);

    shell.openPath(path);

    setTimeout(async () => {
      const newProcs = [];
      const procAfterLauch = await psList();
      procAfterLauch.forEach((el) => (uniqueProcs[el.name] ? uniqueProcs[el.name] = el : newProcs.push(el)));
      console.table(newProcs);
  
      const pid = newProcs.filter((el) => el.ppid === 1)[0].pid;
      console.log(pid);
      const searchNewProcs = setInterval(async () => {
        const tryList = await psList()
        if (!tryList.find((el) => el.pid === pid)) {
          console.log('Программа больше не работает');
          clearInterval(searchNewProcs)
        } else {
          console.log('Программа еще работает');
        }
      }, 3000);
    }, 1000);
  }

  async openPathFromDialog (win) {
    // console.log(psList());
    const result = await dialog.showOpenDialog(win);
    console.log(result);
    shell.openPath(result.filePaths[0]);
    return result.filePaths[0];
  }
}
