import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './friend.css';
import { ipcRenderer } from 'electron';
import { BsFillChatTextFill, BsFillPersonPlusFill, BsFillPersonXFill } from 'react-icons/bs';

function FriendsPage() {
  const [id, setId] = useState();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  useSelector(async (store) => {
    try {
      setId(store.user.id);
    } catch (error) {
      const result = await ipcRenderer.invoke('get-user');
      setId(result.id);
    }
  });

  const navigate = useNavigate();

  async function getAllUsers() {
    if (id) {
      const response = await axios.get('http://localhost:3001/users');
      const allUsers = response.data.filter((el) => el.id !== id);
      // console.log(response.data);
      setUsers(allUsers);
    }
  }

  async function friendsSubmit() {
    if (id) {
      // console.log('@@@@', id);
      const response = await axios.get(`http://localhost:3001/friends/${id}`);
      // console.log(response.data);
      setFriends(response.data);
    }
  }
  async function addFriend(target) {
    console.log('!!!!!!!', id, target.id);
    const response = await axios.post('http://localhost:3001/friends/all', { currentUser: id, id: target.id });
    console.log(response);
    if (response) {
      friendsSubmit();
    }
  }
  async function deleteFriend(target) {
    console.log('!!!!!!!', id, target.id);
    const response = await axios.delete('http://localhost:3001/friends/delete', { data: { currentUser: id, id: target.id } });
    if (response) {
      friendsSubmit();
    }
  }
  useEffect(() => {
    friendsSubmit();
    getAllUsers();
    console.log('123');
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
            <button id={el.id} onClick={(e) => addFriend(e.target)} className="follow" type="submit">
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
            <button id={el.id} onClick={(e) => deleteFriend(e.target)} className="unfollow" type="submit">
              <BsFillPersonXFill id={el.id} onClick={(e) => console.log(e)} style={{ position: 'absolute' }} size="0.9rem" />
            </button>
          </Card>
        )) }
      </div>
    </div>
  );
}

export default FriendsPage;
