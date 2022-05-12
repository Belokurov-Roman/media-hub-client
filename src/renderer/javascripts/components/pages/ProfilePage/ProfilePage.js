import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ipcRenderer } from 'electron';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    (function () {
      ipcRenderer.invoke('get-user')
        .then((res) => {
          setUser(res);
        });
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
    <>
      {user.online && (
        <Card style={{ width: '18rem', color: 'white' }}>
          <Card.Img variant="top" src={input.avatar} style={{ width: '16rem' }} />
          <Card.Body>
            <Card.Title>{input.name}</Card.Title>
            <Card.Text>
              {input.description}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{input.email}</ListGroupItem>
            {/* <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem> */}
          </ListGroup>
          <Card.Body>
            {/* <Card.Link>Арамис</Card.Link> */}
            <button type="submit" onClick={addChange}>Изменить профиль</button>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default ProfilePage;
