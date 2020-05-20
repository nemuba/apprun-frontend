import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';


import reducers from './rootReducer';

export const history = createBrowserHistory();

// export store with reducers
export default configureStore({
  reducer: reducers(history),
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
  devTools: process.env.NODE_ENV !== 'production'
});
