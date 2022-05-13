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
      onClick={() => { setDetail(el); }}
    >
      <div style={{ padding: '0px 2px 0px 2px' }}>{name}</div>
    </div>
  );
}
export default GameCard;
