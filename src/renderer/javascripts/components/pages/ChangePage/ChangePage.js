import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ipcRenderer } from 'electron';
import { useNavigate } from 'react-router-dom';

import './ChangePage.css';

function ChangePage() {
  // const [user, setUser] = useState('');
  const [input, setInput] = useState('');
  const [id, setId] = useState();
  const navigate = useNavigate();
  useSelector(async (store) => {
    try {
      setId(store.user.id);
    } catch (error) {
      const result = await ipcRenderer.invoke('get-user');
      setId(result.id);
    }
  });

  async function getProfile() {
    if (id) {
      const response = await axios.get(`http://localhost:3001/users/profile/${id}`);
      console.log('CHANGE', response);
      setInput({ ...response.data, password: '' });
    }
  }
  async function putProfile(e) {
    e.preventDefault();
    if (id) {
      const response = await axios.put(`http://localhost:3001/users/profile/${id}`, input);
      setInput(response.data);
      navigate('/profile');
    }
  }

  useEffect(() => { getProfile(); }, [id]);

  // const {
  //   name, avatar, description, email, password, id,
  // } = useSelector((store) => store.user);
  // console.log(name, avatar, description, email, password, id);
  return (
    <div className="ChangePage__container">
      <div className="ChangePage__inputs_wrapper">
        <input className="ChangePage__input" name="img" onChange={(e) => setInput({ ...input, avatar: e.target.value })} value={input.avatar} placeholder="img" />
        <input className="ChangePage__input" name="email" onChange={(e) => setInput({ ...input, email: e.target.value })} value={input.email} placeholder="email" />
        <input className="ChangePage__input" name="name" onChange={(e) => setInput({ ...input, name: e.target.value })} value={input.name} placeholder="name" />
        <input className="ChangePage__input" name="password" type="password" onChange={(e) => setInput({ ...input, password: e.target.value })} value={input.password} placeholder="password" />
        <input className="ChangePage__input" name="text" onChange={(e) => setInput({ ...input, description: e.target.value })} value={input.description} placeholder="description" />
      </div>
      <div className="ChangePage__btn_wrapper">
        {/* <button onClick={putProfile} type="button">Сохранить</button> */}
        <input className="ChangePage__editBtn" type="button" value="Сохранить" />
      </div>
    </div>
  );
}

export default ChangePage;
