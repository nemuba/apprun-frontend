import {createAction, createReducer} from '@reduxjs/toolkit';

const INITIAL_STATE = [];

export const fetch_races = createAction('FETCH_RACES');
export const delete_race = createAction('DELETE_RACE');
export const add_race = createAction('ADD_RACE');

export default createReducer(INITIAL_STATE,{
  [fetch_races]: (state, action) => [...action.payload],
  [delete_race]: (state, action) => [...state.filter(race => race.id !== action.payload)],
  [add_race]: (state, action) => [...state, action.payload]
});
