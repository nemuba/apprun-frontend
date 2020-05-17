import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {}

export const fetch_dash = createAction("FETCH_DASH");

export default createReducer(INITIAL_STATE, {
  [fetch_dash]: (state, action) => ({ ...action.payload })
});