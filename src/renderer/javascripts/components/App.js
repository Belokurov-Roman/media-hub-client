import React from 'react';
import {
  Route, Routes, useParams, useSearchParams,
} from 'react-router-dom';
import { ipcRenderer } from 'electron';
import NavBar from './static/header/NavBar/NavBar';
import VideoPage from './pages/VideoPage/VideoPage';
import GamePage from './pages/GamePage/GamePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Footer from './static/footer/Footer/Footer';
import './App.css';
import ModalWindowAdd from './pages/ModalWindowAdd/ModalWindowAdd';
import GameContextProvider from '../context/GameContext';

function App() {
  const [searchParams, setSearchParams] = useSearchParams('');
  const modalParams = searchParams.get('modalWin');

  function createWindowAdd() {
    console.log(window.location.href);
    console.log(modalParams);
    // console.log('123123', modalParams === 'true');
    // ipcRenderer.send('create-win-add');
  }

  return (
    <div className="App">
      {modalParams === 'true' ? <ModalWindowAdd /> : (
        <GameContextProvider>
          <NavBar searchParams={searchParams} />
          <Routes>
            <Route path="/" element={<VideoPage />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/111" element={<ModalWindowAdd />} />

          </Routes>
          <Footer createWindowAdd={createWindowAdd} />
        </GameContextProvider>
      )}

    </div>
  );
}

export default App;
