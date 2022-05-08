import React, { useContext } from 'react';
// import { IgnorePlugin } from 'webpack';
import { Context } from '../../../context/GameContext';

function GameCard({ el }) {
  const { handleButton } = useContext(Context);
  const { name, path, totalTime } = el;
  return (
    <div
      onClick={() => handleButton(el.path, el.name)}
      style={{ margin: '5px', backgroundColor: 'grey', display: 'inline-block' }}
    >
      <h4>{name}</h4>
      <button type="button">{path}</button>
      <h1>
        totalTime:
        {' '}
        {totalTime}
      </h1>
      {/* <img src={el.icon} alt="icon" /> */}
    </div>
  );
}
export default GameCard;
