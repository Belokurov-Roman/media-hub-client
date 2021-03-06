/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
// import fileIcon from 'extract-file-icon';
import { BsFillGearFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { BiTimer, BiTimeFive } from 'react-icons/bi';
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
            ???????????????????? ???????? ????????
          </div>
        )
        : (
          <div className="GamePage">
            <div className="list">
              {files?.length
                ? files.map((el) => <GameCard key={el.name} el={el} />)
                : <GameCard el={{ name: '???????????????????? ???????? ?? ???????? ??????????????????' }} />}
            </div>
            <div className="info">
              <h1>{detail?.name?.split('.')[0]}</h1>
              <button
                className="play"
                onClick={() => handleStart(detail?.path, detail?.name)}
                type="button"
              >
                ???
              </button>
              <button
                className="delete"
                onClick={() => handleDelete(detail?.path, detail?.name)}
                type="button"
              >
                ???
              </button>
              { typeof detail?.info === 'object' ? (
                <div className="points">
                  <h5>{detail.info.summary}</h5>
                  <div style={{ height: '30px' }}>
                    <h4 className="info-point">
                      <BsFillGearFill size="0.9rem" style={{ marginRight: '5px' }} />
                      {detail.info?.game_engines
                        ? detail.info.game_engines?.length > 1
                          ? '?????????????? ????????????: ' : '?????????????? ????????????: ' : ''}
                      {detail.info.game_engines?.map((engine) => `${engine.name} `) }
                    </h4>
                  </div>
                  <div style={{ height: '30px' }}>
                    <h4 className="info-point">
                      <AiFillStar style={{ marginRight: '5px' }} />
                      { detail.info?.rating ? `??????????????: ${Math.round(+detail.info.rating) / 10}/10` : ''}
                    </h4>
                  </div>
                  <div style={{ height: '30px' }}>
                    <h4 className="info-point">
                      <BiTimeFive style={{ marginRight: '5px' }} />
                      {`?????????? ?????????????? ?? ????????: ${detail.totalTime || 0} ????????????`}
                    </h4>
                  </div>
                  <div style={{ height: '30px' }}>
                    <h4 className="info-point">
                      <BiTimer size="1.1rem" style={{ marginRight: '5px' }} />
                      {`???? ?????????????????? ????????????: ${detail.lastSession || 0} ????????????`}
                    </h4>
                  </div>
                  <div className="screenshots">
                    {detail.info.screenshots?.map((id) => (
                      <img
                        className="screen"
                        src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${id.image_id}.jpg`}
                        alt={id}
                      />
                    ))}
                  </div>
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
