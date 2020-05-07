import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = [];

export const fetch_players = createAction("FETCH_PLAYERS");
export const delete_player = createAction("DELETE_PLAYER");

export default createReducer(INITIAL_STATE, {
  [fetch_players]: (state, action) => [...action.payload],
  [delete_player]: (state, action) => [...state.filter(play => play.id !== action.payload)],
});
