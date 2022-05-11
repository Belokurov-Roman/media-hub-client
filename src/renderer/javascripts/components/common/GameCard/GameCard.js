import React, { useContext } from 'react';
import './GameCard.css';
import { Context } from '../../../context/GameContext';

function GameCard({ el }) {
  const { setDetail, detail } = useContext(Context);
  const { name } = el;

  return (
    <div
      className="game"
      onClick={() => {
        setDetail(el);
        console.log(detail);
      }}
    >
      {name}
      {/* <button
        className="play"
        onClick={() => handleStart(path, name)}
        type="button"
      >
        Play
      </button>
      <button
        className="delete"
        onClick={() => handleDelete(path, name)}
        type="button"
      >
        Delete
      </button>
      <h1>
        totalTime:
        {' '}
        {totalTime}
      </h1>
      { info && (typeof info) === 'object'
        ? (
          <div>
            <h5>{info.summary}</h5>
            <h5>{`Rating:${Math.round(+info.rating) / 10}/10`}</h5>
            {info.screenshots.map((id) => <img src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${id.image_id}.jpg`} alt={id} />)}
          </div>
        )
        : <h5>{info}</h5>} */}
    </div>
  );
}
export default GameCard;
