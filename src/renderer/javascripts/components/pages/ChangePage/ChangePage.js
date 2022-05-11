import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChangePage() {
  // const [user, setUser] = useState('');
  const [input, setInput] = useState('');
  const id = useSelector((store) => store.user.id);
  async function getProfile() {
    const response = await axios.get(`http://localhost:3001/users/profile/${id}`);
    console.log('=======>', response);
    setInput({ ...response.data, password: '' });
  }
  async function putProfile(e) {
    e.preventDefault();
    const response = await axios.put(`http://localhost:3001/users/profile/${id}`, input);
    console.log('123=======>', response);
    setInput(response.data);
  }

  useEffect(() => { getProfile(); }, [setInput]);

  // const {
  //   name, avatar, description, email, password, id,
  // } = useSelector((store) => store.user);
  // console.log(name, avatar, description, email, password, id);
  return (
    <form onSubmit={putProfile}>
      <input name="img" onChange={(e) => setInput({ ...input, avatar: e.target.value })} value={input.avatar} />
      <input name="email" onChange={(e) => setInput({ ...input, email: e.target.value })} value={input.email} />
      <input name="name" onChange={(e) => setInput({ ...input, name: e.target.value })} value={input.name} />
      <input name="password" type="password" onChange={(e) => setInput({ ...input, password: e.target.value })} value={input.password} />
      <input name="text" onChange={(e) => setInput({ ...input, description: e.target.value })} value={input.description} />
      <button type="submit">Сохранить</button>

    </form>
  );
}

export default ChangePage;
