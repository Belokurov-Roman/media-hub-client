import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './header/NavBar/NavBar';
import VideoPage from './pages/VideoPage/VideoPage';
import GamePage from './pages/GamePage/GamePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<VideoPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
