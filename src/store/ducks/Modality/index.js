import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = [];

export const fetch_modalities = createAction("FETCH_MODALITIES");
export const delete_modality = createAction("DELETE_MODALITY");

export default createReducer(INITIAL_STATE, {
  [fetch_modalities]: (state, action) => [...action.payload],
  [delete_modality] :(state, action) => [...state.filter(mod => mod.id !== action.payload)]
});
