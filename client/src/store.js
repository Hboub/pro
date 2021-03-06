import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';

const initialState = {};
const middlewares = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares)
  )
);

// eslint-disable-next-line
export default ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);