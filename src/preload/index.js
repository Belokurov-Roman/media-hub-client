import { ipcRenderer } from 'electron';
//
// window.subscribeForEntries = (callback) => {
//   ipcRenderer.on('dataApp', callback);
// };
//
// window.selectFileVideo = async () => {
//   const pathFile = await ipcRenderer.invoke('select-file');
//   return pathFile;
// };

window.getPathVideo = (callback) => {
  console.log('preload');
  ipcRenderer.on('dataApp', callback);
};
