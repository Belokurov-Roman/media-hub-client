import React, { useContext } from 'react';
import { Context } from '../../../context/GameContext';

function GameCard({ el }) {
  const { handleStart, handleDelete } = useContext(Context);
  const {
    name, path, totalTime, info,
  } = el;

  return (
    <div style={{ margin: '5px', backgroundColor: 'grey', display: 'inline-block' }}>
      <h4>{name}</h4>
      <button
        onClick={() => handleStart(path, name)}
        type="button"
      >
        Play
      </button>
      <button
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
          </div>
        )
        : <h5>{info}</h5>}
    </div>
  );
}
export default GameCard;
