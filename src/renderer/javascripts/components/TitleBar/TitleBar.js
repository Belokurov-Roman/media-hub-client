import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { FaSignInAlt } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../../redux/action/userAction';

function TitleBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  }, [list]);

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
    axios.get('http://localhost:3001/users/logout')
      .then(() => { dispatch(deleteUser()); })
      .then(() => { ipcRenderer.send('leave-user'); });
  }

  return (
    <div onMouseLeave={() => { setList(false); }} onMouseOver={() => { setList(true); }}>
      <div className={modalParams === null ? 'NameParams' : 'NameParamsLeft'} onClick={showDropdownMenu}>
        Войти
        <h4>
          <FaSignInAlt style={{ marginLeft: '7px' }} />
        </h4>
      </div>
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
