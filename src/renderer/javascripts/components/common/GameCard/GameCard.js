import React, { useContext } from 'react';
import { Context } from '../../../context/GameContext';

function GameCard({ el }) {
  const { handleStart, handleDelete } = useContext(Context);
  const { name, path, totalTime } = el;
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
    </div>
  );
}
export default GameCard;
