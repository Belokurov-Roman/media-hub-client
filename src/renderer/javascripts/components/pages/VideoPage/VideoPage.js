import React, { useEffect, useRef, useState } from 'react';
import './VideoPage.css';
import { ipcRenderer } from 'electron';
import ListVideo from '../../videos/ListVideo/ListVideo';
import PlayerVideo from '../../videos/PlayerVideo/PlayerVideo';

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
    console.log(currentFile);
    setNewPath(currentFile);
    videoRef.current.src = currentFile;
  };

  const getPathVideo = (path) => {
    videoRef.current.src = path;
  };

  return (
    <div className="VideoPage">
      <ListVideo setNewPath={setNewPath} getPathVideo={getPathVideo} allPath={allPath} upload={upload} />
      <PlayerVideo newPath={newPath} videoRef={videoRef} />
    </div>
  );
}

export default VideoPage;

// const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v'];
// const [videoPath, setVideoPath] = useState({});
