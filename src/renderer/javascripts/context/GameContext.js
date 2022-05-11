import React, { createContext, useState } from 'react';

const electron = window.require('electron');
const { ipcRenderer } = electron;

export const Context = createContext();
function GameContextProvider({ children }) {
  const [files, setFiles] = useState([]);
  const [detail, setDetail] = useState(files[0]);

  const getFiles = () => {
    ipcRenderer.invoke('get-games-data')
      .then((res) => {
        setFiles(res);
        setDetail(res[0]);
        console.log(detail, ' <= Гружу со старта');
      });
  };

  const handleStart = (path, name) => {
    console.log(path, name);
    ipcRenderer.invoke('open-game-from-path', path, name);
  };

  const handleDelete = (path, name) => {
    setDetail(files[0]);
    ipcRenderer.invoke('delete-game', path, name)
      .then((res) => setFiles(res));
  };

  return (
    <Context.Provider value={{
      handleStart,
      handleDelete,
      files,
      setFiles,
      getFiles,
      detail,
      setDetail,
    }}
    >
      {children}
    </Context.Provider>
  );
}

export default GameContextProvider;
