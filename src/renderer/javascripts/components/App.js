import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavBar from './static/header/NavBar/NavBar';
import VideoPage from './pages/VideoPage/VideoPage';
import GamePage from './pages/GamePage/GamePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Footer from './static/footer/Footer/Footer';
import store from '../../../redux/store/store';
import AuthPage from './pages/AuthPage/AuthPage';
import FriendsPage from './pages/FriendsPage/FriendsPage';

function App() {
  return (
    <div>
      <NavBar />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<VideoPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/friends" element={<FriendsPage />} />
        </Routes>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
