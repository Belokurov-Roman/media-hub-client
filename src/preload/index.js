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
  ipcRenderer.on('dataApp', callback);
};

window.modalWindow = (callback) => {
  ipcRenderer.on('createModal', callback);
};

// window.deleteOneVideo = (callback) => {
//   ipcRenderer.on('delete-path-video', callback);
// };
