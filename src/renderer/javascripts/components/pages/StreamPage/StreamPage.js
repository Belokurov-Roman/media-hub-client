import './blockStream.css';
import React, { useEffect, useRef, useState } from 'react';
import { ipcRenderer } from 'electron';
import { BsFillVolumeMuteFill, BsVolumeDownFill } from 'react-icons/bs';
import { BiFullscreen } from 'react-icons/bi';

function StreamPage() {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
  });
  const [hover, setHover] = useState('ControlVideo1');
  const [videoState, setVideoState] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [path, setPath] = useState('');

  const streamRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      setSpinner(true);
    }, 8000);
    // setTimeout(() => {
    //   setVideoState(true);
    // }, 5000);
    setTimeout(() => {
      setVideoState(true);

      ipcRenderer.invoke('get-path-video')
        .then((res) => {
          streamRef.current.src = res[0].path;
          setPath(res[0].path);
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
          // streamRef.current.currentTime = 7000;
        });
    }, 12000);
    // setTimeout(() => {
    //   setVideoState(false);
    //   setSpinner(true);
    // }, 30000);

    // setTimeout(() => {
    //   setVideoState(true);
    //   setSpinner(false);
    //   ipcRenderer.invoke('get-path-video')
    //     .then((res) => {
    //       streamRef.current.src = res[0].path;
    //       setPath(res[0].path);
    //     })
    //     .then(() => {
    //       streamRef.current.currentTime = (streamRef.current.duration / 100) + 10000;
    //     });
    // }, 40000);

    // setTimeout(() => {
    //   streamRef.current.play();
    // }, 50000);

    setTimeout(() => {
      setVideoState(false);
      setSpinner(false);
    }, 26000);

    // setTimeout(() => {
    //   streamRef.current.currentTime = 80000;
    // }, 15000);
  }, []);

  useEffect(() => {
    try {
      playerState.isMuted
        ? (streamRef.current.muted = true)
        : (streamRef.current.muted = false);
    } catch (e) {
      console.log(e);
    }
  }, [playerState.isMuted, streamRef]);

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };
  const fullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      streamRef.current.requestFullscreen();
    }
  };

  return (
    <div className="streamPart">
      {videoState
        ? (
          <div
            onMouseOver={() => setHover('ControlVideoA')}
            onMouseLeave={() => setHover('ControlVideoH')}
            className="PlayerVideo"
          >
            <video className="video-block" ref={streamRef}>
              <track kind="subtitles" src={null} />
            </video>
            <div
              className={hover}
            >
              <div className="ControlButton">
                <button className="mute-unmute flex ctrl-style" type="button" onClick={toggleMute}>
                  {!playerState.isMuted ? (
                    <h4><BsVolumeDownFill size="1.3rem" /></h4>
                  ) : (
                    <h4><BsFillVolumeMuteFill size="1.3rem" /></h4>)}
                </button>
                <button className="fullscreen flex ctrl-style" type="button" onClick={fullscreen}>
                  <h4><BiFullscreen size="1.2rem" /></h4>
                </button>
              </div>
            </div>
          </div>
        )
        : (spinner
          ? <div className="lds-dual-ring" />
          : <div className="blockStream">СТРИМА НЕТ</div>)}
    </div>

  );
}
// spinner
export default StreamPage;
