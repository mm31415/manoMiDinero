import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from "../reducers/root_reducer.js";

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export const configureStore = (preloadedState = {}) => {
  return createStore(RootReducer, preloadedState, applyMiddleware(...middlewares));
};
