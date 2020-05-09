import {createAction, createReducer} from '@reduxjs/toolkit';

const INITIAL_STATE = [];

export const fetch_positions = createAction('FETCH_POSITIONS');
export const delete_position = createAction('DELETE_POSITION');

export default createReducer(INITIAL_STATE,{
  [fetch_positions]: (state, action) => [...action.payload],
  [delete_position]: (state, action) => [...state.filter(p => p.id !== action.payload)]
});