import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ipcRenderer } from 'electron';
import {
  Card, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../../../redux/action/userAction';

function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [id, setId] = useState();
  try {
    setId(useSelector((store) => store.user.id));
  } catch (e) {
    ipcRenderer.invoke('get-user').then((res) => {
      console.log(res.id);
      setId(res.id);
    });
  }
  const [input, setInput] = useState('');
  async function getProfile() {
    console.log(id);
    if (id) {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      console.log(response);
      console.log(response.data.name);
      setInput(response.data);
    }
  }
  async function logOut() {
    const response = await axios.get('http://localhost:3001/users/logout');
    console.log('====+++++++++++++++++++++++++++++++++++', response);
    dispatch(deleteUser());
    navigate('/auth');
  }

  useEffect(() => { getProfile(); }, [setInput]);
  const addChange = () => {
    navigate('/profile/change');
  };

  return (
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
        <Card.Link href="https://ru.wikipedia.org/wiki/%D0%90%D1%80%D0%B0%D0%BC%D0%B8%D1%81">Арамис</Card.Link>

        <button type="submit" onClick={addChange}>Изменить профиль</button>
        <button type="submit" onClick={logOut}>Выход</button>
      </Card.Body>
    </Card>
  );
}

export default ProfilePage;
