import { Route, Routes } from 'react-router-dom';
import React from 'react';
import NavBar from '../static/header/NavBar/NavBar';
import VideoPage from '../pages/VideoPage/VideoPage';
import GamePage from '../pages/GamePage/GamePage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import Footer from '../static/footer/Footer/Footer';
import GameContextProvider from '../../context/GameContext';
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage';
import AuthPage from '../pages/AuthPage/AuthPage';
import FriendsPage from '../pages/FriendsPage/FriendsPage';
import ChatLogic from '../pages/Chat/ChatLogic';
import ChangePage from '../pages/ChangePage/ChangePage';

function WindowApp({ createWindowAdd }) {
  return (
    <GameContextProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<VideoPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/friends/chat" element={<ChatLogic />} />
        <Route path="/profile/change" element={<ChangePage />} />
      </Routes>
      <Footer createWindowAdd={createWindowAdd} />
    </GameContextProvider>
  );
}

export default WindowApp;
