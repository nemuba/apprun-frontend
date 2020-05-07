import { createAction, createReducer } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  show: false,
};

export const showModalConfirmation = createAction("SHOW_MODAL");
export const hideModalConfirmation = createAction("HIDE_MODAL");

export default createReducer(INITIAL_STATE, {
  [showModalConfirmation]: (state, action) => ({
    show: true,
    id: action.payload.id,
    title: action.payload.title,
    message: action.payload.message,
  }),
  [hideModalConfirmation]: (state, action) => ({
    show: false,
    title: "",
    message: "",
    id: 0,
  }),
});
