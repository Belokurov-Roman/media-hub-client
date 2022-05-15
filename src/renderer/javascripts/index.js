import 'application.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from '../../redux/store/store';
import TitleBar from './components/static/TitleBar/TitleBar';

window.onload = (entries) => {
  const container = document.getElementById('root');

  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <div className="titleBar">
          <div className="titleContainer">
            <div className="NameParamsLeft">
              Параметры
            </div>
            <span>Media Hub</span>
            <TitleBar />
          </div>
        </div>
        <App entries={entries} tab="home" />
      </BrowserRouter>
    </Provider>,
  );
};
