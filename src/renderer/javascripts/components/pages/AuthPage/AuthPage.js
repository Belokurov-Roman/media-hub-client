// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

  // useEffect(() => {
  //   if (emailError || passwordError) {
  //     setFormValid(false);
  //   } else {
  //     setFormValid(true);
  //   }
  // }, [emailError, passwordError, formValid]);

  useEffect(() => {
    if (user) {
      navigate('/game');
    }
  }, [user]);
  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(THUNK_addUser(email, password));
  }
  // const addNavigate = () => {
  //   navigate(navigate('/game'));
  // };
  const formValidation = () => {
    console.log(email, password);
    if (password && email) {
      setFormValid(true);
    }
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный емейл');
      setFormValid(false);
    } else {
      setEmailError('');
      formValidation();
    }
  };
  const passwordHandler = (e) => {
    console.log('PASSWORD -> ', e.target.value);
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 12) {
      setFormValid(false);
      setPasswordError('Пароль должет быть длиннее 3 и меньше 12 символов');
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
  console.log({ email, password, formValid });
  return (
    // onChange={(e) => setEmail(e.target.value)} onChange={emailHandler} disabled={!formValid}
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
        <input onBlur={blueHandler} onChange={emailHandler} value={email} type="text" name="email" placeholder="email" />
        {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
        <input onBlur={blueHandler} onChange={passwordHandler} value={password} type="text" name="password" placeholder="password" />
        <button disabled={!formValid} type="submit">Submit</button>
      </form>
      <p>{ error }</p>
    </div>
  );
}
export default AuthPage;
