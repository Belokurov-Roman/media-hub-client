import React, { useState } from 'react';

function RegistrationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
  //   import axios from "axios"
  // export const THUNK_getRoom = (id) => async (dispatch) => {
  //   const url = `http://localhost:3000/rooms/${id}`;
  //   const r = await axios.get(url);
  //   dispatch(ACTION_getRoom(r.data));
  // };

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
