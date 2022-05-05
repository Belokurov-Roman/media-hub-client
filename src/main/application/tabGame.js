import psList from 'ps-list';
import Storage from './storage';

const { dialog, shell } = require('electron');

export default class GameLogic {
  constructor() {
    this.storage = new Storage();
  }

  async openPath (path) {

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

  // async openPathFromDialog (win) {
  //   const result = await dialog.showOpenDialog(win);
  //   console.log(result);
  //   shell.openPath(result.filePaths[0]);
  //   return result.filePaths[0];
  // }

  setGame (game) {
    console.log('Helo!', game);
    game.forEach((el) => {
      this.storage.set('gameInfo', { [el.name] : { name: this.nameVideo, path: this.files.filePaths[0] } })
    })
  }
}
