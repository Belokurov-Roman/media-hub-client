// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
      navigate('/game');
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
        dispatch(addUser(response));
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
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="name" />
        <input onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="email" />
        <input onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
      <p>{ error }</p>
    </div>
  );
}
export default RegistrationPage;
