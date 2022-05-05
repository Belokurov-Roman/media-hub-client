import React from 'react';
import { useState } from 'react';
import psList from 'ps-list';

// import { useSelector, useDispatch } from 'react-redux';
// import getProcesses from '../../../redux/thunk/yourThunk';
import './GamePage.css';

const electron = window.require('electron');
const { ipcRenderer } = electron;

function GamePage() {

  const [path, setPath] = useState('net putya');
  const [drag, setDrag] = useState(false);
  const [onZone, setOnZone] = useState(false);
  const [files, setFiles] = useState([]);
  const [time, setTime] = useState('');
  // const { processes } = useSelector((state) => state);

  async function process() {
    console.log(await psList());
  }

  function handleButton1() {
    ipcRenderer.invoke('open-game-from-dialog')
      .then((res) => setPath(res));
  }
  function handleButton2(path) {
    setTime(`${new Date()}`);
    ipcRenderer.invoke('open-game-from-path', path);
  }
  function DropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    const f = [...files, ...event.dataTransfer.files];
    const obj = {};
    f.forEach((el) => { obj[el.name] = el; });
    setFiles([...Object.values(obj)]);
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
      <button type="button" onClick={handleButton1}>Run file</button>
      <p>{path}</p>
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
      {files.map((el) => <button type="button" onClick={() => handleButton2(el.path)}>{el.name}</button>)}
      <button type="button" onClick={() => process()}>processes</button>
      <div>{`${time}`}</div>
    </div>
  );
}
export default GamePage;
