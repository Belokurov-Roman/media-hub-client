import io from 'socket.io-client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Chat from './Chat';
import './style.css';
import { ipcRenderer } from 'electron';

const socket = io.connect('http://localhost:3001');

function ChatLogic() {
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState();
  useSelector(async (store) => {
    if (!username) {
      try {
        setUsername(store.user.name);
      } catch (error) {
        const result = await ipcRenderer.invoke('get-user');
        setUsername(result.name);
      }
    }
  });

  // const [input, setInput] = useState('');

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <div className="chatLogic">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a chat</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name..."
            // onChange={(event) => {
            //   setUsername(event.target.value);
            // }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatLogic;
