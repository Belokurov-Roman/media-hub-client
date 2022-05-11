import React from 'react';

import './Footer.css';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';

function Footer({ createWindowAdd }) {
  function createWindowFriends() {
    ipcRenderer.send('create-win-friend');
  }
  return (
    <div className="footer">
      <div className="footerContent">
        <button onClick={createWindowAdd} className="buttonAdd TextLinks" type="button">Добавить</button>
        <div className="FriendAndChat">
          <div className="icon-user" />
          {/* <p className="friends-and-chat-button">Друзья и чат</p> */}
          <Link onClick={createWindowFriends} className="friends-and-chat-button link" to="/friends">Друзья и чат</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
