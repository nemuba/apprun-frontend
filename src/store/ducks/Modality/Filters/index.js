import {createAction, createReducer} from '@reduxjs/toolkit';


const INITIAL_VALUE = {
  filter_genre: [],
  filter_oar: []
};

export const fetch_filter_genre = createAction('FETCH_FILTER_GENRE');
export const fetch_filter_oar = createAction('FETCH_FILTER_OAR');

export default createReducer(INITIAL_VALUE,{
  [fetch_filter_genre] : (state, action) => ({...state, filter_genre: action.payload}),
  [fetch_filter_oar] : (state, action) =>({ ...state, filter_oar: action.payload })
});