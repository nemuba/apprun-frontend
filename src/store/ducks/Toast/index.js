import {createAction, createReducer} from '@reduxjs/toolkit';

const INITIAL_STATE = {show: false, title: 'Title', message:'Message'}

export const showToast = createAction('SHOW_TOAST');
export const hideToast = createAction('HIDE_TOAST');


export default createReducer(INITIAL_STATE,{
  [showToast]: (state, action) => ({...state, show: true, title: action.payload.title, message: action.payload.message}),
  [hideToast]: (state) => ({show: false, title: '', message: ''}),
});
