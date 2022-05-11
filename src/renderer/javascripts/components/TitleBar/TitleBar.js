import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ipcRenderer } from 'electron';

function TitleBar() {
  const [list, setList] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams('');
  const modalParams = searchParams.get('modalWin');
  const [online, setOnline] = useState(false);

  useEffect(() => {
    (function () {
      ipcRenderer.invoke('get-user')
        .then((res) => {
          setOnline(res.online);
        });
    }());
  });

  function hideDropdownMenu() {
    setList({ displayMenu: false }, () => {
      document.removeEventListener('click', hideDropdownMenu);
    });
  }
  function showDropdownMenu(event) {
    event.preventDefault();
    setList({ displayMenu: true }, () => {
      document.addEventListener('click', hideDropdownMenu);
    });
  }
  function createModalWinAut() {
    setList(false);
    ipcRenderer.send('create-win-aut');
  }

  function createModalWinReg() {
    setList(false);
    ipcRenderer.send('create-win-reg');
  }
  function leaveUser() {
    setList(false);
    ipcRenderer.send('leave-user');
  }

  return (
    <div onMouseLeave={() => { setList(false); }} onMouseOver={() => { setList(true); }}>
      <div className={modalParams === null ? 'NameParams' : 'NameParamsLeft'} onClick={showDropdownMenu}> Параметры </div>
      { list && (
        <div className="listDragDrop">
          {online
            ? <div onClick={leaveUser} className="listButton">Выход</div>
            : (
              <>
                <div onClick={createModalWinAut} className="listButton">Авторизация</div>
                <div onClick={createModalWinReg} className="listButton">Регистрация</div>
              </>
            )}

        </div>
      )}

    </div>
  );
}
export default TitleBar;
