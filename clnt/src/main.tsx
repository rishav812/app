import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from './redux/reducer/index';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
);