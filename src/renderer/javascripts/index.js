import 'application.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import App from './components/App';
import store from '../../redux/store/store';

window.getPathVideo((_, data) => {
  console.log('123', data);
});

window.onload = (entries) => {
  const container = document.getElementById('root');
  const modalWindow = document.getElementById('modalWindow');
  const rootWindow = createRoot(modalWindow);

  const root = createRoot(container);
  root.render(

    <Provider store={store}>
      <BrowserRouter>
        <div className="titleBar">Media Hub</div>
        <App entries={entries} tab="home" />
      </BrowserRouter>
    </Provider>,
  );
};

// window.subscribeForEntries((_, data) => {
//   renderApp(data);
// });
