import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import THUNK_addUser from '../../../../../redux/thunk/userTunks';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Почта не может быть пустой');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [formValid, setFormValid] = useState(false);
  const { error, user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/game');
    }
  }, [user]);
  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(THUNK_addUser(email, password));
    if (!error) {
      ipcRenderer.send('close-win-aut');
    }
  }

  const formValidation = () => {
    if (password && email) {
      setFormValid(true);
    }
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
      setFormValid(false);
    } else {
      setEmailError('');
      formValidation();
    }
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 12) {
      setFormValid(false);
      setPasswordError('Требуется 3-12 символов');
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым');
      }
    } else {
      setPasswordError('');
      formValidation();
    }
  };

  const blueHandler = (e) => { // когда юзер покинул поле ввода
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };
  return (
    <div className="ModalWindowAdd styleThisBlock">
      <form className="ModalWindowAdd styleThisBlock" onSubmit={(e) => handleSubmit(e)}>
        <span>{ error }</span>
        <div className="blockInputChange">
          <span>Введите email</span>
          <input className="styleChange" onBlur={blueHandler} onChange={emailHandler} value={email} type="text" name="email" placeholder="Email" />
          {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
        </div>
        <div className="blockInputChange">
          <span>Введите пароль</span>
          <input className="styleChange" onBlur={blueHandler} onChange={passwordHandler} value={password} type="text" name="password" placeholder="Пароль" />
          {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
        </div>
        <button className="buttonAdd TextLinks AddingBut" disabled={!formValid} type="submit">Войти</button>
      </form>
    </div>
  );
}
export default AuthPage;
