import React, { useEffect, useRef, useState } from 'react';
import './VideoPage.css';
import ListVideo from '../../videos/ListVideo/ListVideo';
import PlayerVideo from '../../videos/PlayerVideo/PlayerVideo';

const electron = window.require('electron');
const { ipcRenderer } = electron;

// window.getPathVideo((_, data) => {
//   console.log(data);
// });

function VideoPage() {
  const videoRef = useRef(null);
  const [newPath, setNewPath] = useState('');
  const [allPath, setAllPath] = useState([]);

  useEffect(() => {
    (async function () {
      const allPathVideo = await ipcRenderer.invoke('get-path-video');
      setAllPath(allPathVideo);
    }());
  }, [newPath]);

  const upload = async () => {
    const currentFile = await ipcRenderer.invoke('select-video');
    setNewPath(currentFile);
    videoRef.current.src = currentFile;
  };

  const getPathVideo = (path) => {
    videoRef.current.src = path;
  };

  return (
    <div className="VideoPage">
      <ListVideo setNewPath={setNewPath} getPathVideo={getPathVideo} allPath={allPath} upload={upload} />
      <PlayerVideo videoRef={videoRef} />
    </div>
  );
}

export default VideoPage;

// const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v'];
// const [videoPath, setVideoPath] = useState({});
