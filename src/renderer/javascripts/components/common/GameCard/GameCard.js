import React, { useContext } from 'react';
import './GameCard.css';
import { Context } from '../../../context/GameContext';

function GameCard({ el }) {
  const { setDetail, detail } = useContext(Context);
  const { name } = el;

  console.log(detail?.name, name, '<=--------=<<<');

  return (
    <div
      className={detail?.name === name ? 'game g-selected' : 'game'}
      onClick={() => {
        setDetail(el);
      }}
    >
      {name}
      <div className={detail?.name === name ? 'b-selected' : 'border'} />
    </div>
  );
}
export default GameCard;
