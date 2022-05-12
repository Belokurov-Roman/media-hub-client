import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { BsChatTextFill } from 'react-icons/bs';
import { Context } from '../../../../context/GameContext';
import './Footer.css';

function Footer({ createWindowAdd }) {
  const { active } = useContext(Context);

  return (
    <div className="footer">
      <div className="footerContent">
        { active === 'ВИДЕО'
          ? (
            <button onClick={createWindowAdd} className="buttonAdd TextLinks" type="button">
              <h4>
                <AiOutlineVideoCameraAdd style={{ marginRight: '5px' }} />
              </h4>
              {' '}
              Добавить
            </button>
          )
          : ''}
        <Link className="friends-and-chat-button" to="/friends">
          Друзья и чат
          <h4>
            <BsChatTextFill style={{ marginLeft: '7px' }} />
          </h4>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
