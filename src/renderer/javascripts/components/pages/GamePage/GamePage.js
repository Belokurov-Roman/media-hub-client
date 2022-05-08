import React, { useState, useEffect } from 'react';
import GameCard from '../../common/GameCard/GameCard';
import './GamePage.css';
import GameContextProvider from '../../../context/GameContext';

// const icon = await app.getFileIcon(iconPath, { size: 'large' })
// const fileIcon = require('extract-file-icon');
// Говорят нельзя запускать Си в браузере

const electron = window.require('electron');
const { ipcRenderer } = electron;

function GamePage() {
  const [drag, setDrag] = useState(false);
  const [onZone, setOnZone] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    ipcRenderer.invoke('get-games-data')
      .then((res) => setFiles(res));
  }, []);

  function startDragHandler() {
    setDrag(true);
  }

  function onDropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setOnZone(true);
  }

  function offDropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setOnZone(false);
    setDrag(false);
  }

  async function DropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    const f = [...files, ...event.dataTransfer.files];
    const obj = {};
    f.forEach((el) => { obj[el.name] = el; });
    setFiles([...Object.values(obj)]);

    const filesToSend = [...Object.values(obj)].map((el) => ({ name: el.name, path: el.path }));
    ipcRenderer.send('set-game-data', filesToSend);
  }

  return (
    <GameContextProvider>
      <div onDragEnter={(e) => startDragHandler(e)}>
        <h2>Hello, world!</h2>
        {drag
          ? (
            <div
              onDragLeave={(e) => offDropHandler(e)}
              onDragOver={(e) => onDropHandler(e)}
              onDrop={(e) => {
                DropHandler(e);
                offDropHandler(e);
              }}
              className={`dropZone ${onZone ? 'onDropZone' : 'offDropZone'}`}
            >
              Перетащи сюда файл
            </div>
          )
          : ''}
        { files ? files.map((el) => (
          <GameCard
            key={el.name}
            el={el}
          />
        )) : ''}
      </div>
    </GameContextProvider>

  );
}
export default GamePage;
