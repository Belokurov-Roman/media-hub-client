import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import NavBar from './static/header/NavBar/NavBar';
import VideoPage from './pages/VideoPage/VideoPage';
import GamePage from './pages/GamePage/GamePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Footer from './static/footer/Footer/Footer';
import store from '../../../redux/store/store';
import AuthPage from './pages/AuthPage/AuthPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import './App.css';
import ModalWindowAdd from './pages/ModalWindowAdd/ModalWindowAdd';
import GameContextProvider from '../context/GameContext';

function App() {
  function createWindowAdd() {
    ipcRenderer.send('create-win-add');
  }

  function searchParams() {
    const isModalView = new URL(location.href).searchParams.get('modalView');
  }

  return (
    <div className="App">

      <GameContextProvider>
        <NavBar searchParams={searchParams} />
        <Routes>
          <Route path="/" element={<VideoPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/:modalView" element={<ModalWindowAdd />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/friends" element={<FriendsPage />} />

        </Routes>
        <Footer createWindowAdd={createWindowAdd} />
      </GameContextProvider>
    </div>
  );
}

export default App;
