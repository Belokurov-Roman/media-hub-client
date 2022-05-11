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
  const [friends, setFriends] = useState('');
  const navigate = useNavigate();
  async function friendsSubmit() {
    if (id) {
      const response = await axios.get(`http://localhost:3001/friends/${id}`);
      console.log(response.data);
      setFriends(response.data);
    }
  }
  useEffect(() => {
    friendsSubmit();
  }, [id]);
  const setChat = () => {
    navigate('/friends/chat');
  };

  return (
    <>
      <h2>Friends</h2>
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
          <button type="submit" onClick={setChat}>Join a chat</button>
        </Card>
      )) }
    </>
  );
}

export default FriendsPage;
