import { createAction, createReducer } from '@reduxjs/toolkit';


const INITIAL_STATE = [];

export const fetch_users = createAction('FETCH_USERS');
export const delete_user = createAction("DELETE_USER");

export default createReducer(INITIAL_STATE, {
  [fetch_users]: (state, action) => [...action.payload],
  [delete_user]: (state, action) => [...state.filter(spo => spo.id !== action.payload)],
});