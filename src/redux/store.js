import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import rootReducer from './reducers';

let middlewares = [thunk]; // add your middleware here

if (process.env.REACT_APP_STAGE === 'dev') {
  middlewares.push(logger);
}

const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
);

export default store;
