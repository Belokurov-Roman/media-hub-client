import React, { createContext } from 'react';

const electron = window.require('electron');
const { ipcRenderer } = electron;

export const Context = createContext();
function GameContextProvider({ children }) {
  const handleButton = (path, name) => {
    console.log(path, name);
    ipcRenderer.invoke('open-game-from-path', path, name);
  };

  return (
    <Context.Provider value={{
      handleButton,
    }}
    >
      {children}
    </Context.Provider>
  );
}

export default GameContextProvider;
