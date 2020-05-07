import { createAction, createReducer } from '@reduxjs/toolkit';


const INITIAL_STATE = [];

export const fetch_sponsors = createAction('FETCH_SPONSORS');
export const delete_sponsor = createAction("DELETE_SPONSOR");

export default createReducer(INITIAL_STATE, {
  [fetch_sponsors]: (state, action) => [...action.payload],
  [delete_sponsor]: (state, action) => [...state.filter(spo => spo.id !== action.payload)],
});