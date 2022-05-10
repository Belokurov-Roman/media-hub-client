import { Route, Routes } from 'react-router-dom';
import React from 'react';
import NavBar from '../static/header/NavBar/NavBar';
import VideoPage from '../pages/VideoPage/VideoPage';
import GamePage from '../pages/GamePage/GamePage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import ModalWindowAdd from '../pages/ModalWindowAdd/ModalWindowAdd';
import Footer from '../static/footer/Footer/Footer';
import GameContextProvider from '../../context/GameContext';

function WindowApp({ createWindowAdd }) {
  return (
    <GameContextProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<VideoPage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/111" element={<ModalWindowAdd />} />

      </Routes>
      <Footer createWindowAdd={createWindowAdd} />
    </GameContextProvider>
  );
}

export default WindowApp;
