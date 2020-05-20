import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import reducers from './rootReducer';

export const history = createBrowserHistory();


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer( persistConfig,reducers(history));

// export store with reducers
const store =  configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
  devTools: process.env.NODE_ENV !== 'production'
});

const persistor = persistStore(store);

export { store, persistor };
