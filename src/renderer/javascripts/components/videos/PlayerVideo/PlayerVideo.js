import React from 'react';
import './PlayerVideo.css';

function PlayerVideo({ videoRef }) {
  return (
    <div className="PlayerVideo">
      <video ref={videoRef} className="video-block">
        <track kind="subtitles" src={null} />
      </video>

    </div>
  );
}
export default PlayerVideo;
