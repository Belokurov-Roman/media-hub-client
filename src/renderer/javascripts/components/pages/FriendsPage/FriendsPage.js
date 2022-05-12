import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
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
  // const ref = useRef(null);

  async function getAllUsers() {
    if (id) {
      const response = await axios.get('http://localhost:3001/users');
      const allUsers = response.data.filter((el) => el.id !== id);
      console.log(response.data);
      setUsers(allUsers);
    }
  }

  async function friendsSubmit() {
    if (id) {
      const response = await axios.get(`http://localhost:3001/friends/${id}`);
      console.log(response.data);
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
    <div className="allUsers">
      <div>
        <h2 style={{ color: 'white' }}>Все пользователи</h2>
        {users && users.map((el) => (
          <Card className="friend" key={el.id} style={{ width: '18rem', color: 'white' }}>
            <Card.Img variant="top" src={el.avatar} style={{ width: '18rem' }} />
            <Card.Body>
              <Card.Title>{el.name}</Card.Title>
              <Card.Text>
                {el.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{el.email}</ListGroupItem>
            </ListGroup>
            <button type="submit">Добавить в друзья</button>
          </Card>
        )) }
      </div>
      <div>
        <h2 style={{ color: 'white' }}>Друзья</h2>
        {friends && friends.map((el) => (
          <Card className="friend" key={el.id} style={{ width: '18rem', color: 'white' }}>
            <Card.Img variant="top" src={el.avatar} style={{ width: '18rem' }} />
            <Card.Body>
              <Card.Title>{el.name}</Card.Title>
              <Card.Text>
                {el.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{el.email}</ListGroupItem>
            </ListGroup>
            <button type="submit" onClick={setChat}>Присоедениться к чату</button>
            <button type="submit" onClick={setStream}>Стрим</button>
          </Card>
        )) }
      </div>
    </div>
  );
}

export default FriendsPage;
