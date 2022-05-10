import React from 'react';
import {
  Route, Routes, useParams, useSearchParams,
} from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { Provider, useSelector } from 'react-redux';
import NavBar from './static/header/NavBar/NavBar';
import VideoPage from './pages/VideoPage/VideoPage';
import GamePage from './pages/GamePage/GamePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Footer from './static/footer/Footer/Footer';
import AuthPage from './pages/AuthPage/AuthPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import './App.css';
import ModalWindowAdd from './pages/ModalWindowAdd/ModalWindowAdd';
import GameContextProvider from '../context/GameContext';
import ChatLogic from './pages/Chat/ChatLogic';
import WindowApp from './WindowApp/WindowApp';

function App() {
  const [searchParams, setSearchParams] = useSearchParams('');
  const modalParams = searchParams.get('modalWin');

  function createWindowAdd() {
    console.log(window.location.href);
    console.log(modalParams);
    // console.log('123123', modalParams === 'true');
    ipcRenderer.send('create-win-add');
  }
  const userId = useSelector((store) => {
    try {
      return store.user.id;
    } catch (error) {
      return null;
    }
  });

  function renderWindow() {
    switch (modalParams) {
      case 'addVideo':
        return (<ModalWindowAdd />);
      case 'friends':
        return (<ModalWindowAdd />);
      case 'chat':
        return (<ModalWindowAdd />);
      case 'login':
        return (<ModalWindowAdd />);
      default:
        return (<WindowApp createWindowAdd={createWindowAdd} />);
    }
  }

  return (
    <div className="App">

      <GameContextProvider>
        {renderWindow()}
        <NavBar searchParams={searchParams} />
        <Routes>
          <Route path="/" element={<VideoPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/profile" element={userId ? <ProfilePage /> : <AuthPage />} />
          <Route path="/:modalView" element={<ModalWindowAdd />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/friends/chat" element={<ChatLogic />} />
        </Routes>
        <Footer createWindowAdd={createWindowAdd} />
      </GameContextProvider>

      {renderWindow()}
    </div>
  );
}

export default App;
