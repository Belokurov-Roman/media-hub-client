import React from 'react';
import './ListVideo.css';

function ListVideo({ upload }) {
  return (
    <div className="ListVideo">
      <div>1</div>
      <div>2</div>
      <button type="button" onClick={() => upload()}>add</button>
    </div>
  );
}

export default ListVideo;
// <button type="button" onClick={() => upload()}>add video</button>;
