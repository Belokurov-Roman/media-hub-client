import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';


function ProfilePage() {
  const id = useSelector((store) => store.user.id);
  const [input, setInput] = useState('');
  async function getProfile() {
    const response = await axios.get(`http://localhost:3001/users/${id}`);
    console.log(response.data.name);
    setInput(response.data);
  }

  useEffect(() => { getProfile(); }, [setInput]);

  return (
    <Card style={{ width: '18rem' }}>
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

      </Card.Body>
    </Card>
  );
}

export default ProfilePage;
