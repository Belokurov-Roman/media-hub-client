// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import addUser from '../../../../../redux/action/userAction';

function RegistrationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store);

  useEffect(() => {
    console.log(user);
    if (user) {
      navigate('/profile');
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        dispatch(addUser(result));
        console.log(result);
        ipcRenderer.send('save-user', { ...result, online: true });
        ipcRenderer.send('close-win-reg');
      }
      console.log(response.status);
      if (response.status === 401) {
        setError('Этот email занят');
      }
      if (response.status === 500) {
        setError('Вы не заполнили все поля');
      }
    } catch (err) {
      setError(err);
      console.log('============================', err);
      // console.log(name, email, password);
    }
  }

  return (
    <div className="ModalWindowAdd styleThisBlock">
      <form className="ModalWindowAdd styleThisBlock" onSubmit={(e) => handleSubmit(e)}>
        <span>{ error }</span>
        <div className="blockInputChange">
          <span>Введите имя</span>
          <input className="styleChange" onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="name" />
        </div>
        <div className="blockInputChange">
          <span>Введите email</span>
          <input className="styleChange" onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="email" />
        </div>
        <div className="blockInputChange">
          <span>Введите пароль</span>
          <input className="styleChange" onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="password" />
        </div>
        <button className="buttonAdd TextLinks AddingBut" type="submit">Зарегестрироваться</button>
      </form>
      <p>{ error }</p>
    </div>
  );
}
export default RegistrationPage;
