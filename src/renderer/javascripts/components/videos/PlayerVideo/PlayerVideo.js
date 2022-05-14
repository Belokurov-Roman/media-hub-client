import React, { useEffect, useState } from 'react';
import { IoMdPause } from 'react-icons/io';
import { BiFullscreen } from 'react-icons/bi';
import { BsVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import './PlayerVideo.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ipcRenderer } from 'electron';

function PlayerVideo({ videoRef, newPath }) {
  const [playHover, setPlayHover] = useState(false);

  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
  });

  const togglePlay = () => {
    console.log(videoRef);
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    playerState.isPlaying
      ? videoRef.current.play()
      : videoRef.current.pause();
  }, [playerState.isPlaying, videoRef]);

  const handleOnTimeUpdate = () => {
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  };

  const handleVideoProgress = (event) => {
    const manualChange = Number(event);
    console.log(videoRef.current.currentTime);
    videoRef.current.currentTime = (videoRef.current.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };
  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    videoRef.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  useEffect(() => {
    playerState.isMuted
      ? (videoRef.current.muted = true)
      : (videoRef.current.muted = false);
  }, [playerState.isMuted, videoRef]);

  const fullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen();
    }
  };

  const play = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlayHover(true);
    } else {
      videoRef.current.pause();
      setPlayHover(false);
    }
  };
  const [hover, setHover] = useState('ControlVideo1');
  useEffect(() => {
    console.log(videoRef, '<=======');
  }, [hover]);

  function watchTogether() {
    console.log(newPath);
    ipcRenderer.send('watch-together', newPath, videoRef.current.duration);
  }

  return (
    <div className="videoPart">
      {videoRef
        ? (
          <div
            onMouseOver={() => setHover('ControlVideoA')}
            onMouseLeave={() => setHover('ControlVideoH')}
            className="PlayerVideo"
          >
            <video ref={videoRef} className="video-block" onTimeUpdate={handleOnTimeUpdate}>
              <track kind="subtitles" src={null} />
            </video>
            <div
              className={hover}
            >
              <Slider
                step="0.1"
                value={playerState.progress}
                onChange={(e) => handleVideoProgress(e)}
              />
              <div className="ControlButton">
                <select
                  className="velocity"
                  value={playerState.speed}
                  onChange={(e) => handleVideoSpeed(e)}
                >
                  <option value="0.50">0.50x</option>
                  <option value="1">1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="2">2x</option>
                </select>
                <button className="mute-unmute flex ctrl-style" type="button" onClick={toggleMute}>
                  {!playerState.isMuted ? (
                    <h4><BsVolumeDownFill size="1.3rem" /></h4>
                  ) : (
                    <h4><BsFillVolumeMuteFill size="1.3rem" /></h4>)}
                </button>
                <button className="stream flex ctrl-style" type="button" onClick={watchTogether}>
                  Совместный просмотр
                </button>
                <button className="play-stop flex ctrl-style" type="button" onClick={togglePlay}>
                  {!playerState.isPlaying ? (
                    <h4>▶</h4>
                  ) : (
                    <h4><IoMdPause /></h4>
                  )}
                </button>
                <button className="fullscreen flex ctrl-style" type="button" onClick={fullscreen}>
                  <h4><BiFullscreen size="1.2rem" /></h4>
                </button>
              </div>
            </div>
          </div>
        )
        : ''}
    </div>
  );
}

export default PlayerVideo;
