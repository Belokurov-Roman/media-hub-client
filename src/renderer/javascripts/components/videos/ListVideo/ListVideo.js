import React from 'react';
import './ListVideo.css';
import { ipcRenderer } from 'electron';

function ListVideo({
  setNewPath, allPath, upload, getPathVideo,
}) {
  const handleClick = (e) => {
    if (e.type === 'contextmenu') {
      ipcRenderer.send('context-menu-delete', e.target.id);
      ipcRenderer.on('delete-path-video', (_, data) => {
        setNewPath(data);
      });
    }
  };
  return (
    <div className="ListVideo">
      <div className="ContainerList">
        <div className="ControlListGroup">
          <input className="inputSearch" />
          <button onClick={upload} type="submit">+</button>
        </div>
        <div className="NameList">
          {allPath && allPath.map((el) => (
            <div
              onContextMenu={handleClick}
              onClick={() => getPathVideo(el.path)}
              key={el.id}
              id={el.id}
              className="OneList"
            >
              {el.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListVideo;

// {allPath && allPath.map((el) => <div className="OneList">{el}</div>)}

// <button type="button" onClick={() => upload()}>add video</button>;
