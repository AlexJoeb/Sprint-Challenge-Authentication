import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// ! Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import MainReducer from './Redux/Reducers/MainReducer';

const store = createStore(MainReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);