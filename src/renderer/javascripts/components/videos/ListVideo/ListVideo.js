import React from 'react';

function ListVideo({ upload }) {
  return (
    <div>
      <button type="button" onClick={() => upload()}>add video</button>
    </div>
  );
}
export default ListVideo;
