// import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import THUNK_addUser from '../../../../../redux/thunk/userTunks';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((store) => store.error);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(THUNK_addUser(email, password));
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="email" />
        <input onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="password" />
        <button type="submit">Submit</button>
      </form>
      <p>{ error }</p>
    </div>
  );
}
export default AuthPage;
