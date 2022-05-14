import React, { useEffect, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { BsFillChatFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import axios from 'axios';
import { ipcRenderer } from 'electron';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    (function () {
      ipcRenderer.invoke('get-user')
        .then((res) => { setUser(res); });
    }());
  }, []);
  const [input, setInput] = useState('');
  async function getProfile() {
    if (user.id) {
      const response = await axios.get(`http://localhost:3001/users/find/${user.id}`);
      setInput(response.data);
    }
  }

  useEffect(() => {
    getProfile();
  }, [user]);
  const addChange = () => {
    navigate('/profile/change');
  };

  return (
    <div className="prof">
      {user?.online && (
      <div className="page">
        <div className="photo">
          <img
            variant="top"
            src={input.avatar}
            alt="avatar"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="about">
          <h4>{`${input.name}`}</h4>
          <h5 className="string">
            {' '}
            <BsFillChatFill style={{ marginRight: '7px' }} />
            {`Статус: ${input.description}`}
          </h5>
          <h5 className="string">
            <MdEmail style={{ marginRight: '7px' }} />
            {`Email: ${input.email}`}
          </h5>
          <button className="edit string" type="submit" onClick={addChange}>
            <h5 className="string">
              <AiFillEdit style={{ marginRight: '7px' }} />
              Изменить профиль
            </h5>
          </button>
        </div>
      </div>
      )}
    </div>
  );
}

export default ProfilePage;
