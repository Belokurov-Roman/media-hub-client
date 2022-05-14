import React from 'react';
import {
  useSearchParams,
} from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { useSelector } from 'react-redux';
import './App.css';
import ModalWindowAdd from './pages/ModalWindowAdd/ModalWindowAdd';
import WindowApp from './WindowApp/WindowApp';
import AuthPage from './pages/AuthPage/AuthPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';

function App() {
  const [searchParams, setSearchParams] = useSearchParams('');
  const modalParams = searchParams.get('modalWin');

  function createWindowAdd() {
    ipcRenderer.send('create-win-add');
  }

  function renderWindow() {
    switch (modalParams) {
      case 'addVideo':
        return (<ModalWindowAdd />);
      case 'friends':
        return (<FriendsPage />);
      case 'chat':
        return (<ModalWindowAdd />);
      case 'autor':
        console.log('here autor');
        return (<AuthPage />);
      case 'registr':
        return (<RegistrationPage />);
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
