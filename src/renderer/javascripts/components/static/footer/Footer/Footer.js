import React from 'react';

import './Footer.css';

function Footer({ createWindowAdd }) {
  return (
    <div className="footer">
      <div className="footerContent">
        <button onClick={createWindowAdd} className="buttonAdd TextLinks" type="button">Добавить</button>
        <div className="FriendAndChat">
          <div className="icon-user" />
          <p className="friends-and-chat-button">Друзья и чат</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
