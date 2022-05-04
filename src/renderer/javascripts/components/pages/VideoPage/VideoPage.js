import React, { useEffect, useRef, useState } from 'react';

// import { ipcRenderer } from 'electron';
// import BaseReactPlayer from 'react-player/base';
import ListVideo from '../../videos/ListVideo/ListVideo';

const electron = window.require('electron');
const { ipcRenderer } = electron;
const initialState = {
  forwardSrc: null,
  reverseSrc: null,
  subtitleSrc: null,
  reverse: false,
  speed: 1,
  preservesPitch: true,
  progress: 0,
  duration: 0,
  prevVolume: 1,
  volume: 1,
  paused: false,
  subtitles: false,
  loop: false,
  abloop: false,
  loopStart: 0,
  loopEnd: 100,
  savedLoop: [0, 100],
  dragging: false,
  dragProgress: 0,
  audio: false,
};

window.getPathVideo((_, data) => {
  console.log('123', data);
});

function VideoPage() {
  const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v'];
  const [state, setState] = useState(initialState);
  const [playHover, setPlayHover] = useState(false);
  const [videoPath, setVideoPath] = useState({});

  useEffect(() => {
    console.log('USEEFECT');
    window.getPathVideo((_, data) => {
      console.log(data);
    });
    // ipcRenderer.on('dataApp', (_, data) => {
    //   console.log('123', data);
    //   console.log('=====>>>>>>');
    // setVideoPath(data);
    // });
  });

  const videoRef = useRef(null);
  const upload = async () => {
    const currentFile = await ipcRenderer.invoke('select-video');
    videoRef.current.src = currentFile;
  };

  const play = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlayHover(true);
    } else {
      videoRef.current.pause();
      setState(false);
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <ListVideo upload={upload} />
      <video id="videoPlayer" className="video" ref={videoRef} style={{ display: 'flex', width: '500px', height: '400px' }}>
        <track kind="subtitles" src={state.subtitleSrc} />
      </video>
      <button type="button" onClick={() => play()}>{playHover ? 'Плей' : 'Пауза'}</button>
    </div>
  );
}

export default VideoPage;
