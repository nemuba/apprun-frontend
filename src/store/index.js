import { configureStore } from '@reduxjs/toolkit';
import reducers from './rootReducer';

export default configureStore({
  reducer: reducers,
});
