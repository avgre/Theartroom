import ReactDOM from 'react-dom';
import './main.css';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';
import React from 'react';

import reloadMagic from './reload-magic-client.js'; // automatic reload
reloadMagic(); // automatic reload

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
