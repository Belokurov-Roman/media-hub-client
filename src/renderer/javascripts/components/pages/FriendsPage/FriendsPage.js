import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function FriendsPage() {
  const id = useSelector((store) => store.user.id);
  console.log(id);
  const [friends, setFriends] = useState('');
  async function friendsSubmit() {
    const response = await axios.get(`http://localhost:3001/friends/${id}`);
    console.log(response.data);
    setFriends(response.data);
  }
  console.log('==========', friends);
  useEffect(() => {
    friendsSubmit();
  }, []);

  return (
    <>
      <h2>Friends</h2>
      {friends && friends.map((el) => (
        <Card key={el.id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={el.avatar} style={{ width: '16rem' }} />
          <Card.Body>
            <Card.Title>{el.name}</Card.Title>
            <Card.Text>
              {el.description}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{el.email}</ListGroupItem>
          </ListGroup>
        </Card>
      )) }
    </>
  );
}

export default FriendsPage;
