/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
// import fileIcon from 'extract-file-icon';
import GameCard from '../../common/GameCard/GameCard';
import './GamePage.css';
import { Context } from '../../../context/GameContext';

// const icon = await app.getFileIcon(iconPath, { size: 'large' })

const electron = window.require('electron');
const { ipcRenderer } = electron;

function GamePage() {
  const {
    files, setFiles, getFiles, detail, handleStart, handleDelete, setDetail,
  } = useContext(Context);
  const [drag, setDrag] = useState(false);
  const [onZone, setOnZone] = useState(false);

  ipcRenderer.on('updatedData', (e, data) => {
    setFiles(data);
    const ind = files.findIndex((el) => el.name === detail.name);
    console.log(files[ind]);
    setDetail(data[ind]);
    console.log(files, data, '<-----+');
  });

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
      {
        name: el.name, path: el.path, totalTime: el.totalTime, info: el.info,
      }));
    setFiles(filesToSend);

    console.log(filesToSend, '<---------');
    ipcRenderer.invoke('set-game-data', filesToSend)
      .then((res) => {
        console.log(res);
        setFiles(res);
      });
  }

  return (
    <div
      onDragEnter={(e) => startDragHandler(e)}
    >
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
        : (
          <div className="GamePage">
            <div className="list">
              {files?.length
                ? files.map((el) => <GameCard key={el.name} el={el} />)
                : <GameCard el={{ name: 'Перетащите игру в окно программы' }} />}
            </div>
            <div className="info">
              <h1>{detail?.name?.split('.')[0]}</h1>
              <button
                className="play"
                onClick={() => handleStart(detail?.path, detail?.name)}
                type="button"
              >
                Play
              </button>
              <button
                className="delete"
                onClick={() => handleDelete(detail?.path, detail?.name)}
                type="button"
              >
                Delete
              </button>
              { typeof detail?.info === 'object' ? (
                <div>
                  <h5>{detail.info.summary}</h5>
                  {detail.info.game_engines?.length > 1
                    ? <h5>Игровые движки:</h5> : <h5>Игровой движок:</h5>}
                  {detail.info.game_engines?.map((engine) => <h4>{engine.name}</h4>) }
                  <h5>{`Рейтинг: ${Math.round(+detail.info.rating) / 10}/10`}</h5>
                  <h4>{`Всего времени в игре: ${detail.totalTime || 0} секунд`}</h4>
                  {detail.info.screenshots?.map((id) => <img src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${id.image_id}.jpg`} alt={id} />)}
                </div>
              )
                : ''}
            </div>
          </div>
        )}
    </div>

  );
}
export default GamePage;
