import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = [];

export const fetch_registrations = createAction("FETCH_REGISTRATIONS");
export const delete_registration = createAction("DELETE_REGISTRATION");

export default createReducer(INITIAL_STATE,{
  [fetch_registrations]: (state, action) => [...action.payload],
  [delete_registration]: (state, action) => [...state.filter(reg => reg.id !== action.payload)]

});