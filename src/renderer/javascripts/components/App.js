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
      {renderWindow()}
    </div>
  );
}

export default App;

// {modalParams === 'addVideo' ? renderWindow() : (
//
// )}
