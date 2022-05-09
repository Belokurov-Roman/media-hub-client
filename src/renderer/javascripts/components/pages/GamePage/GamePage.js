/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
import GameCard from '../../common/GameCard/GameCard';
import './GamePage.css';
import { Context } from '../../../context/GameContext';

// const icon = await app.getFileIcon(iconPath, { size: 'large' })
// const fileIcon = require('extract-file-icon');
// Говорят нельзя запускать Си в браузере

const electron = window.require('electron');
const { ipcRenderer } = electron;

function GamePage() {
  const { files, setFiles, getFiles } = useContext(Context);

  const [drag, setDrag] = useState(false);
  const [onZone, setOnZone] = useState(false);

  useEffect(() => {
    getFiles();
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
    const filesToSend = [...Object.values(obj)].map((el) => (
      { name: el.name, path: el.path, totalTime: el.totalTime }));
    setFiles(filesToSend);

    ipcRenderer.invoke('set-game-data', filesToSend)
      .then((res) => setFiles(res));
  }

  return (
    <div
      onDragEnter={(e) => startDragHandler(e)}
    >
      <h1
        style={{ color: 'white' }}
      >
        Ваши файлы:
      </h1>
      {drag
        ? (
          <div
            onDragOver={(e) => onDropHandler(e)}
            onDragLeave={(e) => offDropHandler(e)}
            onDrop={(e) => {
              DropHandler(e);
              offDropHandler(e);
            }}
            className={`dropZone ${onZone ? 'onDropZone' : 'offDropZone'}`}
          >
            Перетащи сюда файл
          </div>
        )
        : files ? files.map((el) => (
          <GameCard
            key={el.name}
            el={el}
          />
        ))
          : ''}
    </div>

  );
}
export default GamePage;
