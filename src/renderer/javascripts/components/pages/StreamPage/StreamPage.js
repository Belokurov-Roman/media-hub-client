import React, { useEffect, useRef, useState } from 'react';
import { ipcRenderer } from 'electron';

function StreamPage() {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
  });

  const streamRef = useRef();
  const [videoState, setVideoState] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      // setVideoState(true);
    }, 2000);
    setTimeout(() => {
      ipcRenderer.invoke('get-path-video')
        .then((res) => {
          streamRef.current.src = res[0].path;
        })
        .then(() => {
          const progress = (streamRef.current.currentTime / streamRef.current.duration) * 100 + 23;
          setPlayerState({
            ...playerState,
            progress,
          });
        })
        .then(() => {
          streamRef.current.play();
          streamRef.current.currentTime = 5000;
        });
    }, 5000);
  }, []);
  return (

    <div style={{ color: 'red' }}>
      {videoState ? (
        <video style={{ width: '400px', height: '400px' }} ref={streamRef}>
          <track kind="subtitles" src={null} />
        </video>
      ) : <div>СТРИМА НЕТ</div>}
    </div>
  );
}

export default StreamPage;
