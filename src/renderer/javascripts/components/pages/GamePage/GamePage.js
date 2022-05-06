import React, { useState, useEffect } from 'react';
import './GamePage.css';

const electron = window.require('electron');
const { ipcRenderer } = electron;

function GamePage() {
  const [drag, setDrag] = useState(false);
  const [onZone, setOnZone] = useState(false);
  const [files, setFiles] = useState([]);
  const [time, setTime] = useState('');

  useEffect(() => {
    ipcRenderer.invoke('get-games-data')
      .then((res) => setFiles(res));
  }, []);

  function handleButton(path) {
    setTime(`${new Date()}`);
    ipcRenderer.invoke('open-game-from-path', path);
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

  return (
    <div onDragEnter={(e) => startDragHandler(e)}>
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
      {files.map((el) => <button key={el.name} type="button" onClick={() => handleButton(el.path)}>{el.name}</button>)}
      <button type="button" onClick={() => process()}>processes</button>
      <div>{`${time}`}</div>
    </div>
  );
}
export default GamePage;
