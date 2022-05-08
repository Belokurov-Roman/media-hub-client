import React, { useState } from 'react';
import './PlayerVideo.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function PlayerVideo({ videoRef }) {
  const [playHover, setPlayHover] = useState(false);

  const play = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlayHover(true);
    } else {
      videoRef.current.pause();
      setPlayHover(false);
    }
  };
  return (
    <div className="PlayerVideo">
      <video ref={videoRef} className="video-block">
        <track kind="subtitles" src={null} />
      </video>
      <div className="ControlVideo">
        <div className="ControlButton">
          <button onClick={play} type="button">{playHover ? 'Пауза' : 'Плей'}</button>
        </div>
        <div className="progress-container">
          <Slider />
        </div>
      </div>

    </div>
  );
}
export default PlayerVideo;
