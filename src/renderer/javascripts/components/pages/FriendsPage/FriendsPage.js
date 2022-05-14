import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BsFillPersonPlusFill, BsFillPersonXFill, BsFillChatTextFill } from 'react-icons/bs';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './friend.css';
import { ipcRenderer } from 'electron';

function FriendsPage() {
  const [id, setId] = useState();
  useSelector(async (store) => {
    try {
      setId(store.user.id);
    } catch (error) {
      const result = await ipcRenderer.invoke('get-user');
      setId(result.id);
    }
  });
  const [users, setUsers] = useState('');
  const [friends, setFriends] = useState('');
  const navigate = useNavigate();

  async function getAllUsers() {
    if (id) {
      const response = await axios.get('http://localhost:3001/users');
      const allUsers = response.data.filter((el) => el.id !== id);
      setUsers(allUsers);
    }
  }

  async function friendsSubmit() {
    if (id) {
      const response = await axios.get(`http://localhost:3001/friends/${id}`);
      setFriends(response.data);
    }
  }
  useEffect(() => {
    friendsSubmit();
    getAllUsers();
  }, [id]);
  const setChat = () => {
    navigate('/friends/chat');
  };
  const setStream = () => {
    navigate('/stream');
  };

  return (
    <div className="subPage">
      <div className="lists allUsers">
        <h2 style={{ color: 'white' }}>Все пользователи</h2>
        {users && users.map((el) => (
          <Card className="person" key={el.id} style={{ color: 'white' }}>
            <div className="avatar">
              <Card.Img className="picture" variant="top" src={el.avatar} />
            </div>
            <Card.Body>
              <Card.Title className="name">{el.name}</Card.Title>
            </Card.Body>
            <button className="follow" type="submit">
              <BsFillPersonPlusFill style={{ position: 'absolute' }} size="0.9rem" />
            </button>
          </Card>
        )) }
      </div>
      <div className="lists subscriptions">
        <h2 style={{ color: 'white' }}>Мои подсписки</h2>
        {friends && friends.map((el) => (
          <Card className="person" key={el.id} style={{ color: 'white' }}>
            <div className="avatar">
              <Card.Img className="picture" variant="top" src={el.avatar} />
            </div>
            <Card.Body>
              <Card.Title className="name">{el.name}</Card.Title>
            </Card.Body>
            <button className="chat" type="submit" onClick={setChat}>
              Чат
              <BsFillChatTextFill style={{ marginLeft: '6px' }} />
            </button>
            <button className="stream" type="submit" onClick={setStream}>
              Стрим
              {/* <MdRadio /> */}
            </button>
            <button className="unfollow" type="submit">
              <BsFillPersonXFill style={{ position: 'absolute' }} size="0.9rem" />
            </button>
          </Card>
        )) }
      </div>
    </div>
  );
}

export default FriendsPage;
