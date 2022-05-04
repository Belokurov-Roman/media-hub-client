import 'application.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

window.getPathVideo((_, data) => {
  console.log('123', data);
});

window.onload = (entries) => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <App entries={entries} tab="home" />
    </BrowserRouter>,
  );
};

// window.subscribeForEntries((_, data) => {
//   renderApp(data);
// });
